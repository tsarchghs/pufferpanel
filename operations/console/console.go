package console

import "github.com/pufferpanel/"

type Console struct {
	Text string
}

func (d Console) Run(args pufferpanel.RunOperatorArgs) pufferpanel.OperationResult {
	env := args.Environment

	env.DisplayToConsole(true, "Message: %s \n", d.Text)
	return pufferpanel.OperationResult{Error: nil}
}
