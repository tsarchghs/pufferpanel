package tests

import (
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/database"
	"github.com/tsarchghs/pufferpanel/models"
	"github.com/tsarchghs/pufferpanel/services"
	"github.com/spf13/cast"
	"gorm.io/gorm"
	"sync"
)

var loginNoLoginUser = &models.User{
	Username:  "loginNoLoginUser",
	Email:     "noscope@example.com",
	OtpActive: false,
}

const loginNoLoginUserPassword = "dontletmein"

var loginNoServerViewUser = &models.User{
	Username:  "loginNoServerViewUser",
	Email:     "test@example.com",
	OtpActive: false,
}

const loginNoServerViewUserPassword = "testing123"

var loginAdminUser = &models.User{
	Username:  "loginAdminUser",
	Email:     "admin@example.com",
	OtpActive: false,
}

const loginAdminUserPassword = "asdfasdf"

var loginNoAdminWithServersUser = &models.User{
	Username:  "loginNoAdminWithServersUser",
	Email:     "notadmin@example.com",
	OtpActive: false,
}

const loginNoAdminWithServersUserPassword = "dowiuzlaslf"

var loginOAuth2Admin = &models.Client{
	ClientId:    "testadmin",
	Name:        "testadminclient",
	Description: "For unit testing only",
	User:        loginAdminUser,
}

var loginOAuth2AdminPermissions = &models.Permissions{
	Scopes: []*pufferpanel.Scope{pufferpanel.ScopeAdmin},
}

const loginOAuth2AdminSecret = "rawr"

func init() {
	_ = loginNoLoginUser.SetPassword(loginNoLoginUserPassword)
	_ = loginNoServerViewUser.SetPassword(loginNoServerViewUserPassword)
	_ = loginAdminUser.SetPassword(loginAdminUserPassword)
	_ = loginNoAdminWithServersUser.SetPassword(loginNoAdminWithServersUserPassword)
	_ = loginOAuth2Admin.SetClientSecret(loginOAuth2AdminSecret)
}

func prepareUsers(db *gorm.DB) error {
	err := initNoLoginUser(db)
	if err != nil {
		return err
	}

	err = initLoginNoServersUser(db)
	if err != nil {
		return err
	}

	err = initLoginAdminUser(db)
	if err != nil {
		return err
	}

	err = initLoginNoAdminWithServersUser(db)
	if err != nil {
		return err
	}

	err = initOauth2Client(db)
	if err != nil {
		return err
	}

	return nil
}

func initNoLoginUser(db *gorm.DB) error {
	return db.Create(loginNoLoginUser).Error
}

func initLoginNoServersUser(db *gorm.DB) error {
	err := db.Create(loginNoServerViewUser).Error
	if err != nil {
		return err
	}

	perms := &models.Permissions{
		UserId: &loginNoServerViewUser.ID,
		Scopes: []*pufferpanel.Scope{pufferpanel.ScopeLogin},
	}
	err = db.Create(perms).Error
	return err
}

func initLoginAdminUser(db *gorm.DB) error {
	err := db.Create(loginAdminUser).Error
	if err != nil {
		return err
	}

	perms := &models.Permissions{
		UserId: &loginAdminUser.ID,
		Scopes: []*pufferpanel.Scope{pufferpanel.ScopeAdmin},
	}
	err = db.Create(perms).Error
	return err
}

func initLoginNoAdminWithServersUser(db *gorm.DB) error {
	return db.Create(loginNoAdminWithServersUser).Error
}

func initOauth2Client(db *gorm.DB) error {
	loginOAuth2Admin.User = loginAdminUser
	err := db.Create(loginOAuth2Admin).Error
	if err != nil {
		return err
	}

	perms := &models.Permissions{
		ClientId: &loginOAuth2Admin.ID,
		Scopes:   []*pufferpanel.Scope{pufferpanel.ScopeAdmin},
	}
	err = db.Create(perms).Error
	return err
}

func createSession(db *gorm.DB, user *models.User) (string, error) {
	ss := &services.Session{DB: db}
	return ss.CreateForUser(user)
}

var adminSession string
var adminSessionLock sync.Mutex

func createSessionAdmin() (string, error) {
	adminSessionLock.Lock()
	defer adminSessionLock.Unlock()

	if adminSession != "" {
		return adminSession, nil
	}

	db, err := database.GetConnection()
	if err != nil {
		return "", err
	}
	adminSession, err = createSession(db, loginAdminUser)
	return adminSession, err
}

