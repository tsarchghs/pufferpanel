//go:build !windows && !nohost

package servers

import "github.com/tsarchghs/pufferpanel/servers/tty"

func init() {
	envMapping["host"] = tty.EnvironmentFactory{}
	envMapping["tty"] = tty.EnvironmentFactory{}
	envMapping["standard"] = tty.EnvironmentFactory{}
}
