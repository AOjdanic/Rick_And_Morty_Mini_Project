export function renderCharactersPageContent(data) {
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
  } = data;

  return `<main>
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
      </main>`;
}
