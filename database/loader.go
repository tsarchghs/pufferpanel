package database

import (
	"fmt"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/config"
	"github.com/tsarchghs/pufferpanel/logging"
	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/driver/sqlserver"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"os"
	"strings"
	"sync"
	"time"
)

var dbConn *gorm.DB
var lock sync.Mutex

func openConnection() (err error) {
	//lock system so we can only connect one at a time
	lock.Lock()
	defer lock.Unlock()

	//if we had 2 calls to this before it was established, quick out since it's already created
	if dbConn != nil {
		return
	}

	dialect := GetDialect()
	connString := GetConnectionString()

	var dialector gorm.Dialector
	switch dialect {
	case "sqlite3":
		dialector = sqlite.Open(connString)
	case "mysql":
		dialector = mysql.Open(connString)
	case "postgresql":
		dialector = postgres.Open(connString)
	case "sqlserver":
		dialector = sqlserver.Open(connString)
	default:
		return fmt.Errorf("unknown dialect %s", dialect)
	}

	gormConfig := gorm.Config{}
	gormConfig.Logger = logger.New(log.New(os.Stdout, "\r\n", log.LstdFlags), logger.Config{
		SlowThreshold:             time.Second, // Slow SQL threshold
		LogLevel:                  logger.Silent,
		IgnoreRecordNotFoundError: true,
		Colorful:                  false,
	})

	if config.DatabaseLoggingEnabled.Value() {
		logging.Info.Printf("Database logging enabled")
		gormConfig.Logger = gormConfig.Logger.LogMode(logger.Info)
	}

	// Sqlite doesn't implement constraints see https://gorm.io/docs/migration.html#Auto-Migration
	gormConfig.DisableForeignKeyConstraintWhenMigrating = dialect == "sqlite3"

	dbConn, err = gorm.Open(dialector, &gormConfig)

	if err != nil {
		dbConn = nil
		logging.Error.Printf("Error connecting to database: %s", err)
		return pufferpanel.ErrDatabaseNotAvailable
	}

	if dialect == "sqlite3" {
		d, e := dbConn.DB()
		if e != nil {
			return e
		}
		d.SetMaxOpenConns(1)
	}

	return nil
}

func GetConnection() (*gorm.DB, error) {
	var err error
	if dbConn == nil {
		err = openConnection()
	}

	return dbConn, err
}

func Close() {
	if dbConn != nil {
		sqlDB, _ := dbConn.DB()
		pufferpanel.Close(sqlDB)
	}
}

func GetDialect() string {
	dialect := config.DatabaseDialect.Value()
	if dialect == "" {
		dialect = "sqlite3"
	}
	return dialect
}

func GetConnectionString() string {
	dialect := GetDialect()

	connString := config.DatabaseUrl.Value()
	if connString == "" {
		switch dialect {
		case "mysql":
			connString = "pufferpanel:pufferpanel@/pufferpanel"
		case "sqlite3":
			connString = "file:pufferpanel.db"
		}
	}

	if dialect == "mysql" {
		connString = addConnectionSetting(connString, "charset=utf8")
		connString = addConnectionSetting(connString, "parseTime=true")
	} else if dialect == "sqlite3" {
		connString = addConnectionSetting(connString, "cache=shared")
		connString = addConnectionSetting(connString, "_loc=auto")
		connString = addConnectionSetting(connString, "_foreign_keys=1")
		connString = addConnectionSetting(connString, "_journal_mode=WAL")
		connString = addConnectionSetting(connString, "_busy_timeout=5000")
		connString = addConnectionSetting(connString, "_tx_lock=immediate")
	}
	return connString
}

func addConnectionSetting(connString, setting string) string {
	if strings.Contains(connString, setting) {
		return connString
	}

	if strings.Contains(connString, "?") {
		connString += "&"
	} else {
		connString += "?"
	}
	connString += setting

	return connString
}
