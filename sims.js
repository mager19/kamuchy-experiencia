// Interactive simulations shown inside a fake kamuchy.co browser frame.
const money = n => "$ " + n.toLocaleString("es-CO");

function kHeader(active) {
  const items = ["Hoteles", "Cama", "Almohadas", "Baño"];
  return `
    <div class="k-hdr">
      <img src="${LOGO}" alt="Kamuchy">
      <nav>${items.map(x => `<span${x === active ? ' style="border-bottom:1px solid"' : ""}>${x}</span>`).join("")}</nav>
      <div class="icons"><span>Buscar</span><span>Mi Kamuchy</span><span>Carrito</span></div>
    </div>`;
}

function toast(msg) {
  const t = document.querySelector("#sim-screen .toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2200);
}

function openSim(kind) {
  const screen = document.getElementById("sim-screen");
  const url = document.getElementById("sim-url");
  const sim = SIMS[kind];
  url.textContent = sim.url;
  screen.innerHTML = sim.render() + '<div class="toast"></div>';
  if (sim.init) sim.init();
  screen.scrollTop = 0;
  document.getElementById("sim").classList.add("open");
}

function closeSim() {
  document.getElementById("sim").classList.remove("open");
  document.getElementById("sim-screen").innerHTML = "";
}

/* ---------------- Arma tu cama ---------------- */
const cfg = { step: 0, size: null, picks: {} };

function cfgRender() {
  const [key, label] = STEPS[cfg.step];
  const main = document.getElementById("cfg-main");
  const steps = STEPS.map(([k, l], i) => {
    const done = k === "tamano" ? cfg.size : cfg.picks[k] !== undefined;
    return `<button class="${i === cfg.step ? "on" : done ? "done" : ""}" onclick="cfgGo(${i})">${l}${done && i !== cfg.step ? " ✓" : ""}</button>`;
  }).join("");

  let body;
  if (key === "tamano") {
    body = `
      <p class="muted">Empieza por tu cama: todo lo demás se ajusta a su talla.</p>
      <div class="sizes">${["Sencilla", "Semidoble", "Doble", "Queen", "King"].map(s =>
        `<button class="${cfg.size === s ? "on" : ""}" onclick="cfgSize('${s}')">${s}</button>`).join("")}</div>
      <p class="muted" style="margin-top:22px">¿Prefieres partir de una cama sugerida por nuestras estilistas?</p>
      <div class="presets">${Object.keys(PRESETS).map(p => `<button onclick="cfgPreset('${p}')">${p}</button>`).join("")}</div>`;
  } else {
    const items = CATALOG[key];
    body = `
      <div class="opts">
        ${items.map((p, i) => `
          <button class="opt${cfg.picks[key] === i ? " on" : ""}" onclick="cfgPick('${key}', ${i})">
            <img src="${p.img}" alt="">
            <div>${p.name}<small>${p.note} · ${money(p.price)}</small></div>
          </button>`).join("")}
        <button class="opt skip${cfg.picks[key] === null ? " on" : ""}" onclick="cfgPick('${key}', null)">Ya la tengo</button>
      </div>`;
  }

  main.innerHTML = `
    <span class="k-sub">Arma tu cama</span>
    <h3 class="k-h" style="margin-top:6px">${key === "tamano" ? "Vistamos tu cama, capa por capa" : label.replace(/^\d · /, "")}</h3>
    <div class="steps">${steps}</div>
    ${body}
    <div style="display:flex;justify-content:space-between;margin-top:26px">
      <button class="btn ghost" ${cfg.step === 0 ? "disabled style='opacity:.3'" : ""} onclick="cfgGo(${cfg.step - 1})">← Anterior</button>
      ${cfg.step < STEPS.length - 1 ? `<button class="btn" onclick="cfgGo(${cfg.step + 1})">Siguiente →</button>` : ""}
    </div>`;
  cfgSide();
}

function cfgSide() {
  const lines = [];
  let total = 0;
  if (cfg.size) lines.push(`<div class="line"><span>Cama ${cfg.size}<small>Todas las piezas en esta talla</small></span></div>`);
  STEPS.slice(1).forEach(([k]) => {
    const i = cfg.picks[k];
    if (i === undefined || i === null) return;
    const p = CATALOG[k][i];
    total += p.price;
    lines.push(`<div class="line"><img src="${p.img}" alt=""><span>${p.name}<small>${p.note}</small></span><em>${money(p.price)}</em></div>`);
  });
  const juego = Math.round(total * 0.92 / 100) * 100;
  document.getElementById("cfg-side").innerHTML = `
    <h4>Tu cama</h4>
    <div class="lines">${lines.length ? lines.join("") : '<p class="empty">Aún no has elegido piezas.</p>'}</div>
    <div class="total"><span>Precio de juego<small>Incluye funda de regalo</small></span><span>${money(juego)}</span></div>
    <button class="btn" onclick="toast('Tu cama quedó en el carrito')">Agregar todo al carrito</button>
    <button class="btn ghost" onclick="toast('Guardada en Mi Kamuchy')">Guardar mi cama</button>
    <button class="btn ghost" onclick="openSim('asesoria')">Revisa tu cama con una asesora</button>`;
}

function cfgGo(i) { if (i < 0 || i >= STEPS.length) return; cfg.step = i; cfgRender(); }
function cfgSize(s) { cfg.size = s; cfgRender(); setTimeout(() => cfgGo(1), 250); }
function cfgPick(k, i) { cfg.picks[k] = i; cfgRender(); setTimeout(() => cfgGo(Math.min(cfg.step + 1, STEPS.length - 1)), 300); }
function cfgPreset(name) {
  cfg.size = cfg.size || "Queen";
  cfg.picks = { ...PRESETS[name] };
  cfg.step = STEPS.length - 1;
  cfgRender();
  toast(`Partiste de la “${name}”: ajústala a tu gusto`);
}

/* ---------------- simulations ---------------- */
const SIMS = {
  encuentra: {
    url: "kamuchy.co/encuentra-tu-producto",
    render: () => `
      <iframe src="https://mager19.github.io/encuentra-tu-producto/" title="Encuentra tu producto" style="width:100%;height:100%;border:0;display:block"></iframe>`
  },

  arma: {
    url: "kamuchy.co/arma-tu-cama",
    render: () => `${kHeader("Cama")}<div class="cfg"><div class="cfg-main" id="cfg-main"></div><aside class="cfg-side" id="cfg-side"></aside></div>`,
    init: () => { cfg.step = 0; cfg.size = null; cfg.picks = {}; cfgRender(); }
  },

  mikamuchy: {
    url: "kamuchy.co/mi-kamuchy",
    render: () => `
      ${kHeader("")}
      <div class="k-wrap" style="display:grid;grid-template-columns:230px 1fr;gap:30px;background:var(--marfil);min-height:calc(100% - 60px)">
        <div>
          <span class="k-sub">Hola, Carolina</span>
          <h3 class="k-h" style="font-size:26px;margin:6px 0 18px">Mi Kamuchy</h3>
          <div class="mini-nav" id="mk-nav">
            ${["Mis camas", "Inventario de mi hogar", "Favoritos", "Mis pedidos", "Lista de regalos"].map((t, i) =>
              `<button class="${i === 0 ? "on" : ""}" onclick="mkTab(${i})">${t}</button>`).join("")}
          </div>
          <div class="box" style="margin-top:22px;background:var(--verde);color:var(--marfil);border:0">
            <span class="k-sub" style="color:var(--salvia)">Acceso anticipado</span>
            <p style="margin-top:6px;font-size:15px">La colección Etérea llega a la tienda el 15 de noviembre. Tú puedes verla desde hoy.</p>
          </div>
        </div>
        <div id="mk-body"></div>
      </div>`,
    init: () => mkTab(0)
  },

  recoger: {
    url: "kamuchy.co/producto/almohada-naxos",
    render: () => `
      ${kHeader("Almohadas")}
      <div class="k-wrap grid2" style="align-items:start">
        <div style="position:relative">
          <span class="tag-new" style="top:14px;left:14px">Nuevo</span>
          <img src="${IMG}2024/12/Almohada_Naxos_2-2.jpg" alt="" style="border-radius:14px;width:100%;height:440px;object-fit:cover">
        </div>
        <div>
          <span class="k-sub">Almohadas · Firmeza media</span>
          <h3 class="k-h" style="margin:6px 0 4px">Almohada Naxos</h3>
          <p style="font-size:20px;color:var(--verde)">$ 129.900</p>
          <div class="box" style="margin-top:18px">
            <h5>Disponible en tu tienda</h5>
            <div class="store"><span>Centro de experiencia · Bogotá</span><span class="ok">● Disponible hoy</span></div>
            <div class="store"><span>Centro de experiencia · Medellín</span><span class="ok">● Disponible hoy</span></div>
            <div class="store"><span>Centro de experiencia · Funza</span><span class="no">● Bajo pedido · 10 días</span></div>
          </div>
          <div class="box" style="margin-top:14px" id="pick">
            <h5>Recoge en Bogotá</h5>
            <p class="muted">¿A qué hora pasas? Una asesora te estará esperando.</p>
            <div class="chips" id="pick-hours">${["Hoy 4–6 p. m.", "Mañana 10–12 m.", "Mañana 3–5 p. m.", "Sábado 11–1 p. m."].map((h, i) =>
              `<button class="${i === 0 ? "on" : ""}" onclick="chipPick(this)">${h}</button>`).join("")}</div>
            <label style="display:flex;gap:10px;margin-top:12px;font-size:15px"><input type="checkbox" checked> Quiero que me expliquen el cuidado del producto</label>
            <label style="display:flex;gap:10px;margin-top:6px;font-size:15px"><input type="checkbox"> Prefiero probarla antes de pagar (reserva para probar)</label>
            <button class="btn" style="margin-top:16px;width:100%;justify-content:center" onclick="toast('Listo: te esperamos hoy entre 4 y 6 p. m. en Bogotá')">Recoger en tienda</button>
            <p class="muted" style="margin-top:10px;text-align:center">Sin registro: te avisamos por correo y WhatsApp cuando esté lista.</p>
          </div>
        </div>
      </div>`
  },

  asesoria: {
    url: "kamuchy.co/asesoria",
    render: () => `
      ${kHeader("")}
      <div class="k-wrap grid2" style="align-items:center;min-height:calc(100% - 60px)">
        <div>
          <img src="${IMG}2025/07/experiencia-personalizada.jpg" alt="" style="border-radius:14px;width:100%;height:470px;object-fit:cover">
        </div>
        <div id="ase">
          <span class="k-sub">Asesoría personalizada</span>
          <h3 class="k-h" style="margin:6px 0 10px">Te mostramos nuestras telas, sin salir de casa</h3>
          <p class="muted">Una asesora te acompaña por llamada o videollamada desde nuestro centro de experiencia.</p>
          <p style="margin-top:18px" class="k-sub">¿Cómo prefieres hablar?</p>
          <div class="chips">${["Videollamada", "Llamada", "Video por WhatsApp"].map((t, i) => `<button class="${i === 0 ? "on" : ""}" onclick="chipPick(this)">${t}</button>`).join("")}</div>
          <p style="margin-top:14px" class="k-sub">¿Sobre qué quieres asesoría?</p>
          <div class="chips">${["Elegir almohada", "Cama completa", "A la medida", "Un regalo"].map((t, i) => `<button class="${i === 1 ? "on" : ""}" onclick="chipPick(this)">${t}</button>`).join("")}</div>
          <p style="margin-top:14px" class="k-sub">¿Cuándo?</p>
          <div class="chips">${["Hoy 5:00 p. m.", "Mañana 9:30 a. m.", "Mañana 2:00 p. m.", "Sábado 10:00 a. m."].map((t, i) => `<button class="${i === 0 ? "on" : ""}" onclick="chipPick(this)">${t}</button>`).join("")}</div>
          <div class="grid2" style="gap:10px;margin-top:6px">
            <input class="field" placeholder="Tu nombre" value="Carolina">
            <input class="field" placeholder="Celular" value="300 000 0000">
          </div>
          <button class="btn" style="margin-top:16px" onclick="aseDone()">Agendar mi asesoría</button>
        </div>
      </div>`
  },

  paginas: {
    url: "kamuchy.co/producto/juego-de-sabana-300-hilos-perla",
    render: () => `
      <div class="k-top">Amor y Amistad · Descubre nuestra guía de regalos para quienes más quieres</div>
      ${kHeader("Cama")}
      <div style="display:flex;gap:10px;padding:10px 36px;border-bottom:1px solid var(--arena)" class="chips">
        <button class="on" onclick="pgView('ficha', this)">Nueva ficha</button>
        <button onclick="pgView('menu', this)">Mega-menú</button>
        <button onclick="pgView('pop', this)">Bienvenida</button>
      </div>
      <div id="pg"></div>`,
    init: () => pgView("ficha")
  },

  disenador: {
    url: "kamuchy.co/disena-tu-habitacion",
    render: () => `
      ${kHeader("")}
      <div class="k-wrap" style="display:grid;grid-template-columns:1.5fr 1fr;gap:34px;align-items:center">
        <div style="background:linear-gradient(#efe9e2 62%, #d9cfc4 62%);border-radius:16px;padding:30px;position:relative">
          ${roomSvg()}
          <p class="muted" style="text-align:center;margin-top:8px">Concepto ilustrativo · la versión final sería fotorrealista o en 3D</p>
        </div>
        <div>
          <span class="k-sub">Diseña tu habitación</span>
          <h3 class="k-h" style="margin:6px 0 12px">Combina antes de comprar</h3>
          ${swatchGroup("Sábanas", "sheet", [["Perla", "#E8E1D6"], ["Chocolate", "#5B4033"], ["Gris", "#A7A9A6"], ["Blanco", "#FAFAF7"]])}
          ${swatchGroup("Duvet", "duvet", [["Pampa Marfil", "#EFE8DA"], ["Pampa Taupe", "#B8A898"], ["Pampa Mostaza", "#C9A04A"], ["Etérea Avena", "#D9CBB3"]])}
          ${swatchGroup("Almohadas", "pillow", [["Naxos", "#F7F5F0"], ["Ibiza", "#ECE6DC"]])}
          ${swatchGroup("Cojines", "cushion", [["Verona Marfil", "#E9E2D4"], ["Páramo Verde Oliva", "#6F7550"], ["Compostela Palo de Rosa", "#C9A39A"]])}
          <p class="muted" style="margin-top:16px">Referente para la demo: <a href="https://www.bollandbranch.com/pages/virtual-bed-designer/" target="_blank" rel="noopener">Boll &amp; Branch · Virtual Bed Designer</a></p>
          <button class="btn" style="margin-top:14px" onclick="toast('Combinación guardada en Mi Kamuchy')">Guardar combinación</button>
        </div>
      </div>`
  }
};

function chipPick(el) {
  el.parentElement.querySelectorAll("button").forEach(b => b.classList.remove("on"));
  el.classList.add("on");
}

function aseDone() {
  document.getElementById("ase").innerHTML = `
    <span class="k-sub">Asesoría agendada</span>
    <h3 class="k-h" style="margin:6px 0 12px">Hoy a las 5:00 p. m., por videollamada</h3>
    <p>Laura, asesora de nuestro centro de experiencia, te contactará para ayudarte a armar tu cama completa. Si ya armaste una en <i>Arma tu cama</i>, la revisará contigo.</p>
    <div class="box" style="margin-top:18px"><h5>Antes de la llamada</h5><p class="muted">Ten a mano las medidas de tu colchón (ancho, largo y alto). Te enviamos un recordatorio 30 minutos antes.</p></div>
    <p class="muted" style="margin-top:14px">Nombre de la asesora y horarios de ejemplo.</p>`;
}

function mkTab(i) {
  document.querySelectorAll("#mk-nav button").forEach((b, j) => b.classList.toggle("on", i === j));
  const life = (name, img, used, total, unit, warn) => `
    <div class="box" style="display:flex;gap:16px;align-items:center">
      <img src="${IMG}${img}" alt="" style="width:76px;height:76px;object-fit:cover;border-radius:10px">
      <div style="flex:1"><h5 style="margin:0">${name}</h5>
        <div class="bar-life"><i class="${warn ? "warn" : ""}" style="width:${Math.min(100, used / total * 100)}%"></i></div>
        <span class="muted">${used} de ${total} ${unit} de vida útil${warn ? " · <b style='color:#7a5a53'>Es buen momento para renovarla</b>" : ""}</span>
      </div>
      ${warn ? `<button class="btn ghost" onclick="toast('Te mostramos opciones similares')">Renovar</button>` : ""}
    </div>`;
  const views = [
    `<span class="k-sub">Mis camas</span>
     <div class="grid2" style="margin-top:12px">
       <div class="box"><h5>Cama principal</h5><p>Queen · colchón de 30 cm · Bogotá</p><p class="muted" style="margin-top:6px">Te mostramos todo en talla Queen.</p><button class="btn ghost" style="margin-top:12px" onclick="openSim('arma')">Vestir esta cama</button></div>
       <div class="box"><h5>Cuarto de huéspedes</h5><p>Doble · colchón de 25 cm · Bogotá</p><p class="muted" style="margin-top:6px">Última compra: protector Terry.</p><button class="btn ghost" style="margin-top:12px" onclick="openSim('arma')">Vestir esta cama</button></div>
       <div class="box" style="display:grid;place-items:center;border-style:dashed"><span class="k-sub">+ Agregar una cama</span></div>
     </div>`,
    `<span class="k-sub">Inventario de mi hogar</span>
     <div style="display:grid;gap:12px;margin-top:12px">
       ${life("Almohada Naxos ×2", "2024/12/Almohada_Naxos_2-2.jpg", 11, 12, "meses", true)}
       ${life("Plumón ComfortLife 3D", "2025/07/Plumon_ComfortLife3D_2.jpg", 2, 5, "años", false)}
       ${life("Sábanas 300 hilos Perla", "2025/06/Juego-de-sabanas_Perla_1.jpg", 1, 3, "años", false)}
     </div>`,
    `<span class="k-sub">Favoritos</span>
     <div class="grid3" style="margin-top:12px">
       ${[["Duvet Etérea Lino Avena", "2026/04/Duvet_Eterea_Avena_1.jpg", "Disponible"], ["Almohada Sicilia", "2024/12/Almohada_Sicilia_2.jpg", "Agotada · te avisaremos cuando vuelva"], ["Cojín Páramo Verde Oliva", "2025/10/Cojines-Paramo_Cuadrado_Verde-Oliva_1.jpg", "Disponible"]].map(([n, img, s]) =>
         `<div class="box" style="padding:0;overflow:hidden"><img src="${IMG}${img}" style="height:150px;width:100%;object-fit:cover"><div style="padding:12px 14px"><h5 style="font-size:16px">${n}</h5><span class="muted">${s}</span></div></div>`).join("")}
     </div>
     <div class="box" style="margin-top:16px"><h5>Aviso de reposición</h5><p class="muted">“Volvió tu almohada Sicilia. Te la apartamos 48 horas en el centro de Bogotá.”</p></div>`,
    `<span class="k-sub">Mis pedidos</span>
     <div class="box" style="margin-top:12px"><h5>Pedido #10482 · Duvet Pampa Rombos</h5>
       <div class="bar-life"><i style="width:60%"></i></div>
       <span class="muted">En confección · listo para recoger en Bogotá el 4 de noviembre</span></div>
     <div class="box" style="margin-top:12px"><h5>Pedido #10311 · Almohada Naxos ×2</h5><span class="muted">Entregado · ¿Cómo te fue? <a href="#" onclick="toast('Gracias: tu reseña te regala un detalle en tu próxima compra');return false">Deja tu reseña</a></span></div>`,
    `<span class="k-sub">Lista de regalos · fase posterior</span>
     <div class="box" style="margin-top:12px"><h5>Ana y Julián · 14 de febrero</h5><p class="muted">Comparte tu lista; tus invitados compran sin registrarse y cada regalo se marca solo.</p>
       <div class="store"><span>Juego de sábanas Perla · Queen</span><span class="ok">Regalado por Marta</span></div>
       <div class="store"><span>Toallas de cuerpo · 2 de 4</span><span>Quedan 2</span></div>
       <div class="store"><span>Plumón Sensación Down</span><span>Aporte grupal · 60%</span></div>
     </div>`
  ];
  document.getElementById("mk-body").innerHTML = views[i];
}

function pgView(v, btn) {
  if (btn) chipPick(btn);
  const pg = document.getElementById("pg");
  const ficha = `
    <div class="k-wrap grid2" style="align-items:start">
      <div>
        <img src="${IMG}2025/06/Juego-de-sabanas_Perla_1.jpg" alt="" style="border-radius:14px;width:100%;height:380px;object-fit:cover">
        <div class="grid3" style="margin-top:10px;gap:10px">
          ${["2025/06/Juego-de-sabanas_gris_1.jpg", "2025/08/Juego-de-sabanas_chocolate_1.jpg", "2026/05/Juego-de-sabanas_blanco_1.jpg"].map(s => `<img src="${IMG}${s}" style="height:90px;width:100%;object-fit:cover;border-radius:10px">`).join("")}
        </div>
      </div>
      <div>
        <span class="k-sub">Fresca · Suave · Duradera</span>
        <h3 class="k-h" style="margin:6px 0 4px">Juego de sábanas 300 hilos Perla</h3>
        <p><span class="stars">★★★★★</span> <span class="muted">4,8 · 37 reseñas verificadas</span></p>
        <p style="font-size:20px;color:var(--verde);margin-top:6px">$ 289.900</p>
        <div class="tabs" id="pg-tabs">${["Detalle", "Guía de tallas", "Envío y devoluciones", "Disponible en tienda"].map((t, i) => `<button class="${i === 0 ? "on" : ""}" onclick="pgTab(${i})">${t}</button>`).join("")}</div>
        <div id="pg-tab" style="padding:14px 0;font-size:15px"></div>
        <div class="box" style="background:#e8f2f1;border-color:var(--salvia)">
          <h5>¿Es para ti?</h5>
          <p style="font-size:15px">Si duermes con calor, te recomendamos el <a href="#" onclick="return false">juego de Bambú Efecto Frío</a>. Si buscas una caída más sedosa, mira el <a href="#" onclick="return false">juego Tencel</a>.</p>
        </div>
      </div>
    </div>
    <div class="k-wrap" style="padding-top:0">
      <span class="k-sub">Lo que dicen nuestros clientes</span>
      <div class="grid3" style="margin-top:12px">
        ${[["Carolina M.", "Se sienten frescas y no se arrugan. Las combiné con el duvet Pampa.", "2025/06/Juego-de-sabanas_Perla_1.jpg"], ["Andrés R.", "Excelente calidad, el fuelle sirve para mi colchón de 35 cm.", null], ["Lucía P.", "Llegaron perfectas. La asesora me ayudó a elegir el color.", "2025/09/Duvet-Pampa-rombo_marfil_1.jpg"]].map(([n, t, img]) =>
          `<div class="box">${img ? `<img src="${IMG}${img}" style="height:120px;width:100%;object-fit:cover;border-radius:10px;margin-bottom:10px">` : ""}<span class="stars">★★★★★</span><p style="font-size:15px;margin-top:6px">“${t}”</p><p class="muted" style="margin-top:6px">${n} · Compra verificada</p></div>`).join("")}
      </div>
    </div>`;
  const menu = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr) 1.3fr;gap:28px;padding:30px 36px;border-bottom:1px solid var(--arena);background:var(--blanco)">
      ${[["Cama", ["Juegos de sábanas", "Duvets y covers", "Plumones", "Protectores", "Cojines"]], ["Almohadas", ["Encuentra tu almohada", "Firmes", "Suaves", "Aromáticas", "Protectores de almohada"]], ["Por sensación", ["Fresca y crujiente", "Suave y sedosa", "Cálida y envolvente", "Natural (lino)"]], ["Baño y hoteles", ["Toallas", "Batas", "Línea hotelera", "Centros de experiencia"]]].map(([h, l]) =>
        `<div><span class="k-sub">${h}</span>${l.map(x => `<p style="margin-top:8px;font-size:15px">${x}</p>`).join("")}</div>`).join("")}
      <div style="border-radius:14px;overflow:hidden;position:relative"><img src="${IMG}2025/07/Home_Slider_-21.jpg" style="height:220px;width:100%;object-fit:cover"><p style="margin-top:8px;font-family:var(--optima);color:var(--verde)">Arma tu cama, capa por capa →</p></div>
    </div>
    <div style="padding:30px 36px;opacity:.35"><h3 class="k-h">Contenido de la página…</h3></div>`;
  const pop = ficha + `
    <div class="popup" onclick="if(event.target===this) pgView('ficha', document.querySelector('#sim-screen .chips button'))">
      <div class="card-pop">
        <img src="${IMG}2025/07/experiencia-personalizada.jpg" alt="">
        <div>
          <span class="k-sub">Bienvenida a Kamuchy</span>
          <h3 class="k-h" style="font-size:26px;margin:8px 0 10px">Tu descanso, a tu medida</h3>
          <p style="font-size:15px">Recibe nuestra guía para elegir tu almohada ideal y un detalle de bienvenida en tu primera compra.</p>
          <input class="field" placeholder="Tu correo">
          <button class="btn" style="margin-top:12px;width:100%;justify-content:center" onclick="toast('Te enviamos la guía a tu correo')">Quiero recibirla</button>
          <p class="muted" style="margin-top:10px;font-size:12px">Aparece una sola vez, después de unos segundos de navegación.</p>
        </div>
      </div>
    </div>`;
  pg.innerHTML = { ficha, menu, pop }[v];
  pg.style.position = "relative";
  if (v !== "menu") pgTab(0);
}

function pgTab(i) {
  const box = document.getElementById("pg-tab");
  if (!box) return;
  document.querySelectorAll("#pg-tabs button").forEach((b, j) => b.classList.toggle("on", i === j));
  box.innerHTML = [
    "Algodón 100% de 300 hilos, tejido percal: fresco y de tacto firme. Incluye sábana ajustable, sábana plana y dos fundas. Fuelle de 36 a 38 cm.",
    "<b>Mide el alto de tu colchón.</b> Hasta 35 cm: talla estándar. De 35 a 40 cm: fuelle extra. Sencilla 100×190 · Doble 140×190 · Queen 160×200 · King 200×200.",
    "Envío a todo Colombia en 2 a 5 días hábiles. Recoge gratis en nuestros centros de experiencia. Cambios dentro de los 30 días.",
    "<span class='ok'>●</span> Bogotá: disponible hoy &nbsp; <span class='ok'>●</span> Medellín: disponible hoy &nbsp; <span class='no'>●</span> Funza: bajo pedido"
  ][i];
}

function swatchGroup(label, part, colors) {
  return `<p class="k-sub" style="margin-top:14px">${label}</p>
    <div class="swatches">${colors.map(([n, c], i) => `<button title="${n}" style="background:${c}" class="${i === 0 ? "on" : ""}" onclick="paint('${part}','${c}',this)"></button>`).join("")}</div>`;
}

function paint(part, color, btn) {
  chipPick(btn);
  document.querySelectorAll(`#room [data-part="${part}"]`).forEach(el => el.setAttribute("fill", color));
}

