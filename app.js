import express from "express";

import { renderMainPage } from "./views/page.js";
import { renderMainPageContent } from "./views/main.js";
import { renderCharactersPageContent } from "./views/characters/main.js";

function createQueryParamString(paramObj) {
  const parameterObject = paramObj.page ? paramObj : { ...paramObj, page: 1 };

  const paramKeys = Object.keys(parameterObject);

  if (!paramKeys.length) return "";

  return Object.keys(parameterObject)
    .filter((key) => Boolean(parameterObject[key]))
    .map((key) => `${key}=${parameterObject[key]}`)
    .join("&");
}

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const page = req.query?.page ?? 1;
  const nextPage = Number(page) + 1;

  const queryParamString = createQueryParamString(req.query);

  const response = await fetch(
    `https://rickandmortyapi.com/api/character${queryParamString ? `?${queryParamString}` : ""}`,
  );

  const data = await response.json();
  const results = data?.results ?? [];

  const mainContent = renderMainPageContent(req, results, nextPage);

  res.send(renderMainPage({ mainContent, req, hideSearch: false }));
});

app.get("/character/:id", async (req, res) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${req.params.id}`,
  );

  const data = await response.json();

  res.send(
    renderMainPage({
      mainContent: renderCharactersPageContent(data),
      req,
      hideSearch: true,
    }),
  );
});

app.listen(3000);
