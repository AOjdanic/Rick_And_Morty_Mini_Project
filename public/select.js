function toggleSelect(displayEl) {
  const select = displayEl.closest(".custom-select");
  select.classList.toggle("open");
}

function selectOption(optionEl, value) {
  const select = optionEl.closest(".custom-select");
  const display = select.querySelector(".custom-select-display");
  const hiddenInput = select.querySelector('input[type="hidden"]');

  display.textContent = optionEl.textContent;
  hiddenInput.value = value;
  select.classList.remove("open");

  hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));
}

function setSelectDefaultOption(urlParam) {
  const params = new URL(window.location.href).searchParams;
  const wantedParam = params?.get(urlParam) ?? "";

  const selectOptions = document.querySelector(
    `#${urlParam}-custom-select > div.custom-options`,
  );

  const optionEl = Array.from(selectOptions.children).find((opt) =>
    opt.innerHTML.toLowerCase().includes(wantedParam),
  );

  selectOption(optionEl, wantedParam);
}

document.addEventListener("click", function (e) {
  document.querySelectorAll(".custom-select").forEach((select) => {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  setSelectDefaultOption("species");
  setSelectDefaultOption("status");
  setSelectDefaultOption("gender");
});
