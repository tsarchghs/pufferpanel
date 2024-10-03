package download

import (
	"github.com/cavaliergopher/grab"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/logging"
)

type Download struct {
	Files []string
}

func (d Download) Run(args pufferpanel.RunOperatorArgs) pufferpanel.OperationResult {
	env := args.Environment

	for _, file := range d.Files {
		logging.Info.Printf("Download file from %s to %s", file, env.GetRootDirectory())
		env.DisplayToConsole(true, "Downloading file %s\n", file)
		_, err := grab.Get(env.GetRootDirectory(), file)
		if err != nil {
			return pufferpanel.OperationResult{Error: err}
		}
	}
	return pufferpanel.OperationResult{Error: nil}
}
