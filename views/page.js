export function renderMainPage({ mainContent, req }) {
  return `<!DOCTYPE html>
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
                hx-get="/1"
                hx-trigger="keyup changed delay:500ms"
                hx-target="div.grid"
                hx-select="div.grid"
                hx-swap="outerHTML"
                hx-push-url="true"
                hx-include="form, this"
              />
            </div>
          </div>
        </header>

        ${mainContent}

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
    </html>`;
}
