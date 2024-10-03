package email

import (
	"github.com/tsarchghs/pufferpanel/logging"
)

type debugProvider struct {
	Provider
}

func init() {
	providers["debug"] = debugProvider{}
}

func (debugProvider) Send(to, subject, body string) error {
	logging.Debug.Println("DEBUG EMAIL TO " + to + "\n" + subject + "\n" + body)
	return nil
}
