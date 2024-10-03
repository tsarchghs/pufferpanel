//go:build !nodocker

package servers

import "github.com/tsarchghs/pufferpanel/servers/docker"

func init() {
	envMapping["docker"] = docker.EnvironmentFactory{}
}