var CreateServerData = []byte(`{
  "type": "minecraft-java",
  "data": {
    "eula": {
      "type": "boolean",
      "desc": "Do you (or the server owner) agree to the \u003ca href='https://account.mojang.com/documents/minecraft_eula'\u003eMinecraft EULA?\u003c/a\u003e",
      "display": "EULA Agreement (true/false)",
      "required": true,
      "value": false
    },
    "ip": {
      "type": "",
      "desc": "What IP to bind the server to",
      "display": "IP",
      "required": true,
      "value": "0.0.0.0"
    },
    "javaversion": {
      "type": "",
      "desc": "Version of Java to use",
      "display": "Java Version",
      "required": true,
      "value": "17"
    },
    "memory": {
      "type": "integer",
      "desc": "How much memory in MB to allocate to the Java Heap",
      "display": "Memory (MB)",
      "required": true,
      "value": 1024
    },
    "motd": {
      "type": "",
      "desc": "This is the message that is displayed in the server list of the client, below the name. The MOTD does support \u003ca href='https://minecraft.gamepedia.com/Formatting_codes' target='_blank'\u003ecolor and formatting codes\u003c/a\u003e.",
      "display": "MOTD message of the day",
      "required": true,
      "value": "A Minecraft Server\\n\\u00A79 hosted on PufferPanel",
      "userEdit": true
    },
    "port": {
      "type": "integer",
      "desc": "What port to bind the server to",
      "display": "Port",
      "required": true,
      "value": 25565
    },
    "version": {
      "type": "",
      "desc": "Version of Minecraft you wish to install (not all software may respect this value",
      "display": "Version",
      "required": true,
      "value": "latest"
    }
  },
  "display": "Minecraft: Java Edition",
  "environment": {
    "type": "host"
  },
  "install": [
    {
      "if": "javaversion != \"\"",
      "type": "javadl",
      "version": "${javaversion}"
    },
    {
      "target": "server.jar",
      "type": "mojangdl",
      "version": "${version}"
    },
    {
      "if": "!file_exists(\"server.properties\")",
      "target": "server.properties",
      "text": "server-ip=${ip}\nserver-port=${port}\nmotd=${motd}\n",
      "type": "writefile"
    },
    {
      "target": "eula.txt",
      "text": "eula=${eula}",
      "type": "writefile"
    }
  ],
  "run": {
    "command": [
      {
        "command": "java${javaversion} -Xmx${memory}M -Dterminal.jline=false -Dterminal.ansi=true -Dlog4j2.formatMsgNoLookups=true -jar server.jar",
        "if": "in_path(\"java${javaversion}\")"
      },
      {
        "command": "java -Xmx${memory}M -Dterminal.jline=false -Dterminal.ansi=true -Dlog4j2.formatMsgNoLookups=true -jar server.jar"
      }
    ],
    "stop": "stop"
  }
}`)

var TestServerData = []byte(`{
  "type": "testing",
  "display": "API Test Server",
  "name": "Test Var",
  "data": {
    "ip": {
      "value": "0.0.0.0",
      "required": true,
      "desc": "What IP to bind the server to",
      "display": "IP",
      "type": "string"
    },
    "port": {
      "value": "25565",
      "required": true,
      "desc": "What port to bind the server to",
      "display": "Port",
      "type": "integer"
    }
  },
  "install": [
    {
      "type": "writefile",
      "text": "install successed",
      "target": "installed.txt"
    }
  ],
  "run": {
    "command": [
      "echo started"      
    ],
    "stop": "stop"
  },
  "environment": {
    "type": "standard"
  }
}`)

