package servers

import (
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/conditions"
	"github.com/tsarchghs/pufferpanel/logging"
	"github.com/tsarchghs/pufferpanel/operations/alterfile"
	"github.com/tsarchghs/pufferpanel/operations/archive"
	"github.com/tsarchghs/pufferpanel/operations/command"
	"github.com/tsarchghs/pufferpanel/operations/console"
	"github.com/tsarchghs/pufferpanel/operations/curseforge"
	"github.com/tsarchghs/pufferpanel/operations/dockerpull"
	"github.com/tsarchghs/pufferpanel/operations/download"
	"github.com/tsarchghs/pufferpanel/operations/extract"
	"github.com/tsarchghs/pufferpanel/operations/fabricdl"
	"github.com/tsarchghs/pufferpanel/operations/forgedl"
	"github.com/tsarchghs/pufferpanel/operations/javadl"
	"github.com/tsarchghs/pufferpanel/operations/mkdir"
	"github.com/tsarchghs/pufferpanel/operations/mojangdl"
	"github.com/tsarchghs/pufferpanel/operations/move"
	neoforgedl "github.com/tsarchghs/pufferpanel/operations/neoforge"
	"github.com/tsarchghs/pufferpanel/operations/resolveforgeversion"
	"github.com/tsarchghs/pufferpanel/operations/resolveneoforgeversion"
	"github.com/tsarchghs/pufferpanel/operations/sleep"
	"github.com/tsarchghs/pufferpanel/operations/spongedl"
	"github.com/tsarchghs/pufferpanel/operations/steamgamedl"
	"github.com/tsarchghs/pufferpanel/operations/writefile"
	"github.com/spf13/cast"
)

var commandMapping = make(map[string]pufferpanel.OperationFactory)
var factories = []pufferpanel.OperationFactory{
	alterfile.Factory,
	archive.Factory,
	command.Factory,
	console.Factory,
	curseforge.Factory,
	dockerpull.Factory,
	download.Factory,
	extract.Factory,
	fabricdl.Factory,
	forgedl.Factory,
	javadl.Factory,
	mkdir.Factory,
	mojangdl.Factory,
	move.Factory,
	neoforgedl.Factory,
	resolveforgeversion.Factory,
	resolveneoforgeversion.Factory,
	sleep.Factory,
	spongedl.Factory,
	steamgamedl.Factory,
	writefile.Factory,
}

func init() {
	for _, v := range factories {
		commandMapping[v.Key()] = v
	}
}

func GenerateProcess(directions []pufferpanel.ConditionalMetadataType, environment pufferpanel.Environment, dataMapping map[string]interface{}, env map[string]string) (OperationProcess, error) {
	dataMap := make(map[string]interface{})
	for k, v := range dataMapping {
		dataMap[k] = v
	}

	dataMap["rootDir"] = environment.GetRootDirectory()
	operationList := make(OperationProcess, 0)
	for _, mapping := range directions {
		mapCopy := make(map[string]interface{})

		//replace tokens
		for k, v := range mapping.Metadata {
			switch r := v.(type) {
			case string:
				{
					mapCopy[k] = pufferpanel.ReplaceTokens(r, dataMap)
				}
			case []string:
				{
					mapCopy[k] = pufferpanel.ReplaceTokensInArr(r, dataMap)
				}
			case map[string]string:
				{
					mapCopy[k] = pufferpanel.ReplaceTokensInMap(r, dataMap)
				}
			case []interface{}:
				{
					//if we can convert this to a string list, we can work with it
					temp := cast.ToStringSlice(r)
					if len(temp) == len(r) {
						mapCopy[k] = pufferpanel.ReplaceTokensInArr(temp, dataMap)
					} else {
						mapCopy[k] = v
					}
				}
			default:
				mapCopy[k] = v
			}
		}

		envMap := pufferpanel.ReplaceTokensInMap(env, dataMap)

		opCreate := pufferpanel.CreateOperation{
			OperationArgs:        mapCopy,
			EnvironmentVariables: envMap,
			DataMap:              dataMap,
		}

		task := &OperationTask{Type: mapping.Type, Operation: opCreate, Condition: mapping.If}
		operationList = append(operationList, task)
	}
	return operationList, nil
}

type OperationProcess []*OperationTask

type OperationTask struct {
	Operation pufferpanel.CreateOperation
	Condition string
	Type      string
}

func (p *OperationProcess) Run(server *Server) error {
	if len(*p) == 0 {
		return nil
	}

	extraData := map[string]interface{}{
		conditions.VariableSuccess: true,
	}

	var firstError error
	for _, v := range *p {
		shouldRun, err := server.RunCondition(v.Condition, extraData)
		if err != nil {
			return err
		}

		if shouldRun {
			factory := commandMapping[v.Type]
			if factory == nil {
				return pufferpanel.ErrMissingFactory
			}
			op, err := factory.Create(v.Operation)
			if err != nil {
				return pufferpanel.ErrFactoryError(v.Type, err)
			}

			result := op.Run(pufferpanel.RunOperatorArgs{
				Environment: server.RunningEnvironment,
				Server:      server,
			})

			if result.Error != nil {
				logging.Error.Printf("Error running command: %s", result.Error.Error())
				if firstError == nil {
					firstError = result.Error
					//TODO: Implement success checking more accurately here
					return result.Error
				}
				extraData[conditions.VariableSuccess] = false
			} else {
				extraData[conditions.VariableSuccess] = true
			}

			if result.VariableOverrides != nil {
				for k, val := range result.VariableOverrides {
					variable := server.Variables[k]
					variable.Value = val
					server.Variables[k] = variable
				}
			}
		}
	}
	return firstError
}
