package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
)

type Origin struct {
	Name string
	Url  string
}

type Location struct {
	Name string
	Url  string
}

type Character struct {
	Id       int
	Name     string
	Status   string
	Species  string
	Type     string
	Gender   string
	Origin   Origin
	Location Location
	Image    string
	Episode  []string
	Url      string
	Created  string
}

type Info struct {
	Count int
	Pages int
	Next  string
	Prev  string
}

type RNMResponse struct {
	Results []Character
	Info    Info
}

func createQueryParamString(query url.Values) string {
	if len(query) == 0 {
		return "?page=1"
	}

	var queryStringArray []string

	for key, value := range query {
		if value[0] != "" {
			queryStringArray = append(queryStringArray, fmt.Sprintf("%s=%s", key, value[0]))
		}
	}

	if query["page"] == nil {
		queryStringArray = append(queryStringArray, "page=1")
	}

	var queryParamString string

	if len(queryStringArray) > 1 {
		fmt.Println(queryStringArray)
		queryParamString = strings.Join(queryStringArray, "&")
	} else {
		queryParamString = queryStringArray[0]
	}

	queryParamString = "?" + queryParamString

	return queryParamString
}

func main() {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		queryParamString := createQueryParamString(request.URL.Query())

		res, err := http.Get(fmt.Sprintf("https://rickandmortyapi.com/api/character%s", queryParamString))

		fmt.Println(fmt.Sprintf("https://rickandmortyapi.com/api/character%s", queryParamString))
		if err != nil {
			fmt.Println("error during fetch: ", err)
			return
		}

		body, err := io.ReadAll(res.Body)
		if err != nil {
			fmt.Println("Error reading body: ", err)
			return
		}

		fmt.Println(string(body))

		var data RNMResponse

		if err := json.Unmarshal(body, &data); err != nil {
			fmt.Println("Error unmarshalling: ", err)
			return
		}

		writer.Header().Set("Content-Type", "application/json")
		json.NewEncoder(writer).Encode(data)
	})

	http.ListenAndServe(":3000", nil)
}
