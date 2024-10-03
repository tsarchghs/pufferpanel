package extract

import (
	"github.com/pufferpanel/"
)

type Extract struct {
	Source      string
	Destination string
}

func (op Extract) Run(args pufferpanel.RunOperatorArgs) pufferpanel.OperationResult {
	err := args.Server.Extract(op.Source, op.Destination)
	return pufferpanel.OperationResult{Error: err}
}
