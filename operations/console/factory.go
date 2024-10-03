package console

import (
	"github.com/pufferpanel/"
	"github.com/spf13/cast"
)

type OperationFactory struct {
	pufferpanel.OperationFactory
}

func (of OperationFactory) Create(op pufferpanel.CreateOperation) (pufferpanel.Operation, error) {
	message := cast.ToString(op.OperationArgs["message"])
	return &Console{Text: message}, nil
}

func (of OperationFactory) Key() string {
	return "console"
}

var Factory OperationFactory
