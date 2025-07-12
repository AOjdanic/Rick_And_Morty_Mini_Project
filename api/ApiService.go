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
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	if res.StatusCode < 200 || res.StatusCode >= 300 {
		var apiErr struct {
			Error string `json:"error"`
		}

		if err := json.Unmarshal(body, &apiErr); err == nil && apiErr.Error != "" {
			return nil, err
		}

		return nil, err
	}

	var data T

	if err := json.Unmarshal(body, &data); err != nil {
		return nil, err
	}

	return &data, nil
}
