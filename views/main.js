export function renderMainPageContent(req, results) {
  return `<main>
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
        </main>`;
}
