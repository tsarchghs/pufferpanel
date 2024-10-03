package services

import (
	"errors"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/database"
	"golang.org/x/crypto/ssh"
	"strings"
)

type DatabaseSFTPAuthorization struct {
}

func (s *DatabaseSFTPAuthorization) Validate(username, password string) (perms *ssh.Permissions, err error) {
	parts := strings.Split(username, "#")
	if len(parts) != 2 {
		return nil, errors.New("incorrect username or password")
	}

	email := parts[0]
	serverId := parts[1]

	db, err := database.GetConnection()
	if err != nil {
		return nil, pufferpanel.ErrDatabaseNotAvailable
	}

	us := &User{DB: db}
	user, err := us.GetByEmail(email)
	if user == nil || err != nil || !us.IsValidCredentials(user, password) {
		return nil, errors.New("incorrect username or password")
	}

	ss := &Permission{DB: db}
	serverPerms, err := ss.GetForUserAndServer(user.ID, serverId)
	if err != nil {
		return nil, errors.New("incorrect username or password")
	}

	if !pufferpanel.ContainsScope(serverPerms.Scopes, pufferpanel.ScopeServerSftp) {
		return nil, errors.New("incorrect username or password")
	}

	perms = &ssh.Permissions{}
	perms.Extensions = make(map[string]string)
	perms.Extensions["server_id"] = serverId
	return perms, nil
}