var TemplateData = []byte(`{
  "type": "minecraft-java",
  "display": "Vanilla - Minecraft",
  "data": {
    "version": {
      "value": "latest",
      "required": true,
      "desc": "Version of Minecraft to install",
      "display": "Version",
      "internal": false
    },
    "memory": {
      "value": "1024",
      "required": true,
      "desc": "How much memory in MB to allocate to the Java Heap",
      "display": "Memory (MB)",
      "internal": false,
      "type": "integer"
    },
    "ip": {
      "value": "0.0.0.0",
      "required": true,
      "desc": "What IP to bind the server to",
      "display": "IP",
      "internal": false
    },
    "port": {
      "value": "25565",
      "required": true,
      "desc": "What port to bind the server to",
      "display": "Port",
      "internal": false,
      "type": "integer"
    },
    "eula": {
      "value": "false",
      "required": true,
      "desc": "Do you (or the server owner) agree to the <a href='https://account.mojang.com/documents/minecraft_eula'>Minecraft EULA?</a>",
      "display": "EULA Agreement",
      "internal": false,
      "type": "boolean"
    },
    "motd": {
      "value": "A Minecraft Server\\n\\u00A79 hosted on PufferPanel",
      "required": true,
      "desc": "This is the message that is displayed in the server list of the client, below the name. The MOTD does support <a href='https://minecraft.wiki/w/Formatting_codes' target='_blank'>color and formatting codes</a>.",
      "display": "MOTD message of the day",
      "internal": false
    },
    "javaversion": {
      "type": "integer",
      "desc": "Version of Java to use",
      "display": "Java Version",
      "value": "17",
      "required": true
    }
  },
  "install": [
    {
      "type": "javadl",
      "version": "${javaversion}"
    },
    {
      "type": "mojangdl",
      "version": "${version}",
      "target": "server.jar"
    },
    {
      "type": "writefile",
      "text": "server-ip=${ip}\nserver-port=${port}\nmotd=${motd}\n",
      "target": "server.properties"
    },
    {
      "type": "writefile",
      "text": "eula=${eula}",
      "target": "eula.txt"
    }
  ],
  "run": {
    "command": "java${javaversion} -Xmx${memory}M -Dlog4j2.formatMsgNoLookups=true -jar server.jar nogui",
    "stop": "stop"
  },
  "environment": {
    "type": "standard"
  }
}`)

var EditServerNewName = "testserver-update"
var EditServerNewIP = "127.0.0.1"
var EditServerNewPort = uint16(25566)
var EditServerData = []byte(`{
  "name": "` + EditServerNewName + `",
  "type": "minecraft-java",
  "data": {
    "eula": {
      "type": "boolean",
      "desc": "Do you (or the server owner) agree to the \u003ca href='https://account.mojang.com/documents/minecraft_eula'\u003eMinecraft EULA?\u003c/a\u003e",
      "display": "EULA Agreement (true/false)",
      "required": true,
      "value": false
    },
    "ip": {
      "type": "",
      "desc": "What IP to bind the server to",
      "display": "IP",
      "required": true,
      "value": "` + EditServerNewIP + `"
    },
    "javaversion": {
      "type": "",
      "desc": "Version of Java to use",
      "display": "Java Version",
      "required": true,
      "value": "17"
    },
    "memory": {
      "type": "integer",
      "desc": "How much memory in MB to allocate to the Java Heap",
      "display": "Memory (MB)",
      "required": true,
      "value": 1024
    },
    "motd": {
      "type": "",
      "desc": "This is the message that is displayed in the server list of the client, below the name. The MOTD does support \u003ca href='https://minecraft.gamepedia.com/Formatting_codes' target='_blank'\u003ecolor and formatting codes\u003c/a\u003e.",
      "display": "MOTD message of the day",
      "required": true,
      "value": "A Minecraft Server\\n\\u00A79 hosted on PufferPanel",
      "userEdit": true
    },
    "port": {
      "type": "integer",
      "desc": "What port to bind the server to",
      "display": "Port",
      "required": true,
      "value": ` + cast.ToString(EditServerNewPort) + `
    },
    "version": {
      "type": "",
      "desc": "Version of Minecraft you wish to install (not all software may respect this value",
      "display": "Version",
      "required": true,
      "value": "latest"
    }
  },
  "display": "Minecraft: Java Edition",
  "environment": {
    "type": "host"
  },
  "install": [
    {
      "if": "javaversion != \"\"",
      "type": "javadl",
      "version": "${javaversion}"
    },
    {
      "target": "server.jar",
      "type": "mojangdl",
      "version": "${version}"
    },
    {
      "if": "!file_exists(\"server.properties\")",
      "target": "server.properties",
      "text": "server-ip=${ip}\nserver-port=${port}\nmotd=${motd}\n",
      "type": "writefile"
    },
    {
      "target": "eula.txt",
      "text": "eula=${eula}",
      "type": "writefile"
    }
  ],
  "run": {
    "command": [
      {
        "command": "java${javaversion} -Xmx${memory}M -Dterminal.jline=false -Dterminal.ansi=true -Dlog4j2.formatMsgNoLookups=true -jar server.jar",
        "if": "in_path(\"java${javaversion}\")"
      },
      {
        "command": "java -Xmx${memory}M -Dterminal.jline=false -Dterminal.ansi=true -Dlog4j2.formatMsgNoLookups=true -jar server.jar"
      }
    ],
    "stop": "stop"
  }
}`)

var NewVariableChanges = []byte(`{
	"ip": "` + NewVariableChangeIP + `",
	"port": ` + cast.ToString(NewVariableChangePort) + `
}`)

var NewVariableChangeIP = "1.2.3.4"
var NewVariableChangePort uint16 = 5356
