// DOM elementy
const selectedLang = document.getElementById("selected-lang");
const langOptions = document.querySelectorAll(".lang-menu ul li a");

// Defaultní jazyk
let lang = localStorage.getItem("lang") || "cs";
let texts = {};

// Mapa vlajek
const flags = {
  cs: "https://flagsapi.com/CZ/flat/32.png",
  pl: "https://flagsapi.com/PL/flat/32.png",
  en: "https://flagsapi.com/GB/flat/32.png"
};

// Načtení JSON souboru s překlady
fetch("../language.json")
  .then(res => res.json())
  .then(data => {
    texts = data;
    renderText();
    updateSelectedLang();
  })
  .catch(err => console.error("Chyba při načítání JSON:", err));

// Funkce pro vykreslení textů podle jazyka
function renderText() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = texts[lang][key] || key;
  });
}

// Funkce pro aktualizaci textu a vlajky v hlavičce
function updateSelectedLang() {
  const option = document.querySelector(`.lang-menu ul li.${lang}`);
  if (option) {
    selectedLang.textContent = option.textContent;
    // změna vlajky v ::before
    selectedLang.style.setProperty(
      "background-image",
      `url(${flags[lang]})`
    );
  }
}

// Klik na jazyk v menu
langOptions.forEach(option => {
  option.addEventListener("click", e => {
    e.preventDefault();
    lang = option.className;       // cs / pl / en
    localStorage.setItem("lang", lang);
    updateSelectedLang();          // změní text i vlajku
    renderText();                  // přepíše texty podle JSON
    // console.log("Jazyk změněn na:", lang);
  });
});
