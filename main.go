package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"net/http"
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

func newTemplate() *Template {
	return &Template{
		template: template.Must(template.ParseGlob("views/*.html")),
	}
}

func main() {
	e := echo.New()

	e.Renderer = newTemplate()

	e.GET("/", func(c echo.Context) error {
		res, err := http.Get(fmt.Sprintf("https://rickandmortyapi.com/api/character?%s", c.Request().URL.RawQuery))
		if err != nil {
			return err
		}

		body, err := io.ReadAll(res.Body)
		if err != nil {
			return err
		}

		defer res.Body.Close()

		var data types.RNMResponse

		if err := json.Unmarshal(body, &data); err != nil {
			return err
		}

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

		content := types.ContentInfo{
			NextPage:   nextPage,
			Characters: characters,
			Gender:     c.QueryParam("gender"),
			Status:     c.QueryParam("status"),
			Species:    c.QueryParam("species"),
		}

		return c.Render(200, "homepage.html", content)
	})

	e.GET("/character/:id", func(c echo.Context) error {
		characterId := c.Param("id")

		res, err := http.Get(fmt.Sprintf("https://rickandmortyapi.com/api/character/%s", characterId))
		if err != nil {
			return err
		}
		var character types.Character

		data, err := io.ReadAll(res.Body)
		if err != nil {
			return err
		}

		defer res.Body.Close()

		if err := json.Unmarshal(data, &character); err != nil {
			return err
		}

		return c.Render(200, "info.html", character)
	})

	e.Static("public", "public")
	e.Start(":3000")
}
