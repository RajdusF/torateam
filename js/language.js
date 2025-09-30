const selectedLang = document.getElementById("selected-lang")
const langMenu = document.querySelector(".lang-menu ul")
const langOptions = document.querySelectorAll(".lang-menu ul li a")
let lang = localStorage.getItem("lang") || "cs"
console.log("Selected language:", lang)
let texts = {}

let flags = {}

// Změna vlajky pro mobilní zobrazení
function updateFlagForScreenSize() {
  if (window.matchMedia("(max-width: 1000px)").matches) {
    flags = {
      cs: "https://flagsapi.com/CZ/flat/64.png",
      pl: "https://flagsapi.com/PL/flat/64.png",
      en: "https://flagsapi.com/GB/flat/64.png",
    }
  } else {
    flags = {
      cs: "https://flagsapi.com/CZ/flat/32.png",
      pl: "https://flagsapi.com/PL/flat/32.png",
      en: "https://flagsapi.com/GB/flat/32.png",
    }
  }
  selectedLang.style.setProperty("--flag-url", `url(${flags})`)
}

// Sleduj změnu velikosti okna
window.addEventListener("resize", updateFlagForScreenSize)
window.addEventListener("DOMContentLoaded", updateFlagForScreenSize)

// const flags = {
//   cs: "https://flagsapi.com/CZ/flat/32.png",
//   pl: "https://flagsapi.com/PL/flat/32.png",
//   en: "https://flagsapi.com/GB/flat/32.png",
// }

// const flags_mobile = {
//   cs: "https://flagsapi.com/CZ/flat/42.png",
//   pl: "https://flagsapi.com/PL/flat/42.png",
//   en: "https://flagsapi.com/GB/flat/42.png",
// }

const languages = [
  { code: "cs", name: "Čeština" },
  { code: "pl", name: "Polski" },
  { code: "en", name: "English" },
]

// Načtení JSON
fetch("../language.json")
  .then((res) => res.json())
  .then((data) => {
    texts = data
    renderLogo()
    renderText()
    initSelectedLang()
  })

// Funkce pro vykreslení textů
function renderText() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n")
    if (texts[lang] && texts[lang][key]) {
      el.innerHTML = texts[lang][key] // umožní HTML tagy, např. <strong>
    }
  })
}

function renderLogo() {
  const logo = document.querySelector(".logo")
  if (texts[lang] && texts[lang].logo_src) {
    logo.src = texts[lang].logo_src
  }
}

getLanguageName = (code) => {
  if (code === "cs") return "Čeština"
  if (code === "pl") return "Polski"
  if (code === "en") return "English"
  return code
}

// Inicializace vybraného jazyka v hlavičce
function initSelectedLang() {
  const selectedLangSpan = selectedLang.querySelector(".flag-text")

  // Default nebo uložený jazyk
  lang = localStorage.getItem("lang") || "cs"
  selectedLangSpan.textContent = getLanguageName(lang)
  selectedLang.style.setProperty("--flag-url", `url(${flags[lang]})`)

  // Skryj aktuálně vybraný jazyk z dropdownu
  langOptions.forEach((option) => {
    option.style.display = option.className === lang ? "none" : "block"
  })
}

// Funkce pro kliknutí
function clickLang(option) {
  const oldLang = lang
  const oldText = selectedLang.querySelector(".flag-text").textContent

  console.log("Old language:", oldLang)
  console.log("Old text:", oldText)

  // nový jazyk
  lang = option.className
  localStorage.setItem("lang", lang)

  // aktualizace hlavičky
  selectedLang.querySelector(".flag-text").textContent = option.textContent
  selectedLang.style.setProperty("--flag-url", `url(${flags[lang]})`)

  // aktualizace menu – vložíme starý jazyk zpět
  option.textContent = oldText
  option.className = oldLang

  renderLogo()
  renderText()
}

// Přidání kliků
document.querySelectorAll(".lang-menu ul li a").forEach((option) => {
  option.addEventListener("click", (e) => {
    e.preventDefault()
    clickLang(option)
    console.log("Language changed to:", lang)
  })
})
