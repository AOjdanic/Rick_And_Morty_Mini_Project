package models

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
