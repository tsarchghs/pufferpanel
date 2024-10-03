package main

import (
	"errors"
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/database"
	"github.com/tsarchghs/pufferpanel/models"
	"github.com/tsarchghs/pufferpanel/services"
	"github.com/spf13/cobra"
	"gorm.io/gorm"
)

var AddUserCmd = &cobra.Command{
	Use:   "add",
	Short: "Add user",
	Run:   addUser,
	Args:  cobra.NoArgs,
}

var EditUserCmd = &cobra.Command{
	Use:   "edit",
	Short: "Edit a user",
	Run:   editUser,
	Args:  cobra.NoArgs,
}

var userCmd = &cobra.Command{
	Use:   "user",
	Short: "Manage users",
}

var addUsername string
var addEmail string
var addIsAdmin bool
var addPassword string

func init() {
	userCmd.AddCommand(AddUserCmd, EditUserCmd)

	AddUserCmd.Flags().StringVar(&addUsername, "name", "", "username")
	AddUserCmd.Flags().StringVar(&addEmail, "email", "", "email")
	AddUserCmd.Flags().BoolVar(&addIsAdmin, "admin", false, "if admin")
	AddUserCmd.Flags().StringVar(&addPassword, "password", "", "password")
}

func addUser(cmd *cobra.Command, args []string) {
	answers := userCreate{
		Username: addUsername,
		Email:    addEmail,
		Admin:    addIsAdmin,
		Password: addPassword,
	}

	//should we ask if this user is an admin should only appear if no flags are used
	promptAdmin := true
	if answers.Admin || answers.Username != "" || answers.Email != "" || answers.Password != "" {
		promptAdmin = false
	}

	questions := make([]*survey.Question, 0)

	if answers.Username == "" {
		questions = append(questions, &survey.Question{
			Name: "username",
			Prompt: &survey.Input{
				Message: "Username:",
			},
			Validate: validateUsername,
		})
	}

	if answers.Email == "" {
		questions = append(questions, &survey.Question{
			Name: "email",
			Prompt: &survey.Input{
				Message: "Email:",
			},
			Validate: validateEmail,
		})
	}

	if answers.Password == "" {
		questions = append(questions, &survey.Question{
			Name: "password",
			Prompt: &survey.Password{
				Message: "Password:",
			},
			Validate: validatePassword,
		})
	}

	if promptAdmin {
		questions = append(questions, &survey.Question{
			Name: "admin",
			Prompt: &survey.Confirm{
				Message: "Admin",
			},
		})
	}

	if len(questions) > 0 {
		_ = survey.Ask(questions, &answers)
	}

	db, err := database.GetConnection()
	if err != nil {
		fmt.Printf("Failed to connect to database: %s\n", err.Error())
		return
	}
	defer database.Close()

	if err := db.Transaction(func(tx *gorm.DB) error {
		user := &models.User{
			Username:       answers.Username,
			Email:          answers.Email,
			HashedPassword: "",
		}
		err = user.SetPassword(answers.Password)
		if err != nil {
			fmt.Printf("Failed to set password: %s\n", err.Error())
			return err
		}

		us := &services.User{DB: tx}
		err = us.Create(user)
		if err != nil {
			fmt.Printf("Failed to create user: %s\n", err.Error())
			return err
		}

		ps := &services.Permission{DB: tx}
		perms, err := ps.GetForUserAndServer(user.ID, "")
		if err != nil {
			fmt.Printf("Failed to get permissions: %s\n", err.Error())
			return err
		}

		if answers.Admin {
			perms.Scopes = pufferpanel.AddScope(perms.Scopes, pufferpanel.ScopeAdmin)
		}

		err = ps.UpdatePermissions(perms)
		if err != nil {
			fmt.Printf("Failed to apply permissions: %s\n", err.Error())
			return err
		}

		return nil
	}); err != nil {
		return
	}

	fmt.Printf("User added\n")
}

