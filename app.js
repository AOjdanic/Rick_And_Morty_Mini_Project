import express from "express";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/:page", async (req, res) => {
  const pageNumber = Number.parseInt(req.params?.page);
  const page = Number.isNaN(pageNumber) ? 1 : pageNumber;

  const name = req.query?.name ? `&name=${req.query.name}` : "";
  const species = req.query?.species ? `&species=${req.query.species}` : "";
  const status = req.query?.status ? `&status=${req.query.status}` : "";
  const gender = req.query?.gender ? `&gender=${req.query.gender}` : "";

  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}${name}${species}${status}${gender}`,
  );

  const data = await response.json();

  const results = data?.results ?? [];

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <script defer src="/htmx.js"></script>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="Wikipedia about characters from Rick & Morty universe. Find out everything you want to know about your favorite Rick & Morty character!"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
<link rel="stylesheet" href="/global.css" content="text/css"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rick & Morty Wiki | Get to know your favorite character</title>
      </head>
      <body hx-boost="true">

        <header>
          <div class="container">
            <a href="/1">
              <div class="logo-image-container">
                <img src="/rick_and_morty_logo.png" alt="rick-and-morty-logo image"/>
              </div>
            </a>

            <div class="search-input-wrapper">
              <div class="search-input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
              </div>

              <input
                type="text"
                name="name"
                class="search-input"
                value="${req.query?.name ?? ""}"
                placeholder="Search for a character"
                hx-post="/filters"
                hx-trigger="keyup changed delay:500ms"
                hx-target="div.grid"
                hx-select="div.grid"
                hx-swap="outerHTML"
                hx-push-url="true"
              />
            </div>
          </div>
        </header>

        <main>

    <form 
      method="POST"
      action="/filters"
      hx-target="div.grid"
      hx-select="div.grid"
      hx-swap="outerHTML"
    >
      <label>
        <span>Species</span>

        <select  name="species" id="species" hx-post="/filters">
          <option ${!req.query?.species ? "selected" : ""} value="">Select a species</option>
          <option ${req.query?.species === "human" ? "selected" : ""} value="human">Human</option>
          <option ${req.query?.species === "alien" ? "selected" : ""} value="alien">Alien</option>
          <option ${req.query?.species === "humanoid" ? "selected" : ""} value="humanoid">Humanoid</option>
          <option ${req.query?.species === "unknown" ? "selected" : ""} value="unknown">unknown</option>
          <option ${req.query?.species === "poopybutthole" ? "selected" : ""} value="poopybutthole">Poopybutthole</option>
          <option ${req.query?.species === "mythological" ? "selected" : ""} value="mythological">Mythological Creature</option>
          <option ${req.query?.species === "animal" ? "selected" : ""} value="animal">Animal</option>
          <option ${req.query?.species === "robot" ? "selected" : ""} value="robot">Robot</option>
          <option ${req.query?.species === "cronenberg" ? "selected" : ""} value="cronenberg">Cronenberg</option>
          <option ${req.query?.species === "disease" ? "selected" : ""} value="disease">Disease</option>
        </select>
      </label>

      <label>
        <span>Status</span>

        <select hx-post="/filters" name="status" id="status">
          <option ${!req.query?.status ? "selected" : ""} value="">Select a status</option>
          <option ${req.query?.status === "alive" ? "selected" : ""} value="alive">alive</option>
          <option ${req.query?.status === "dead" ? "selected" : ""} value="dead">dead</option>
          <option ${req.query?.status === "unknown" ? "selected" : ""} value="unknown">unknown</option>
        </select>
      </label>

      <label>
        <span>Gender</span>
        <select name="gender" id="gender" hx-post="/filters">
          <option ${!req.query.gender ? "selected" : ""} value="">Select a gender</option>
          <option ${req.query?.gender === "female" ? "selected" : ""} value="female">female</option>
          <option ${req.query?.gender === "male" ? "selected" : ""} value="male">male</option>
          <option ${req.query?.gender === "genderless" ? "selected" : ""} value="genderless">genderless</option>
          <option ${req.query?.gender === "unknown" ? "selected" : ""} value="unknown">unknown</option>
        </select>
      </label>

    </form>
          <div class="container">
            <div class="grid">
              ${results
                .map(
                  (result) =>
                    `<a href="/character/${result.id}">
                      <div class="card">
                        <div>
                          <img
                            class="card-img"
                            src="${result.image}"
                            alt="image of ${result.name}"
                          />
                        </div>
                        <div>
                          <h2 class="name">${result.name}</h2>
                          <span class="location">
                            ${result.location.name}
                          </p>
                        </div>
                      </div>
                    </a>`,
                )
                .join("")}
            </div>
          </div>
        </main>

        <footer>
          <div class="container">
            <div class="logo-image-container">
              <img src="/rick_and_morty_logo.png" alt="rick-and-morty-logo image"/>
            </div>
            <span class="footer-text">
              Rick And Morty ${new Date().getFullYear()}
            </span>
          </div>
        </footer>
      </body>
    </html>`);
});

