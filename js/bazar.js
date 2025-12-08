const products = [
  {
    id: 1,
    name: "MJX RC Car 1/14",
    image: "../photos/bazar/mjx.jpg",
    description: "Fast 1:10 scale RC car with brushless motor.",
    specs: "Max speed: 60 km/h, Battery: 2S LiPo, Range: 200 m",
  },
  {
    id: 2,
    name: "LC RACING Short Course",
    image: "../photos/bazar/af_short_course.jpg",
    description: "Off-road RC buggy built for rough terrain.",
    specs: "Max speed: 45 km/h, Battery: 3S LiPo, Suspension: Oil shocks",
  },
  {
    id: 3,
    name: "Schumacher Mini Beast",
    image: "../photos/bazar/schumacher.jpeg",
    description: "Compact beginner-friendly RC truck.",
    specs: "Max speed: 30 km/h, Battery: NiMH, Durable body",
  },
]

const grid = document.getElementById("productGrid")
const popup = document.getElementById("popup")
const popupImage = document.getElementById("popupImage")
const popupTitle = document.getElementById("popupTitle")
const popupDescription = document.getElementById("popupDescription")
const popupSpecs = document.getElementById("popupSpecs")
const closePopup = document.getElementById("closePopup")

products.forEach((product) => {
  const card = document.createElement("div")
  card.className = "card"
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="card-content">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <button class="btn">Více informací</button>
    </div>
  `
  card.querySelector(".btn").addEventListener("click", () => {
    popupImage.src = product.image
    popupTitle.textContent = product.name
    popupDescription.textContent = product.description
    popupSpecs.textContent = product.specs
    popup.style.display = "flex"
  })
  grid.appendChild(card)
})

closePopup.addEventListener("click", () => {
  popup.style.display = "none"
})
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none"
})
