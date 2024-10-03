package resolveforgeversion

import (
	"github.com/pufferpanel/"
	"github.com/spf13/cast"
)

type OperationFactory struct {
	pufferpanel.OperationFactory
}

func (of OperationFactory) Create(op pufferpanel.CreateOperation) (pufferpanel.Operation, error) {
	minecraftVersion := cast.ToString(op.OperationArgs["minecraftVersion"])
	version := cast.ToString(op.OperationArgs["version"])
	outputVariable := cast.ToString(op.OperationArgs["outputVariable"])

	if outputVariable == "" {
		outputVariable = "opForgeVersion"
	}

	return ResolveForgeVersion{Version: version, MinecraftVersion: minecraftVersion, OutputVariable: outputVariable}, nil
}

func (of OperationFactory) Key() string {
	return "resolveforgeversion"
}

var Factory OperationFactory
