package pufferpanel

import (
	"github.com/pufferpanel/pufferpanel/v3/config"
	"sync"
	"time"
)

type Cache interface {
	Read() (cache []string, epoch int64)

	ReadFrom(startTime int64) (cache []string, epoch int64)

	Write(b []byte) (n int, err error)
}

type Message struct {
	msg  string
	time int64
}

type MemoryCache struct {
	Cache
	Buffer   []Message
	Capacity int
	Lock     sync.Locker
}

func CreateCache() *MemoryCache {
	capacity := config.ConsoleBuffer.Value()
	if capacity <= 0 {
		capacity = 50
	}
	return &MemoryCache{
		Buffer:   make([]Message, 0),
		Capacity: capacity,
		Lock:     &sync.Mutex{},
	}
}

func (c *MemoryCache) Read() (msg []string, lastTime int64) {
	msg, lastTime = c.ReadFrom(0)
	return
}

func (c *MemoryCache) ReadFrom(startTime int64) (msg []string, lastTime int64) {
	result := make([]string, 0)

	var endTime int64 = 0

	for _, v := range c.Buffer {
		if v.time > startTime {
			result = append(result, v.msg)
			endTime = v.time
		}
	}

	if endTime == 0 {
		endTime = time.Now().Unix()
	}
	return result, endTime
}

func (c *MemoryCache) Write(b []byte) (n int, err error) {
	c.Lock.Lock()
	defer c.Lock.Unlock()
	if len(c.Buffer) == c.Capacity {
		c.Buffer = c.Buffer[1:]
	}
	c.Buffer = append(c.Buffer, Message{msg: string(b), time: time.Now().Unix()})
	n = len(b)
	return
}
