package javadl

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/config"
	"github.com/tsarchghs/pufferpanel/logging"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"sync"
)

var downloader sync.Mutex
var DownloadLink = "https://api.adoptium.net/assets/feature_releases/${version}/ga?architecture=${arch}&image_type=jdk&os=${os}&page=0&page_size=1&project=jdk&sort_method=DEFAULT&sort_order=DESC&vendor=eclipse"

type JavaDl struct {
	Version string
}

func (op JavaDl) Run(args pufferpanel.RunOperatorArgs) pufferpanel.OperationResult {
	env := args.Environment

	env.DisplayToConsole(true, "Downloading Java "+op.Version)

	downloader.Lock()
	defer downloader.Unlock()

	rootBinaryFolder := config.BinariesFolder.Value()
	mainCommand := filepath.Join(rootBinaryFolder, "java"+op.Version)
	mainCCommand := filepath.Join(rootBinaryFolder, "javac"+op.Version)

	_, err := exec.LookPath("java" + op.Version)

	if errors.Is(err, exec.ErrNotFound) {
		var file File
		file, err = op.callAdoptiumApi()
		if err != nil {
			return pufferpanel.OperationResult{Error: err}
		}

		//cleanup the existing dir
		err = os.RemoveAll(filepath.Join(rootBinaryFolder, file.ReleaseName))
		if err != nil {
			return pufferpanel.OperationResult{Error: err}
		}

		url := file.Binaries[0].Package.Link

		logging.Debug.Println("Calling " + url)
		err = pufferpanel.HttpExtract(url, rootBinaryFolder)

		if err != nil {
			return pufferpanel.OperationResult{Error: err}
		}

		_ = os.Remove(mainCommand)
		_ = os.Remove(mainCCommand)

		logging.Debug.Printf("Adding to path: %s\n", mainCommand)
		err = os.Symlink(filepath.Join(file.ReleaseName, "bin", "java"), mainCommand)
		if err != nil {
			return pufferpanel.OperationResult{Error: err}
		}

		logging.Debug.Printf("Adding to path: %s\n", mainCCommand)
		err = os.Symlink(filepath.Join(file.ReleaseName, "bin", "javac"), mainCCommand)
		if err != nil {
			return pufferpanel.OperationResult{Error: err}
		}
	}

	return pufferpanel.OperationResult{Error: err}
}

func (op JavaDl) callAdoptiumApi() (File, error) {
	replacements := map[string]interface{}{
		"version": op.Version,
	}
	if runtime.GOOS == "windows" {
		replacements["os"] = "windows"
	} else {
		replacements["os"] = "linux"
	}

	switch runtime.GOARCH {
	case "arm64":
		{
			replacements["arch"] = "aarch64"
		}
	case "arm":
		{
			replacements["arch"] = "arm"
		}
	default:
		{
			replacements["arch"] = "x64"
		}
	}

	url := pufferpanel.ReplaceTokens(DownloadLink, replacements)

	logging.Debug.Println("Calling " + url)
	response, err := pufferpanel.HttpGet(url)
	defer pufferpanel.CloseResponse(response)
	if err != nil {
		return File{}, err
	}

	var data []File
	err = json.NewDecoder(response.Body).Decode(&data)
	if err != nil {
		return File{}, err
	}

	if len(data) != 1 {
		return File{}, fmt.Errorf("expected 1 match from adoptium, found %d", len(data))
	}

	if len(data[0].Binaries) != 1 {
		return File{}, fmt.Errorf("expected 1 binary from adoptium, found %d", len(data[0].Binaries))
	}
	return data[0], nil
}
