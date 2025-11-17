function initLanguage() {
  const selectedLang = document.getElementById("selected-lang")
  const langMenu = document.querySelector(".lang-menu ul")
  const langOptions = document.querySelectorAll(".lang-menu ul li a")
  let lang = localStorage.getItem("lang") || "cs"
  console.log("Selected language:", lang)
  let texts = {}

  flags = {
    cs: "https://flagsapi.com/CZ/flat/64.png",
    pl: "https://flagsapi.com/PL/flat/64.png",
    en: "https://flagsapi.com/GB/flat/64.png",
  }

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
    if (lang === undefined) {
      lang = "cs"
    }
    selectedLangSpan.textContent = getLanguageName(lang)
    selectedLang.style.setProperty("--flag-url", `url(${flags[lang]})`)
    console.log("lang:", lang)
    console.log("Flags updated for screen size:", flags[lang])

    // Skryj aktuálně vybraný jazyk z dropdownu
    langOptions.forEach((option) => {
      option.style.display = option.className === lang ? "none" : "block"
    })
  }

  // Funkce pro kliknutí
  function clickLang(option) {
    const oldLang = lang
    const oldText = selectedLang.querySelector(".flag-text").textContent

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

  // Toggle menu on click bcs Iphone suck's
  selectedLang.addEventListener("click", (e) => {
    e.preventDefault()
    langMenu.classList.toggle("open")
  })

  // zavřít při kliknutí na položku menu
  langMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      langMenu.classList.remove("open")
    })
  })

  // zavřít při kliknutí mimo menu
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".lang-menu")) {
      langMenu.classList.remove("open")
    }
  })
}

// document.addEventListener("DOMContentLoaded", () => {
//   if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
//     const selected = document.getElementById("selected-lang");
//     const text = selected.querySelector(".flag-text").textContent;
    
//     const link = document.createElement("a");
//     link.href = "#";  // nebo kam má odkazovat
//     link.textContent = text;
//     link.className = "flag-link";

//     // Odstranit starý obsah a vložit odkaz
//     selected.innerHTML = "";
//     selected.appendChild(link);
//   }
// });