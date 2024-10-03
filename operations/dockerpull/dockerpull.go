package dockerpull

import (
	"context"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/servers/docker"
)

type DockerPull struct {
	ImageName string
}

func (d DockerPull) Run(args pufferpanel.RunOperatorArgs) pufferpanel.OperationResult {
	env := args.Environment
	dockerEnv, ok := env.(*docker.Docker)

	if !ok {
		return pufferpanel.OperationResult{Error: pufferpanel.ErrEnvironmentNotSupported}
	}

	err := dockerEnv.PullImage(context.Background(), d.ImageName, true)
	return pufferpanel.OperationResult{Error: err}
}