func validateEmail(val interface{}) error {
	email := val.(string)

	var viewModel models.UserView
	viewModel.Email = email
	err := viewModel.EmailValid(false)
	if err != nil {
		return err
	}

	return nil
}

func validateUsername(val interface{}) error {
	usr := val.(string)

	var viewModel models.UserView
	viewModel.Username = usr
	err := viewModel.UserNameValid(false)
	if err != nil {
		return err
	}

	return nil
}

func validatePassword(val interface{}) error {
	pw, ok := val.(string)
	if !ok {
		return errors.New("password is not a string")
	}

	us := &services.User{}
	if !us.IsSecurePassword(pw) {
		return errors.New("Password must be at least 8 characters")
	}

	var secondAttempt string
	confirm := &survey.Password{
		Message: "Confirm Password",
	}
	_ = survey.AskOne(confirm, &secondAttempt)

	if secondAttempt != pw {
		return errors.New("password do not match")
	}

	return nil
}

type userCreate struct {
	Username string
	Email    string
	Password string
	Admin    bool
}

func editUser(cmd *cobra.Command, args []string) {
	if !pufferpanel.UserInGroup() {
		fmt.Printf("You do not have permission to use this command")
		return
	}

	db, err := database.GetConnection()
	if err != nil {
		fmt.Printf("Error connecting to database: %s", err.Error())
		return
	}
	defer database.Close()

	var username string
	_ = survey.AskOne(&survey.Input{
		Message: "Username:",
	}, &username, survey.WithValidator(survey.Required))

	us := &services.User{DB: db}

	user, err := us.Get(username)
	if err != nil && err == gorm.ErrRecordNotFound {
		fmt.Printf("No user with username '%s'\n", username)
		return
	} else if err != nil {
		fmt.Printf("Error getting user: %s\n", err.Error())
		return
	}

	action := ""
	_ = survey.AskOne(&survey.Select{
		Message: "Select option to edit",
		Options: []string{"Username", "Email", "Password", "Change Admin Status"},
	}, &action)

	switch action {
	case "Username":
		{
			prompt := ""
			_ = survey.AskOne(&survey.Input{
				Message: "New Username:",
			}, &prompt, survey.WithValidator(survey.Required))
			user.Username = prompt

			err = us.Update(user)
			if err != nil {
				fmt.Printf("Error updating username: %s\n", err.Error())
			}
		}
	case "Email":
		{
			prompt := ""
			_ = survey.AskOne(&survey.Input{
				Message: "New Email:",
			}, &prompt, survey.WithValidator(survey.Required))
			user.Email = prompt

			err = us.Update(user)
			if err != nil {
				fmt.Printf("Error updating email: %s\n", err.Error())
			}
		}
	case "Password":
		{
			prompt := ""
			_ = survey.AskOne(&survey.Password{
				Message: "New Password:",
			}, &prompt, survey.WithValidator(validatePassword))

			err = user.SetPassword(prompt)
			if err != nil {
				fmt.Printf("Error updating password: %s\n", err.Error())
			}

			err = us.Update(user)
			if err != nil {
				fmt.Printf("Error updating password: %s\n", err.Error())
			}
		}
	case "Change Admin Status":
		{
			prompt := false
			_ = survey.AskOne(&survey.Confirm{
				Message: "Set Admin Status: ",
			}, &prompt)

			ps := &services.Permission{DB: db}
			perms, err := ps.GetForUserAndServer(user.ID, "")
			if err != nil {
				fmt.Printf("Error updating permissions: %s\n", err.Error())
				return
			}

			//perms.Admin = prompt
			if prompt {
				perms.Scopes = pufferpanel.AddScope(perms.Scopes, pufferpanel.ScopeAdmin)
			} else {
				perms.Scopes = pufferpanel.RemoveScope(perms.Scopes, pufferpanel.ScopeAdmin)
			}

			err = ps.UpdatePermissions(perms)
			if err != nil {
				fmt.Printf("Error updating password: %s\n", err.Error())
			}
		}
	}
}
