package fabricdl

import "github.com/pufferpanel/"

type OperationFactory struct {
	pufferpanel.OperationFactory
}

func (of OperationFactory) Create(op pufferpanel.CreateOperation) (pufferpanel.Operation, error) {
	return &Fabricdl{}, nil
}

func (of OperationFactory) Key() string {
	return "fabricdl"
}

var Factory OperationFactory
