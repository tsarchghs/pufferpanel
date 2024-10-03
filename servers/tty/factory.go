//go:build !windows

package tty

import "github.com/pufferpanel/"

type EnvironmentFactory struct {
	pufferpanel.EnvironmentFactory
}

func (ef EnvironmentFactory) Create(id string) pufferpanel.Environment {
	t := &tty{
		BaseEnvironment: &pufferpanel.BaseEnvironment{Type: ef.Key(), ServerId: id},
	}

	t.BaseEnvironment.Wrapper = t.CreateWrapper()
	t.BaseEnvironment.ExecutionFunction = t.ttyExecuteAsync
	t.BaseEnvironment.IsRunningFunc = t.isRunning
	t.BaseEnvironment.KillFunc = t.kill

	return t
}

func (ef EnvironmentFactory) Key() string {
	return "host"
}
