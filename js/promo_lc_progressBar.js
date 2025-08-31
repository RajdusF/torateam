document.querySelectorAll(".video-container").forEach((container) => {
  const video = container.querySelector("video")
  const progressBar = container.querySelector(".progress-bar")
  const progress = container.querySelector(".progress")

  // vytvoříme overlay
  const overlay = document.createElement("div")
  overlay.classList.add("video-overlay")
  overlay.innerHTML = "▶" // startovní ikona
  container.appendChild(overlay)

  // aktualizace progress baru
  video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100
    progress.style.width = percent + "%"
  })

  // kliknutí na progress bar posune video
  progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const percent = clickX / width
    video.currentTime = percent * video.duration
  })

  // kliknutí na video = play/pause toggle
  video.addEventListener("click", () => {
    if (video.paused) {
      video.play()
      overlay.innerHTML = "⏸"
      overlay.classList.remove("show")
    } else {
      video.pause()
      overlay.innerHTML = "▶"
      overlay.classList.add("show")
    }
  })

  // při spuštění schová overlay
  video.addEventListener("play", () => {
    overlay.classList.remove("show")
  })

  // při pauznutí zobrazí overlay
  video.addEventListener("pause", () => {
    overlay.classList.add("show")
  })

  // --- Intersection Observer pro lazy play ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play()
      } else {
        video.pause()
      }
    })
  }, {
    threshold: 0.75 // spustí, když je alespoň 50% videa viditelné
  })

  observer.observe(video)
})

// pauza všech videí na mobilu
if (/Mobi|Android/i.test(navigator.userAgent)) {
  const videos = document.querySelectorAll("video")
  videos.forEach((video) => video.pause())
}
