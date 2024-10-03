package pufferpanel

import (
	"encoding/json"
	"github.com/gorilla/websocket"
	"github.com/tsarchghs/pufferpanel/logging"
	"io"
	"sync"
)

type Tracker struct {
	sockets []*Socket
	locker  sync.Mutex
}

func CreateTracker() *Tracker {
	return &Tracker{sockets: make([]*Socket, 0)}
}

func (ws *Tracker) Register(conn *Socket) {
	ws.locker.Lock()
	defer ws.locker.Unlock()
	ws.sockets = append(ws.sockets, conn)
}

func (ws *Tracker) WriteMessage(msg Transmission) error {
	d, err := json.Marshal(&msg)
	if err != nil {
		return err
	}
	ws.locker.Lock()
	defer ws.locker.Unlock()

	for i := 0; i < len(ws.sockets); i++ {
		go func(conn *Socket, data []byte) {
			_, err := conn.Write(data)
			if err != nil {
				logging.Debug.Printf("websocket encountered error, dropping (%s)", err.Error())
				ws.locker.Lock()
				defer ws.locker.Unlock()
				for i, k := range ws.sockets {
					if k == conn {
						ws.sockets[i] = ws.sockets[len(ws.sockets)-1]
						ws.sockets[len(ws.sockets)-1] = nil
						ws.sockets = ws.sockets[:len(ws.sockets)-1]
						break
					}
				}
			}
		}(ws.sockets[i], d)
	}

	return nil
}

func (ws *Tracker) Write(source []byte) (n int, e error) {
	packet := ServerLogs{Logs: source}
	e = ws.WriteMessage(Transmission{
		Message: packet,
		Type:    MessageTypeLog,
	})
	n = len(source)
	return
}

func Create(ws *websocket.Conn) *Socket {
	return &Socket{conn: ws}
}

type Socket struct {
	conn   *websocket.Conn
	locker sync.Mutex
	io.WriteCloser
}

func (s *Socket) WriteMessage(msg Transmission) error {
	return s.WriteJSON(&msg)
}

func (s *Socket) Write(data []byte) (int, error) {
	s.locker.Lock()
	defer s.locker.Unlock()
	return len(data), s.conn.WriteMessage(websocket.TextMessage, data)
}

func (s *Socket) WriteJSON(data interface{}) error {
	d, err := json.Marshal(data)
	if err != nil {
		return err
	}
	_, err = s.Write(d)
	return err
}

func (s *Socket) Close() error {
	return s.conn.Close()
}
