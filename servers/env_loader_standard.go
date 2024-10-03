//go:build windows && !nohost

package servers

import "github.com/tsarchghs/pufferpanel/servers/standard"

func init() {
	envMapping["host"] = standard.EnvironmentFactory{}
	envMapping["standard"] = standard.EnvironmentFactory{}
}
