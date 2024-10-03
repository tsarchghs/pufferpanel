package spongedl

import (
	"encoding/json"
	"errors"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/operations/forgedl"
	"net/http"
	"os"
	"path"
	"strings"
)

var SpongeApiBaseUrl = "https://dl-api.spongepowered.org/v2/groups/org.spongepowered/artifacts/"

type SpongeDl struct {
	Recommended      bool
	SpongeType       string
	SpongeVersion    string //version of sponge to download
	MinecraftVersion string //version of minecraft to download
}

type SpongeApiV2Versions struct {
	Artifacts map[string]interface{} `json:"artifacts"`
}

type SpongeApiV2Latest struct {
	Assets []SpongeApiV2Asset `json:"assets"`
	Tags   map[string]string
}

type SpongeApiV2Asset struct {
	Classifier  string
	DownloadUrl string
	Extension   string
}

func (op SpongeDl) Run(args pufferpanel.RunOperatorArgs) pufferpanel.OperationResult {
	env := args.Environment

	//first, we need to get the build we need to get, if one isn't specified
	if op.SpongeVersion == "" {
		data, err := op.getLatestVersion(env)
		if err != nil {
			return pufferpanel.OperationResult{Error: err}
		}

		if len(data.Artifacts) == 0 {
			env.DisplayToConsole(true, "No matching Sponge versions found")
			err = errors.New("no valid sponge versions found")
			return pufferpanel.OperationResult{Error: err}
		}

		for k := range data.Artifacts {
			op.SpongeVersion = k
			break
		}
	}

	var key string
	if op.SpongeType == "vanilla" {
		key = ""
	} else {
		key = "universal"
	}

	data, err := op.getSpecificVersion(env, op.SpongeVersion)
	if err != nil {
		return pufferpanel.OperationResult{Error: err}
	}

	var url string
	for _, v := range data.Assets {
		if v.Classifier == key && v.Extension == "jar" {
			url = v.DownloadUrl
		}
	}

	if url == "" {
		err = errors.New("no asset found to download")
		return pufferpanel.OperationResult{Error: err}
	}

	switch strings.ToLower(op.SpongeType) {
	case "spongeforge":
		{
			mapping := make(map[string]interface{})
			mapping["minecraftVersion"] = data.Tags["minecraft"]
			mapping["target"] = "forge-installer.jar"
			var forgeDlOp pufferpanel.Operation
			forgeDlOp, err = forgedl.Factory.Create(pufferpanel.CreateOperation{OperationArgs: mapping})
			if err != nil {
				return pufferpanel.OperationResult{Error: err}
			}

			res := forgeDlOp.Run(args)
			if res.Error != nil {
				return pufferpanel.OperationResult{Error: res.Error}
			}

			err = args.Server.GetFileServer().Mkdir("mods", 0755)
			if err != nil && !os.IsExist(err) {
				return pufferpanel.OperationResult{Error: err}
			}

			file, err := pufferpanel.DownloadViaMaven(url, env)
			if err != nil {
				return pufferpanel.OperationResult{Error: err}
			}

			//going to stick the spongeforge rename in, to assist with those modpacks
			err = pufferpanel.CopyFile(file, path.Join(env.GetRootDirectory(), "mods", "_aspongeforge.jar"))
			if err != nil {
				return pufferpanel.OperationResult{Error: err}
			}
		}
	case "spongevanilla":
		{
			file, err := pufferpanel.DownloadViaMaven(url, env)
			if err != nil {
				return pufferpanel.OperationResult{Error: err}
			}

			err = pufferpanel.CopyFile(file, path.Join(env.GetRootDirectory(), "server.jar"))
			if err != nil {
				return pufferpanel.OperationResult{Error: err}
			}
		}
	default:
		err = errors.New("invalid sponge type")
		return pufferpanel.OperationResult{Error: err}
	}

	return pufferpanel.OperationResult{Error: nil}
}

func (op SpongeDl) getLatestVersion(env pufferpanel.Environment) (SpongeApiV2Versions, error) {
	var data SpongeApiV2Versions

	var params = "?limit=1"
	if op.MinecraftVersion != "" {
		params += "&tags=minecraft:" + op.MinecraftVersion
	}
	if op.Recommended {
		params += "&recommended=true"
	}

	var url = SpongeApiBaseUrl + op.SpongeType + "/versions" + params

	response, err := pufferpanel.HttpGet(url)
	if err != nil {
		return data, err
	}
	defer pufferpanel.CloseResponse(response)
	if response.StatusCode != http.StatusOK {
		env.DisplayToConsole(true, "Failed to get the Sponge information from %s: %s", url, response.Status)
		return data, errors.New(response.Status)
	}

	err = json.NewDecoder(response.Body).Decode(&data)
	return data, err
}

func (op SpongeDl) getSpecificVersion(env pufferpanel.Environment, version string) (SpongeApiV2Latest, error) {
	var data SpongeApiV2Latest

	var url = SpongeApiBaseUrl + op.SpongeType + "/versions/" + version

	response, err := pufferpanel.HttpGet(url)
	if err != nil {
		return data, err
	}
	defer pufferpanel.CloseResponse(response)
	if response.StatusCode != http.StatusOK {
		env.DisplayToConsole(true, "Failed to get the Sponge information from %s: %s", url, response.Status)
		return data, errors.New(response.Status)
	}

	err = json.NewDecoder(response.Body).Decode(&data)
	return data, err
}
