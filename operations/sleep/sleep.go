package sleep

import (
	"github.com/pufferpanel/"
	"time"
)

type Sleep struct {
	Duration time.Duration
}

func (d Sleep) Run(args pufferpanel.RunOperatorArgs) pufferpanel.OperationResult {
	time.Sleep(d.Duration)
	return pufferpanel.OperationResult{Error: nil}
}