app.get("/character/:id", async (req, res) => {
  const charactedId = req.params.id;

  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${charactedId}`,
  );

  const {
    name,
    status,
    gender,
    image,
    location: { name: charLocation },
    origin: { name: origin },
    species,
    type,
    episode,
  } = await response.json();

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <script defer src="/htmx.js"></script>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="Wikipedia about characters from Rick & Morty universe. Find out everything you want to know about your favorite Rick & Morty character!"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
<link rel="stylesheet" href="/global.css" content="text/css"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rick & Morty Wiki | Get to know your favorite character</title>
      </head>
      <body>

        <header>
          <div class="container">
            <a href="/1">
              <div class="logo-image-container">
                <img src="/rick_and_morty_logo.png" alt="rick-and-morty-logo image"/>
              </div>
            </a>

            <div class="search-input-wrapper">
              <div class="search-input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
              </div>

              <input
                type="text"
                name="name"
                class="search-input"
                value="${req.query?.name ?? ""}"
                placeholder="Search for a character"
                hx-post="/filters"
                hx-trigger="keyup changed delay:500ms"
                hx-target="div.grid"
                hx-select="div.grid"
                hx-swap="outerHTML"
                hx-push-url="true"
              />
            </div>
          </div>
        </header>

      <main>
        <div class="container">
          <div class="details">
            <h2>${name}</h2>
            <div class="grid-div">
              <div class="details-image">
                <img src="${image}" alt="image of ${name}" />
              </div>
              <p>Status: <span>${status}</span></p>
              <p>Gender: <span>${gender}</span></p>
              <p>Location: <span>${charLocation}</span></p>
              <p>Origin: <span>${origin}</span></p>
              <p>Species: <span>${species}</span></p>
              ${type !== "" ? `<p> Type:<span>${type}</span></p>` : ""}
              <p> Appears in: <span> ${episode.length} ${episode.length === 1 ? "episode" : "episodes"}</span></p>
            </div>
          </div>
        </div>
      </main>

        <footer>
          <div class="container">
            <div class="logo-image-container">
              <img src="/rick_and_morty_logo.png" alt="rick-and-morty-logo image"/>
            </div>
            <span class="footer-text">
              Rick And Morty ${new Date().getFullYear()}
            </span>
          </div>
        </footer>
      </body>
    </html>`);
});

app.post("/filters", async (req, res) => {
  console.log("req.query", req.query);
  console.log("req.body", req.body);
  const searchParamsString = Object.keys(req.body)
    .filter((key) => Boolean(req.body[key]))
    .map((key) => `${key}=${req.body[key]}`)
    .join("&");

  const searchString = searchParamsString ? `?${searchParamsString}` : "";

  res.redirect(`/1${searchString}`);
});

app.listen(3000);
