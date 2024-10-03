package standard

import (
	"errors"
	"fmt"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/logging"
	"github.com/shirou/gopsutil/process"
	"github.com/spf13/cast"
	"os"
	"os/exec"
	"runtime"
	"strings"
	"syscall"
	"time"
)

type standard struct {
	*pufferpanel.BaseEnvironment
	mainProcess *exec.Cmd
}

func (s *standard) standardExecuteAsync(steps pufferpanel.ExecutionData) (err error) {
	s.Wait.Add(1)
	s.mainProcess = exec.Command(steps.Command, steps.Arguments...)
	s.mainProcess.Dir = s.GetRootDirectory()

	for _, v := range os.Environ() {
		if !strings.HasPrefix(v, "PUFFER_") {
			s.mainProcess.Env = append(s.mainProcess.Env, v)
		}
	}
	s.mainProcess.Env = append(s.mainProcess.Env, "HOME="+s.GetRootDirectory(), "TERM=xterm-256color")
	for k, v := range steps.Environment {
		s.mainProcess.Env = append(s.mainProcess.Env, fmt.Sprintf("%s=%s", k, v))
	}

	s.mainProcess.Stdout = s.Wrapper
	s.mainProcess.Stderr = s.Wrapper

	pipe, err := s.mainProcess.StdinPipe()
	if err != nil {
		s.Wait.Done()
		return err
	}

	s.BaseEnvironment.CreateConsoleStdinProxy(steps.StdInConfig, pipe)
	s.BaseEnvironment.Console.Start()

	s.Log(logging.Info, "Starting process: %s %s", s.mainProcess.Path, strings.Join(s.mainProcess.Args[1:], " "))
	s.DisplayToConsole(true, "Starting process: %s %s", s.mainProcess.Path, strings.Join(s.mainProcess.Args[1:], " "))

	_ = s.StatusTracker.WriteMessage(pufferpanel.Transmission{
		Message: pufferpanel.ServerRunning{
			Running:    true,
			Installing: s.IsInstalling(),
		},
		Type: pufferpanel.MessageTypeStatus,
	})

	err = s.mainProcess.Start()
	if err != nil && err.Error() != "exit status 1" {
		s.Wait.Done()
		_ = s.StatusTracker.WriteMessage(pufferpanel.Transmission{
			Message: pufferpanel.ServerRunning{
				Running:    false,
				Installing: s.IsInstalling(),
			},
			Type: pufferpanel.MessageTypeStatus,
		})
		s.Log(logging.Info, "Process failed to start: %s", err)
		return
	} else {
		s.Log(logging.Info, "Process started (%d)", s.mainProcess.Process.Pid)
	}

	go s.handleClose(steps.Callback)
	return
}

func (s *standard) kill() (err error) {
	running, err := s.IsRunning()
	if err != nil {
		return err
	}
	if !running {
		return
	}
	return s.mainProcess.Process.Kill()
}

func (s *standard) isRunning() (isRunning bool, err error) {
	isRunning = s.mainProcess != nil && s.mainProcess.Process != nil
	if isRunning {
		pr, pErr := os.FindProcess(s.mainProcess.Process.Pid)
		if pr == nil || pErr != nil {
			isRunning = false
		} else if runtime.GOOS != "windows" && pr.Signal(syscall.Signal(0)) != nil {
			isRunning = false
		}
	}
	return
}

func (s *standard) GetStats() (*pufferpanel.ServerStats, error) {
	running, err := s.IsRunning()
	if err != nil {
		return nil, err
	}
	if !running {
		stats := &pufferpanel.ServerStats{
			Cpu:    0,
			Memory: 0,
		}

		if s.Server.Stats.Type == "jcmd" {
			stats.Jvm = &pufferpanel.JvmStats{}
		}

		return stats, nil
	}

	pr, err := process.NewProcess(int32(s.mainProcess.Process.Pid))
	if err != nil {
		return nil, err
	}

	memMap, _ := pr.MemoryInfo()
	cpu, _ := pr.Percent(time.Second * 1)

	return &pufferpanel.ServerStats{
		Cpu:    cpu,
		Memory: cast.ToFloat64(memMap.RSS),
	}, nil
}

func (s *standard) SendCode(code int) error {
	running, err := s.IsRunning()

	if err != nil || !running {
		return err
	}

	return s.mainProcess.Process.Signal(syscall.Signal(code))
}

func (s *standard) GetUid() int {
	return -1
}

func (s *standard) GetGid() int {
	return -1
}

func (s *standard) handleClose(callback func(exitCode int)) {
	err := s.mainProcess.Wait()

	_ = s.StatusTracker.WriteMessage(pufferpanel.Transmission{
		Message: pufferpanel.ServerRunning{
			Running: false,
		},
		Type: pufferpanel.MessageTypeStatus,
	})

	_ = s.Console.Close()

	var exitCode int
	if s.mainProcess == nil || s.mainProcess.ProcessState == nil || err != nil {
		var psErr *exec.ExitError
		if errors.As(err, &psErr) {
			exitCode = psErr.ExitCode()
		} else {
			exitCode = 1
		}
	} else {
		exitCode = s.mainProcess.ProcessState.ExitCode()
	}
	s.LastExitCode = exitCode

	if s.mainProcess != nil && s.mainProcess.Process != nil {
		_ = s.mainProcess.Process.Release()
	}

	s.mainProcess = nil

	s.Wait.Done()

	if callback != nil {
		callback(exitCode)
	}
}
