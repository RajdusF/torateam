const mode = document.body.dataset.mode // "car", "racing" nebo "both"
const projectile = document.querySelector(".moving-javelin")
const min = 0 // 7
const max = 0 // 12
const duration = 5 // délka animace v sekundách
const projectileDuration = 4.5 // 4.5
const racingDuration = 5 // délka animace v sekundách
const delayBack = 0 // fixní zpoždění při návratu 2000
const carLogo = document.querySelector(".moving-logo")

let direction = "right" // aktuální směr
let firstDelay = 0 // 4
let nextMode = Math.random() < 0.5 ? "athletic" : "racing"
let carDirection = "right"
let racingDirection = Math.random() < 0.5 ? "right" : "left"

const carVariants = [
  {
    right: "../photos/siluety/final/javelin_car.png",
    left: "../photos/siluety/final/javelin_car_equipment.png",
    projectile: "../photos/siluety/javelin.png",
  },
  {
    right: "../photos/siluety/final/hammer_car.png",
    left: "../photos/siluety/final/hammer_car_equipment.png",
    projectile: "../photos/siluety/white_hammer.png",
  },
]
let currentCarVariant = carVariants[1]

const racingVariants = ["../photos/siluety/final/onroad.png", "../photos/siluety/final/offroad.png"]
let currentRacingVariant = racingVariants[0]

if (mode === "athletic") {
  startCarAnimation()

  carLogo.addEventListener("animationend", (e) => {
    if (e.animationName === "moveLeft") {
      startCarAnimation() // spustíme další cyklus
    }
  })
} else if (mode === "racing") {
  startRacingAnimation()

  carLogo.addEventListener("animationend", (e) => {
    if (e.animationName === "raceLeft" || e.animationName === "raceRight") {
      startRacingAnimation() // spustíme další cyklus
    }
  })
} else if (mode === "both") {
  if (nextMode === "athletic") {
    startCarAnimation()
  } else {
    startRacingAnimation()
  }

  carLogo.addEventListener("animationend", (e) => {
    if (nextMode === "athletic" && e.animationName === "moveLeft") {
      nextMode = "racing" // nejdřív nastavíme, pak spustíme
      startRacingAnimation()
    } else if (nextMode === "racing" && (e.animationName === "raceLeft" || e.animationName === "raceRight")) {
      nextMode = "athletic"
      startCarAnimation()
    }
  })
}

// -------------------- CAR + JAVELIN --------------------

function startCarAnimation(delay = 0) {
  setTimeout(() => {
    currentCarVariant = currentCarVariant === carVariants[0] ? carVariants[1] : carVariants[0]
    projectile.src = currentCarVariant.projectile

    // reset pozice auta
    carLogo.style.animation = "none"
    carLogo.offsetHeight // force reflow

    // start right
    carLogo.src = currentCarVariant.right
    carLogo.classList.remove("mirrored")
    carLogo.style.animation = `moveRight ${duration}s cubic-bezier(.39,-0.01,.83,.99) forwards`
    startProjectile(0)

    // posluchač na dokončení moveRight → spustí moveLeft
    const rightHandler = (e) => {
      if (e.animationName === "moveRight") {
        carLogo.removeEventListener("animationend", rightHandler)

        // reset pozice na left
        carLogo.style.animation = "none"
        carLogo.offsetHeight

        // start left
        carLogo.src = currentCarVariant.left
        carLogo.classList.add("mirrored")
        carLogo.style.animation = `moveLeft ${duration}s cubic-bezier(.39,-0.01,.83,.99) forwards`
      }
    }
    carLogo.addEventListener("animationend", rightHandler)
  }, delay)
}

function startProjectile(delay = 0) {
  setTimeout(() => {
    projectile.style.animation = "none"
    projectile.offsetHeight // reset
    if (currentCarVariant === carVariants[0]) {
      projectile.style.animation = `throw_javelin ${projectileDuration}s linear forwards`
    } else {
      projectile.style.animation = `throw_hammer ${projectileDuration}s linear forwards`
    }
  }, delay)
}

// -------------------- RACING --------------------

function startRacingAnimation() {
  // přepnutí varianty
  currentRacingVariant = currentRacingVariant === racingVariants[0] ? racingVariants[1] : racingVariants[0]

  // reset pozice
  carLogo.style.animation = "none"
  carLogo.offsetHeight

  if (racingDirection === "right") {
    carLogo.src = currentRacingVariant
    carLogo.classList.remove("mirrored")
    carLogo.style.animation = `raceRight ${racingDuration}s cubic-bezier(.39,-0.01,.83,.99) forwards`
    racingDirection = "left"
  } else {
    carLogo.src = currentRacingVariant
    carLogo.classList.add("mirrored")
    carLogo.style.animation = `raceLeft ${racingDuration}s cubic-bezier(.39,-0.01,.83,.99) forwards`
    racingDirection = "right"
  }
}

const logoLink = document.getElementById("moving-logo-link")

logoLink.addEventListener("mousedown", () => {
  window.location.href = "easter.html"
})
