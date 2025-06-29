import express from "express";

import { renderMainPage } from "./views/page.js";
import { renderMainPageContent } from "./views/main.js";
import { renderCharactersPageContent } from "./views/characters/main.js";

function createQueryParamString(paramObj) {
  return Object.keys(paramObj)
    .filter((key) => Boolean(paramObj[key]))
    .map((key) => `${key}=${paramObj[key]}`)
    .join("&");
}

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/:page", async (req, res) => {
  const pageNumber = Number.parseInt(req.params?.page);
  const page = Number.isNaN(pageNumber) ? 1 : pageNumber;

  const queryParamString = createQueryParamString(req.query);

  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&${queryParamString}`,
  );

  const data = await response.json();
  const results = data?.results ?? [];

  res.send(
    renderMainPage({ mainContent: renderMainPageContent(req, results), req }),
  );
});

app.get("/character/:id", async (req, res) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${req.params.id}`,
  );

  const data = await response.json();

  res.send(
    renderMainPage({ mainContent: renderCharactersPageContent(data), req }),
  );
});

app.listen(3000);
