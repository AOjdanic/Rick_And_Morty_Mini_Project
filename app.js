import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/:page", async (req, res) => {
  const pageNumber = Number.parseInt(req.params?.page);
  const page = Number.isNaN(pageNumber) ? 1 : pageNumber;
  const name = req.query?.name;

  console.log("request query params", req.query);

  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}${name ? `&name=${name}` : ""}`,
  );

  const { results, info } = await response.json();

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
            <div class="logo-image-container">
              <img src="/rick_and_morty_logo.png" alt="rick-and-morty-logo image"/>
            </div>

            <div class="search-input-wrapper">
              <input
                type="text"
                name="name"
                class="search-input"
                value="${name ?? ""}"
                placeholder="Search for a character"
                hx-get="/${pageNumber}"
                hx-trigger="keyup changed delay:500ms"
                hx-include="this"
                hx-push-url="true"
              />
              <div class="dropdown"></div>
            </div>
          </div>
        </header>

        <main>

    <form>
      <label>
        <span>Species</span>

        <select name="species" id="species">
          <option value="">Select a species</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="humanoid">Humanoid</option>
          <option value="unknown">unknown</option>
          <option value="poopybutthole">Poopybutthole</option>
          <option value="mythological">Mythological Creature</option>
          <option value="animal">Animal</option>
          <option value="robot">Robot</option>
          <option value="cronenberg">Cronenberg</option>
          <option value="disease">Disease</option>
        </select>
      </label>

      <label>
        <span>Status</span>

        <select name="status" id="status">
          <option value="">Select a status</option>
          <option value="alive">alive</option>
          <option value="dead">dead</option>
          <option value="unknown">unknown</option>
        </select>
      </label>

      <label>
        <span>Gender</span>
        <select name="gender" id="gender">
          <option value="">Select a gender</option>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="genderless">genderless</option>
          <option value="unknown">unknown</option>
        </select>
      </label>

      <button>Apply filters</button>
    </form>
          <div class="container">
            <div class="grid">
              ${results
                .map(
                  (result) =>
                    `<a href="/character/${result.id}">
                      <div class="card">
                        <!-- <p class="${result.status === "unknown" ? "status_pad" : "status"}">
                           ${result.status === "unknown" ? "Unknown" : result.status}
                         </p> -->
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
            <div class="logo-image-container">
              <img src="/rick_and_morty_logo.png" alt="rick-and-morty-logo image"/>
            </div>
            <input type="search"/>
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

app.listen(3000);