function roomSvg() {
  return `
  <svg id="room" viewBox="0 0 600 340" width="100%" role="img" aria-label="Habitación ilustrativa">
    <rect x="40" y="40" width="120" height="8" rx="2" fill="#a88f74"/>
    <rect x="58" y="18" width="22" height="22" rx="3" fill="#c9b8a4"/>
    <rect x="96" y="24" width="40" height="16" rx="3" fill="#ADD2D0"/>
    <rect x="150" y="70" width="300" height="80" rx="10" fill="#8a7059"/>
    <rect x="60" y="180" width="80" height="70" rx="6" fill="#9c8166"/>
    <rect x="460" y="180" width="80" height="70" rx="6" fill="#9c8166"/>
    <ellipse cx="100" cy="166" rx="18" ry="20" fill="#efe6d8"/>
    <rect x="94" y="150" width="12" height="30" fill="#efe6d8"/>
    <ellipse cx="500" cy="166" rx="18" ry="20" fill="#efe6d8"/>
    <rect x="494" y="150" width="12" height="30" fill="#efe6d8"/>
    <rect x="150" y="150" width="300" height="140" rx="12" data-part="sheet" fill="#E8E1D6"/>
    <rect x="150" y="205" width="300" height="100" rx="12" data-part="duvet" fill="#EFE8DA"/>
    <rect x="150" y="205" width="300" height="10" data-part="sheet" fill="#E8E1D6"/>
    <rect x="172" y="120" width="118" height="50" rx="18" data-part="pillow" fill="#F7F5F0" stroke="#e2dbd0"/>
    <rect x="310" y="120" width="118" height="50" rx="18" data-part="pillow" fill="#F7F5F0" stroke="#e2dbd0"/>
    <rect x="232" y="150" width="62" height="48" rx="12" data-part="cushion" fill="#E9E2D4"/>
    <rect x="306" y="150" width="62" height="48" rx="12" data-part="cushion" fill="#E9E2D4"/>
  </svg>`;
}
