const logo = document.querySelector(".moving-racing")
const min = 0 // 7
const max = 0 // 12
const duration = 7.3 // délka animace v sekundách
const delayBack = 0 // fixní zpoždění při návratu 2000

let direction = "right" // aktuální směr
let firstDelay = 0 // 4

const variants = ["../photos/siluety/final/onroad.png", "../photos/siluety/final/offroad.png"]
let currentVariant = variants[0]

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

  if (currentVariant === variants[0]) {
    currentVariant = variants[1]
  } else if (currentVariant === variants[1]) {
    currentVariant = variants[0]
  }

  //  TESTING
  //  currentVariant = variants[0]
}

function startAnimation(delay) {
  setTimeout(() => {
    if (direction === "right") {
      chooseVariant() // 🎯 při startu doprava vybereme variantu
      logo.src = currentVariant

      logo.classList.remove("mirrored") // auto kouká doprava
      logo.style.animation = `moveRight ${duration}s cubic-bezier(.39,-0.01,.83,.99) forwards`
      direction = "left"
    } else {
      logo.src = currentVariant
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
