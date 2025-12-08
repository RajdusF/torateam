function initHamburger() {
  const mobileNav = document.querySelector(".mobile-nav")
  if (!mobileNav) {
    console.log("Mobile navigation not found")
    return
  }

  const hamburger = mobileNav.querySelector(".hamburger")
  if (!hamburger) {
    console.log("Hamburger button not found")
    return
  }
  console.log("Hamburger menu initialized")

  // otevření / zavření menu při kliknutí
  hamburger.addEventListener("click", (e) => {
    console.log("Hamburger clicked")
    e.stopPropagation() // zabrání okamžitému zavření
    mobileNav.classList.toggle("open")
  })

  // zavření menu při kliknutí na link
  const menuLinks = mobileNav.querySelectorAll(".mobile-menu a")
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open")
    })
  })

  // zavření menu při kliknutí mimo
  document.addEventListener("click", (e) => {
    if (!mobileNav.contains(e.target)) {
      mobileNav.classList.remove("open")
    }
  })
}