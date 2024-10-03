package services

import (
	"errors"
	"github.com/tsarchghs/pufferpanel/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Permission struct {
	DB *gorm.DB
}

func (ps *Permission) GetForUser(id uint) ([]*models.Permissions, error) {
	var allPerms []*models.Permissions
	permissions := &models.Permissions{
		UserId: &id,
	}

	err := ps.DB.Preload(clause.Associations).Where(permissions).Find(&allPerms).Error

	return allPerms, err
}

func (ps *Permission) GetForServer(serverId string) ([]*models.Permissions, error) {
	var allPerms []*models.Permissions
	permissions := &models.Permissions{
		ServerIdentifier: &serverId,
	}

	err := ps.DB.Preload(clause.Associations).Where(permissions).Find(&allPerms).Error

	return allPerms, err
}

func (ps *Permission) GetForUserAndServer(userId uint, serverId string) (*models.Permissions, error) {
	var id *string

	if serverId != "" {
		id = &serverId
	}

	permissions := &models.Permissions{
		UserId:           &userId,
		ServerIdentifier: id,
	}

	err := ps.DB.Preload(clause.Associations).Where(permissions).First(permissions).Error

	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		return permissions, nil
	}

	return permissions, err
}

func (ps *Permission) GetForClient(id uint) ([]*models.Permissions, error) {
	var allPerms []*models.Permissions
	permissions := &models.Permissions{
		ClientId: &id,
	}

	err := ps.DB.Preload(clause.Associations).Where(permissions).Find(&allPerms).Error

	return allPerms, err
}

func (ps *Permission) GetForClientAndServer(id uint, serverId *string) (*models.Permissions, error) {
	permissions := &models.Permissions{
		ClientId:         &id,
		ServerIdentifier: serverId,
	}

	err := ps.DB.Preload(clause.Associations).Where(permissions).FirstOrCreate(permissions).Error

	return permissions, err
}

func (ps *Permission) UpdatePermissions(perms *models.Permissions) error {
	//update oauth2 with new information
	//TODO: THIS NUKES STUFF IF YOU REMOVE GLOBAL PERMS........
	/*if perms.ShouldDelete() {
		return ps.Remove(perms)
	} else {
		return ps.DB.Save(perms).Error
	}*/

	return ps.DB.Omit(clause.Associations).Save(perms).Error
}

func (ps *Permission) Remove(perms *models.Permissions) error {
	//update oauth2 with new information

	return ps.DB.Omit(clause.Associations).Delete(perms).Error
}
