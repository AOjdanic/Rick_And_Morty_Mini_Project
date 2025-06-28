import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/", (_, res) => {
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rick & Morty Wiki | Get to know your favorite character</title>
      </head>
      <body>
        <div>Express Rick and Morty App</div>
        <button hx-swap="outerHTML" hx-get="/info">Click here</button>
      </body>
    </html>`);
});

app.get("/info", (_, res) => {
  res.send(`
      <ul>
        <li> HTMX Trial</li>
        <li> Another one</li>
      </ul>
`);
});

app.listen(3000);
