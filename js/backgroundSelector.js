const backgrounds = [
  "../photos/backgrounds/1.jpg",
  "../photos/backgrounds/2.jpg",
  "../photos/backgrounds/3.jpg",
]

const randomIndex = Math.floor(Math.random() * backgrounds.length)
const chosenBackground = backgrounds[randomIndex]

const bgDiv = document.querySelector(".background-image")
bgDiv.style.backgroundImage = `url(${chosenBackground})`