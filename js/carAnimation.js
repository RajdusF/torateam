function initCarAnimation() {
  const mode = document.body.dataset.mode // "car", "racing" nebo "both"
  const projectile = document.querySelector(".moving-javelin")
  const min = 4000 // 3000
  const max = 7000 // 6000
  const duration = 5.9 // délka animace v sekundách
  const projectileDuration = 5.3 // 4.5
  const racingDuration = 5.5 // délka animace v sekundách
  const delayBack = 1800 // fixní zpoždění při návratu 2000
  const carLogo = document.querySelector(".moving-logo")

  let firstDelay = 3800 // 3000
  let nextMode = Math.random() < 0.5 ? "athletic" : "racing"
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
    setTimeout(() => {
      startCarAnimation()
    }, firstDelay)

    carLogo.addEventListener("animationend", (e) => {
      if (e.animationName === "moveLeft") {
        setTimeout(() => {
          startCarAnimation()
        }, Math.random() * (max - min) + min)
      }
    })
  } else if (mode === "racing") {
    setTimeout(() => {
      startRacingAnimation()
    }, firstDelay)

    carLogo.addEventListener("animationend", (e) => {
      if (e.animationName === "raceLeft" || e.animationName === "raceRight") {
        setTimeout(() => {
          startRacingAnimation() // spustíme další cyklus
        }, Math.random() * (max - min) + min)
      }
    })
  } else if (mode === "both") {
    if (nextMode === "athletic") {
      setTimeout(() => {
        startCarAnimation()
      }, firstDelay)
    } else {
      setTimeout(() => {
        startRacingAnimation()
      }, firstDelay)
    }

    carLogo.addEventListener("animationend", (e) => {
      if (nextMode === "athletic" && e.animationName === "moveLeft") {
        nextMode = "racing" // nejdřív nastavíme, pak spustíme
        setTimeout(() => {
          startRacingAnimation()
        }, Math.random() * (max - min) + min)
      } else if (nextMode === "racing" && (e.animationName === "raceLeft" || e.animationName === "raceRight")) {
        nextMode = "athletic"
        setTimeout(() => {
          startCarAnimation()
        }, Math.random() * (max - min) + min)
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
      carLogo.style.animation = `moveRight ${duration}s linear forwards`
      startProjectile(0)

      // posluchač na dokončení moveRight → spustí moveLeft
      const rightHandler = (e) => {
        if (e.animationName === "moveRight") {
          carLogo.removeEventListener("animationend", rightHandler)

          setTimeout(() => {
            // reset pozice na left
            carLogo.style.animation = "none"
            carLogo.offsetHeight

            // start left
            carLogo.src = currentCarVariant.left
            carLogo.classList.add("mirrored")
            carLogo.style.animation = `moveLeft ${duration}s linear forwards`
          }, delayBack)
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
      carLogo.style.animation = `raceRight ${racingDuration}s linear forwards`
      racingDirection = "left"
    } else {
      carLogo.src = currentRacingVariant
      carLogo.classList.add("mirrored")
      carLogo.style.animation = `raceLeft ${racingDuration}s linear forwards`
      racingDirection = "right"
    }
  }

  const logoLink = document.getElementById("moving-logo-link")

  logoLink.addEventListener("mousedown", () => {
    window.location.href = "easter.html"
  })
}
