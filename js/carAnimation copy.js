const logo = document.querySelector(".moving-logo")
const projectile = document.querySelector(".moving-car")
const min = 0 // 7
const max = 0 // 12
const duration = 6.7 // délka animace v sekundách
const projectileDuration = 4.5 // 4.5
const delayBack = 0 // fixní zpoždění při návratu 2000

let direction = "right" // aktuální směr
let firstDelay = 0 // 4

const variants = [
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

let currentVariant = variants[1]

let lastVariants = []

function chooseVariant() {
  /*
  let newVariant
  do {
    newVariant = variants[Math.floor(Math.random() * variants.length)]
  } while (lastVariants.length >= 2 && lastVariants[0] === lastVariants[1] && lastVariants[1] === newVariant)

  // posuň historii
  lastVariants.push(newVariant)
  if (lastVariants.length > 2) lastVariants.shift()

  currentVariant = newVariant*/

  /*
  if (currentVariant === variants[0]) {
    currentVariant = variants[1]
  } else if (currentVariant === variants[1]) {
    currentVariant = variants[0]
  }
    */

  //  TESTING
  currentVariant = variants[1]
}

function startAnimation(delay) {
  setTimeout(() => {
    if (direction === "right") {
      chooseVariant() // 🎯 při startu doprava vybereme variantu
      logo.src = currentVariant.right
      projectile.src = currentVariant.projectile

      logo.classList.remove("mirrored") // auto kouká doprava
      logo.style.animation = `moveRight ${duration}s cubic-bezier(.39,-0.01,.83,.99) forwards`
      startProjectile()
      direction = "left"
    } else {
      logo.src = currentVariant.left
      logo.classList.add("mirrored") // otočení doleva
      logo.style.animation = `moveLeft ${duration}s cubic-bezier(.39,-0.01,.83,.99) forwards`
      direction = "right"
    }
  }, delay)
}

startAnimation(firstDelay)

// po dokončení animace spustit další s náhodným zpožděním
logo.addEventListener("animationend", () => {
  let nextDelay
  if (direction === "left") {
    // když jede zpět doleva, použij fixní delay
    nextDelay = delayBack
  } else {
    // při další jízdě doprava náhodně
    nextDelay = (Math.random() * (max - min) + min) * 1000
  }
  startAnimation(nextDelay)
})

const logoLink = document.getElementById("moving-logo-link")

logoLink.addEventListener("mousedown", () => {
  window.location.href = "easter.html"
})

function startProjectile() {
  setTimeout(() => {
    projectile.style.animation = "none"
    projectile.offsetHeight // reset
    if (currentVariant === variants[0]) {
      projectile.style.animation = `throw_javelin ${projectileDuration}s linear forwards`
    } else if (currentVariant === variants[1]) {
      projectile.style.animation = `throw_hammer ${projectileDuration}s linear forwards`
    }
  }, 1600) // <<< zpoždění v ms (1s)
}
