package api

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
)

func FetchData[T any](endpoint string, c echo.Context) (*T, error) {
	res, err := http.Get(endpoint)
	if err != nil {
		return nil, err
	}

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()

	var data T

	if err := json.Unmarshal(body, &data); err != nil {
		return nil, err
	}

	return &data, nil
}
