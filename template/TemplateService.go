package template

import (
	"html/template"
	"io"
	"strconv"

	"github.com/AOjdanic/Rick_And_Morty_Mini_Project/types"
	"github.com/labstack/echo/v4"
)

type Template struct {
	template *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.template.ExecuteTemplate(w, name, data)
}

func NewTemplate() *Template {
	return &Template{
		template: template.Must(template.ParseGlob("views/*.html")),
	}
}

func GenerateTemplateContent(data types.RNMResponse, c echo.Context) types.ContentInfo {
	var characters []types.CharacterInfo
	for index, character := range data.Results {
		isLast := index == len(data.Results)-1

		characters = append(characters, types.CharacterInfo{
			Id:       character.Id,
			Name:     character.Name,
			Image:    character.Image,
			Location: character.Location,
			IsLast:   isLast,
		})
	}

	nextPage := GetNextPageParam(c)
	content := types.ContentInfo{
		NextPage:   nextPage,
		Characters: characters,
		Gender:     c.QueryParam("gender"),
		Status:     c.QueryParam("status"),
		Species:    c.QueryParam("species"),
	}

	return content
}

func GetNextPageParam(c echo.Context) int {
	var currentPage int

	pageUrlParam := c.QueryParam("page")
	if pageUrlParam == "" {
		currentPage = 1
	} else {
		convertedPageParam, err := strconv.Atoi(pageUrlParam)

		if err != nil {
			currentPage = 1
		} else {
			currentPage = convertedPageParam
		}
	}
	nextPage := currentPage + 1

	return nextPage
}
