// náhodně vyber který skript se má spustit
const scripts = ["carAnimation.js", "carAnimation_racing.js"]
const randomScript = scripts[Math.floor(Math.random() * scripts.length)]

const s = document.createElement("script")
s.src = randomScript
document.body.appendChild(s)
