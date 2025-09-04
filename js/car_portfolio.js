const blocks = document.querySelectorAll(".car-block")

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show")
        entry.target.classList.remove("hide-left", "hide-right")
      } else {
        entry.target.classList.remove("show")
        if (entry.target.classList.contains("from-left")) {
          entry.target.classList.add("hide-left")
        }
        if (entry.target.classList.contains("from-right")) {
          entry.target.classList.add("hide-right")
        }
      }
    })
  },
  { threshold: 0.65 } // 0.72
)

blocks.forEach((block) => observer.observe(block))
