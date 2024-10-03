package models

import (
	"github.com/pufferpanel/"
	"gopkg.in/go-playground/validator.v9"
	"gorm.io/gorm"
	"time"
)

type Server struct {
	Name       string `gorm:"column:name;not null;size:40;unique" json:"-" validate:"required,printascii"`
	Identifier string `gorm:"column:identifier;primaryKey;size:20" json:"-" validate:"required,printascii"`

	RawNodeID *uint `gorm:"column:node_id;index" json:"-" validate:"-"`
	NodeID    uint  `gorm:"-" json:"-" validate:"-"`
	Node      Node  `gorm:"foreignKey:RawNodeID" json:"-" validate:"-"`

	IP   string `gorm:"" json:"-" validate:"omitempty,ip|fqdn"`
	Port uint16 `gorm:"" json:"-" validate:"omitempty"`

	Type string `gorm:"NOT NULL;default='generic'" json:"-" validate:"required,printascii"`
	Icon string `gorm:"" json:"-"`

	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

func (s *Server) IsValid() (err error) {
	err = validator.New().Struct(s)
	if err != nil {
		err = pufferpanel.GenerateValidationMessage(err)
	}
	return
}

func (s *Server) BeforeSave(*gorm.DB) (err error) {
	err = s.IsValid()
	if s.NodeID == 0 || s.Node.IsLocal() {
		s.RawNodeID = nil
	} else {
		s.RawNodeID = &s.NodeID
	}
	return
}

func (s *Server) AfterFind(*gorm.DB) (err error) {
	if s.RawNodeID == nil || *s.RawNodeID == LocalNode.ID {
		s.Node = *LocalNode
	}
	return
}
