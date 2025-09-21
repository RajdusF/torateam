const slider = document.querySelector(".slider")
const navDots = document.querySelectorAll(".slider-nav span")
const slides = slider.querySelectorAll("img")
const slideTitleH2 = document.querySelector(".lc-racing-name h2")
const arrowLeft = document.querySelector(".slider-arrow.left")
const arrowRight = document.querySelector(".slider-arrow.right")

let currentIndex = 0
let autoPlayInterval
let isUserSliding = false // flag, jestli uživatel právě přetahuje

const slideTitles = [
  "1/12 4WD Buggy",
  "1/14 4WD Short Course Truck",
  "1/14 4WD Truggy",
  "1/14 4WD Rally",
  "1/14 4WD Monster Truck",
  "1/14 4WD Desert Truck",
]

function goToSlide(index) {
  // cyklický efekt
  if (index < 0) index = slides.length - 1
  if (index >= slides.length) index = 0
  currentIndex = index // důležité! aby autoplay věděl aktuální slide

  const slideWidth = slider.clientWidth
  slider.scrollTo({
    left: slideWidth * index,
    behavior: "smooth",
  })

  // aktivní tečka
  navDots.forEach((d) => d.classList.remove("active"))
  if (navDots[index]) navDots[index].classList.add("active")

  // změna názvu
  // if (slideTitles[index]) slideTitleH2.textContent = slideTitles[index]
}

// autoplay se spustí jen pokud uživatel není zrovna sliding
function startAutoplay() {
  autoPlayInterval = setInterval(() => {
    if (!isUserSliding) {
      currentIndex = (currentIndex + 1) % slides.length
      goToSlide(currentIndex)
    }
  }, 5000)
}

// reset autoplay po kliknutí
function resetAutoplay() {
  clearInterval(autoPlayInterval)
  startAutoplay()
}

// funkce pro aktualizaci podle scrollu (swipe)
function updateCurrentIndex() {
  const slideWidth = slider.clientWidth
  const index = Math.round(slider.scrollLeft / slideWidth)
  currentIndex = index

  navDots.forEach((d) => d.classList.remove("active"))
  if (navDots[index]) navDots[index].classList.add("active")

  if (slideTitles[index]) slideTitleH2.textContent = slideTitles[index]
}

// začít sledovat swipe
slider.addEventListener("touchstart", () => {
  isUserSliding = true
  clearInterval(autoPlayInterval)
})
slider.addEventListener("touchend", () => {
  isUserSliding = false
  // autoplay se spustí až po 3 sekundách klidu
  clearTimeout(autoplayTimeout)
  autoplayTimeout = setTimeout(() => startAutoplay(), 3000)
})

// klikání na tečky
navDots.forEach((dot) => {
  dot.addEventListener("mouseenter", () => {
    currentIndex = parseInt(dot.getAttribute("data-slide"))
    goToSlide(currentIndex)
    resetAutoplay()
  })
})

// Šipky
arrowLeft.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length
  goToSlide(currentIndex)
  resetAutoplay()
})
arrowRight.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length
  goToSlide(currentIndex)
  resetAutoplay()
})

// poslouchat scroll
slider.addEventListener("scroll", () => {
  updateCurrentIndex()
})

// první nastavení
goToSlide(currentIndex)
startAutoplay()
