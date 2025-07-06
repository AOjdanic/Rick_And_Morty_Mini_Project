package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"

	models "github.com/AOjdanic/Rick_And_Morty_Mini_Project/models"
	templ "github.com/AOjdanic/Rick_And_Morty_Mini_Project/templ"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		res, err := http.Get(fmt.Sprintf("https://rickandmortyapi.com/api/character?%s", r.URL.RawQuery))
		if err != nil {
			fmt.Println("error during fetch: ", err)
			return
		}

		body, err := io.ReadAll(res.Body)
		if err != nil {
			fmt.Println("Error reading body: ", err)
			return
		}

		defer res.Body.Close()

		var data models.RNMResponse

		if err := json.Unmarshal(body, &data); err != nil {
			fmt.Println("Error unmarshalling: ", err)
			return
		}

		var currentPage int

		pageUrlParam := r.URL.Query().Get("page")
		if pageUrlParam != "" {
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

		mainContentComponent := templ.MainTemplate(r.URL.Query().Get("species"), r.URL.Query().Get("status"), r.URL.Query().Get("gender"), data.Results, nextPage)
		if err := templ.Page(false, mainContentComponent).Render(context.Background(), w); err != nil {
			fmt.Println("Render error:", err)
		}
	})

	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))
	http.ListenAndServe(":3000", nil)
}
