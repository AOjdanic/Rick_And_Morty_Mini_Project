package main

import (
	"fmt"

	"github.com/AOjdanic/Rick_And_Morty_Mini_Project/api"
	"github.com/AOjdanic/Rick_And_Morty_Mini_Project/template"
	"github.com/AOjdanic/Rick_And_Morty_Mini_Project/types"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.Renderer = template.NewTemplate()

	e.GET("/", func(c echo.Context) error {
		endpointUrl := fmt.Sprintf("https://rickandmortyapi.com/api/character?%s", c.Request().URL.RawQuery)
		data, err := api.FetchData[types.RNMResponse](endpointUrl, c)
		if err != nil {
			return c.Render(404, "error.html", nil)
		}

		return c.Render(200, "homepage.html", template.GenerateTemplateContent(*data, c))
	})

	e.GET("/character/:id", func(c echo.Context) error {
		endpointUrl := fmt.Sprintf("https://rickandmortyapi.com/api/character/%s", c.Param("id"))
		character, err := api.FetchData[types.Character](endpointUrl, c)
		if err != nil {
			return c.Render(404, "error.html", nil)
		}

		return c.Render(200, "info.html", character)
	})

	e.Static("public", "public")
	e.Start(":3000")
}
