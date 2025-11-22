const blocks = document.querySelectorAll(".car-block")
const bottomTextAthletics = document.querySelector(".bottom-text-athletics")

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show")
        entry.target.classList.remove("hide-left", "hide-right")

        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.05 }
)

blocks.forEach((block) => observer.observe(block))

if (bottomTextAthletics) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          // Pokud chceme animovat jen jednou:
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.01, // spustí když je 20% elementu ve viewportu
    }
  )
  observer.observe(bottomTextAthletics)
}
