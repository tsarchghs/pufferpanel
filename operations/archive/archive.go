package archive

import (
	"github.com/pufferpanel/"
)

type Archive struct {
	Source      []string
	Destination string
}

func (op Archive) Run(args pufferpanel.RunOperatorArgs) pufferpanel.OperationResult {
	err := args.Server.ArchiveItems(op.Source, op.Destination)
	return pufferpanel.OperationResult{Error: err}
}
