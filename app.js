// Home row, detail view and keyboard navigation.
let focusIdx = 0;
let current = null;

function renderRow() {
  const row = document.getElementById("row");
  const dots = document.getElementById("dots");
  row.innerHTML = INITIATIVES.map((it, i) => `
    <button class="card${i === 0 ? " active" : ""}" data-i="${i}" onclick="openDetail(${i})">
      <div class="ph">
        ${it.tags[0][0] === "Ya construida" || it.tags[0][0] === "Idea exploratoria" ? `<span class="pill badge">${it.tags[0][0]}</span>` : ""}
        <img src="${it.image}" alt="" loading="lazy">
      </div>
      <div class="meta">
        <span class="num">${String(i + 1).padStart(2, "0")}</span>
        <h3>${it.name}</h3>
        <p>${it.tagline}</p>
      </div>
    </button>`).join("");
  dots.innerHTML = INITIATIVES.map((_, i) => `<i class="${i === 0 ? "on" : ""}"></i>`).join("");
}

function moveFocus(step) {
  focusIdx = Math.max(0, Math.min(INITIATIVES.length - 1, focusIdx + step));
  document.querySelectorAll(".card").forEach((c, i) => c.classList.toggle("active", i === focusIdx));
  document.querySelectorAll("#dots i").forEach((d, i) => d.classList.toggle("on", i === focusIdx));
  document.querySelector(`.card[data-i="${focusIdx}"]`).scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}

function list(items) {
  return `<ul>${items.map(x => `<li>${x}</li>`).join("")}</ul>`;
}

function openDetail(i) {
  current = i;
  focusIdx = i;
  const it = INITIATIVES[i];
  const prev = INITIATIVES[i - 1];
  const next = INITIATIVES[i + 1];
  document.getElementById("d-img").src = it.image;
  const body = document.getElementById("d-body");
  body.innerHTML = `
    <span class="eyebrow">Iniciativa ${i + 1} de ${INITIATIVES.length}</span>
    <h2>${it.name}</h2>
    <p class="lead">${it.lead}</p>
    <div class="tags">${it.tags.map(([t, c]) => `<span class="${c}">${t}</span>`).join("")}</div>
    <div class="includes">${it.includes.map(x => `<div>${x}</div>`).join("")}</div>
    <div class="sim-cta">
      <p><b>Así se vería en kamuchy.co</b>Una simulación para imaginar la experiencia.</p>
      <button class="btn" onclick="openSim('${it.sim}')">${it.simLabel} →</button>
    </div>
    <div class="acc">
      <details><summary>Hoy en kamuchy.co</summary><div>${it.today}</div></details>
      <details><summary>Referentes</summary><div>${list(it.refs.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`))}</div></details>
      <details><summary>Qué necesita Kamuchy</summary><div>${list(it.needs)}</div></details>
      <details><summary>Cómo se conecta</summary><div>${connections(it.id)}</div></details>
    </div>
    <div class="pager">
      <button ${prev ? `onclick="openDetail(${i - 1})"` : "disabled"}>← ${prev ? prev.name : ""}</button>
      <button ${next ? `onclick="openDetail(${i + 1})"` : `onclick="closeDetail(); location.hash='siguientes'"`}>${next ? next.name : "Siguientes pasos"} →</button>
    </div>`;
  body.scrollTop = 0;
  document.getElementById("detail").classList.add("open");
  document.body.style.overflow = "hidden";
  history.replaceState(null, "", "#" + it.id);
}

function connections(id) {
  const map = {
    encuentra: "Su resultado alimenta Arma tu cama, se guarda en Mi Kamuchy y puede probarse en un centro de experiencia.",
    arma: "Usa el resultado del quiz, se guarda en Mi Kamuchy y se puede revisar con una asesora a distancia.",
    mikamuchy: "Guarda el quiz y las camas armadas; envía los avisos de pedido listo para recoger.",
    recoger: "Comparte el sistema de citas con la asesoría a distancia y los avisos de Mi Kamuchy.",
    asesoria: "Es el punto de llegada de la ficha, el quiz, Arma tu cama y el carrito pendiente.",
    paginas: "Las reseñas se piden con la herramienta de correo de Mi Kamuchy; la ficha muestra la disponibilidad en tienda.",
    disenador: "Si funciona, se convierte en la versión visual de Arma tu cama."
  };
  return map[id];
}

function closeDetail() {
  current = null;
  document.getElementById("detail").classList.remove("open");
  document.body.style.overflow = "";
  history.replaceState(null, "", location.pathname);
}

document.addEventListener("keydown", e => {
  if (document.getElementById("sim").classList.contains("open")) {
    if (e.key === "Escape") closeSim();
    return;
  }
  if (current !== null) {
    if (e.key === "Escape") closeDetail();
    if (e.key === "ArrowRight" && current < INITIATIVES.length - 1) openDetail(current + 1);
    if (e.key === "ArrowLeft" && current > 0) openDetail(current - 1);
    return;
  }
  if (e.key === "ArrowRight") { e.preventDefault(); moveFocus(1); }
  if (e.key === "ArrowLeft") { e.preventDefault(); moveFocus(-1); }
  if (e.key === "Enter" && !e.target.closest("a, button")) openDetail(focusIdx);
});

renderRow();
const startId = location.hash.slice(1);
const startIdx = INITIATIVES.findIndex(it => it.id === startId);
if (startIdx >= 0) openDetail(startIdx);
