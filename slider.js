const slider = document.querySelector(".slider")
const navDots = document.querySelectorAll(".slider-nav span")
const slides = slider.querySelectorAll("img")
const slideTitleH2 = document.querySelector(".lc-racing-name h2")

let currentIndex = 0
let autoPlayInterval

const slideTitles = [
  "1/12 4WD Buggy",
  "1/14 4WD Short Course Truck",
  "1/14 4WD Truggy",
  "1/14 4WD Rally",
  "1/14 4WD Monster Truck",
  "1/14 4WD Desert Truck",
]

// klikání na tečky
navDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentIndex = parseInt(dot.getAttribute("data-slide"))
    goToSlide(currentIndex)
    resetAutoplay()
  })
})

// funkce na přesun a nastavení aktivní tečky
function goToSlide(index) {
  const slideWidth = slider.clientWidth
  slider.scrollTo({
    left: slideWidth * index,
    behavior: "smooth",
  })

  navDots.forEach((d) => d.classList.remove("active"))
  if (navDots[index]) {
    navDots[index].classList.add("active")
  }

  // Změníme h2 podle aktuálního indexu
  if (slideTitles[index]) {
    slideTitleH2.textContent = slideTitles[index]
  }
}

// automatické přepínání
function startAutoplay() {
  autoPlayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length
    goToSlide(currentIndex)
  }, 5000) // každé 4 sekundy
}

// když uživatel klikne → resetovat autoplay, aby se to nehádalo
function resetAutoplay() {
  clearInterval(autoPlayInterval)
  startAutoplay()
}

// první nastavení
goToSlide(currentIndex)
startAutoplay()
