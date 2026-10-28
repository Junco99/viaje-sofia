(() => {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    for (const c of children.flat()) if (c != null) node.append(c);
    return node;
  }

  // localStorage puede no existir (modo privado): todo va envuelto
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem("sofia:" + key); return v == null ? fallback : JSON.parse(v); }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("sofia:" + key, JSON.stringify(value)); } catch { /* sin almacenamiento */ }
    }
  };

  const TIPOS = {
    ver: "Ver", comer: "Comer", beber: "Beber", local: "Plan local", transporte: "Transporte", dormir: "Dormir"
  };

  // Cuenta atrás
  function renderCountdown() {
    const inicio = new Date(TRIP.inicio);
    const fin = new Date("2026-11-09T12:00:00+02:00");
    const ahora = new Date();
    const out = $("#countdown");
    if (ahora < inicio) {
      const dias = Math.ceil((inicio - ahora) / 86400000);
      out.innerHTML = dias === 1 ? "Volamos <strong>mañana</strong>" : `Faltan <strong>${dias} días</strong>`;
    } else if (ahora < fin) {
      out.innerHTML = "<strong>Ya estáis en Sofía.</strong> Nazdrave.";
    } else {
      out.textContent = "Viaje hecho. A por el siguiente.";
    }
  }

  // Mapa
  let mapa, capa, marcadores = [];
  const oscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function iniciarMapa() {
    if (typeof L === "undefined") {
      $("#mapa").replaceChildren(el("p", { class: "mapa-nota", style: "padding:16px", text: "No se ha podido cargar el mapa. Usad los botones de Google Maps de cada parada." }));
      return;
    }
    mapa = L.map("mapa", { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);
    capa = L.layerGroup().addTo(mapa);
  }

  function icono(texto, tipo, extra = "") {
    return L.divIcon({
      className: "",
      html: `<div class="marcador ${extra}" style="--c: var(--t-${tipo})">${texto}</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14]
    });
  }

  function popup(titulo, sub, query) {
    const url = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
    return `<strong>${titulo}</strong>${sub ? sub + "<br>" : ""}<a href="${url}" target="_blank" rel="noopener">Abrir en Google Maps</a>`;
  }

  function pintarMapa(dia) {
    if (!mapa) return;
    capa.clearLayers();
    marcadores = [];
    const puntos = [];

    dia.paradas.forEach((p, i) => {
      if (!p.ll) { marcadores.push(null); return; }
      const m = L.marker(p.ll, { icon: icono(i + 1, p.tipo), title: p.titulo })
        .bindPopup(popup(p.titulo, p.hora, p.q))
        .on("click", () => activar(i, false));
      m.addTo(capa);
      marcadores.push(m);
      puntos.push(p.ll);
    });

    if (puntos.length > 1) {
      L.polyline(puntos, { color: oscuro ? "#D9B65A" : "#B3261E", weight: 2.5, dashArray: "2 8", lineCap: "round" }).addTo(capa);
    }

    if (dia.planB) {
      dia.planB.items.filter((b) => b.ll).forEach((b) => {
        L.marker(b.ll, { icon: icono("B", "ver", "marcador-b"), title: b.titulo })
          .bindPopup(popup(b.titulo, "Plan B", b.q))
          .addTo(capa);
      });
    }

    mapa.invalidateSize();
    if (puntos.length) mapa.fitBounds(puntos, { padding: [36, 36], maxZoom: 15, animate: false });
  }

  // Línea de tiempo
  let diaActual;

  function activar(i, moverMapa = true) {
    document.querySelectorAll(".parada").forEach((n, j) => n.classList.toggle("activa", j === i));
    document.querySelectorAll(".marcador").forEach((n) => n.classList.remove("activo"));
    const m = marcadores[i];
    if (m) {
      const nodo = m.getElement() && m.getElement().querySelector(".marcador");
      if (nodo) nodo.classList.add("activo");
      if (moverMapa) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        mapa.closePopup();
        mapa.once("moveend", () => m.openPopup());
        mapa.flyTo(m.getLatLng(), Math.max(mapa.getZoom(), 15), { duration: reduce ? 0 : 0.6 });
        if (window.innerWidth < 900) $("#mapa").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      }
    }
    if (!moverMapa && window.innerWidth >= 900) {
      const item = document.querySelectorAll(".parada")[i];
      if (item) item.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function renderDia(id) {
    const dia = TRIP.dias.find((d) => d.id === id) || TRIP.dias[1];
    diaActual = dia;
    store.set("dia", dia.id);

    document.querySelectorAll(".tab").forEach((t) => {
      const sel = t.dataset.id === dia.id;
      t.setAttribute("aria-selected", sel);
      t.tabIndex = sel ? 0 : -1;
    });

    $("#dia-titulo").textContent = dia.titulo;
    $("#dia-intro").textContent = dia.intro;
    $("#dia-rutas").replaceChildren(...dia.rutas.map((r) =>
      el("a", { class: "boton", href: r.url, target: "_blank", rel: "noopener" }, r.texto + " en Google Maps")
    ));

    const tiposUsados = [...new Set(dia.paradas.map((p) => p.tipo === "dormir" ? "transporte" : p.tipo))];
    const leyenda = el("li", { class: "leyenda", "aria-hidden": "true" },
      tiposUsados.map((t) => el("span", { style: `--c: var(--t-${t})`, text: TIPOS[t] })));

    $("#timeline").replaceChildren(leyenda, ...dia.paradas.map((p, i) => {
      const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.q);
      return el("li", { class: "parada", "data-tipo": p.tipo },
        el("span", { class: "parada-num", "aria-hidden": "true", text: i + 1 }),
        el("button", { class: "parada-boton", type: "button", onclick: () => activar(i) },
          el("span", { class: "parada-hora", text: p.hora + "  " + TIPOS[p.tipo] }),
          el("span", { class: "parada-titulo", text: p.titulo }),
          el("p", { class: "parada-desc", text: p.desc })
        ),
        el("div", { class: "parada-meta" },
          el("a", { class: "enlace-maps", href: mapsUrl, target: "_blank", rel: "noopener", text: "Google Maps" }),
          p.precio ? el("span", { class: "precio", text: p.precio }) : null,
          p.reserva ? el("a", { class: "etiqueta-reserva", href: "#reservas", text: "Hay que reservar" }) : null
        )
      );
    }));

    const planb = $("#planb");
    if (dia.planB) {
      planb.replaceChildren(el("div", { class: "planb" },
        el("h3", { text: dia.planB.titulo }),
        el("ul", {}, dia.planB.items.map((b) => el("li", {},
          el("strong", { text: b.titulo }),
          el("span", { text: b.desc + " " }),
          el("a", { href: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(b.q), target: "_blank", rel: "noopener", text: "Google Maps" })
        )))
      ));
    } else {
      planb.replaceChildren();
    }

    pintarMapa(dia);
  }

  function renderTabs() {
    const tabs = $("#tabs");
    TRIP.dias.forEach((d, i) => {
      const b = el("button", {
        class: "tab", role: "tab", type: "button", "data-id": d.id, "aria-controls": "timeline",
        onclick: () => renderDia(d.id),
        onkeydown: (e) => {
          const dirs = { ArrowRight: 1, ArrowLeft: -1 };
          if (!dirs[e.key]) return;
          const n = TRIP.dias[(i + dirs[e.key] + TRIP.dias.length) % TRIP.dias.length];
          renderDia(n.id);
          tabs.querySelector(`[data-id="${n.id}"]`).focus();
        }
      },
        el("span", { class: "tab-dia", text: d.corto }),
        el("span", { class: "tab-fecha", text: d.fecha })
      );
      tabs.append(b);
    });
  }

  function diaInicial() {
    const hoy = new Date();
    const mapaFechas = { "2026-11-07": "sab", "2026-11-08": "dom", "2026-11-09": "lun" };
    const clave = hoy.toLocaleDateString("sv-SE", { timeZone: "Europe/Sofia" });
    return mapaFechas[clave] || store.get("dia", "sab");
  }

  // Checklists guardados en el móvil
  function checklist(lista, claveStore, progresoSel, totalTexto, render) {
    const hechos = new Set(store.get(claveStore, []));
    const actualizar = () => {
      $(progresoSel).textContent = `${hechos.size} de ${lista.length} ${totalTexto}`;
    };
    const toggle = (id, on, li) => {
      on ? hechos.add(id) : hechos.delete(id);
      li.classList.toggle("hecho", on);
      store.set(claveStore, [...hechos]);
      actualizar();
    };
    actualizar();
    return lista.map((item) => render(item, hechos.has(item.id), toggle));
  }

  function renderReservas() {
    const items = checklist(TRIP.reservas, "reservas", "#reservas-progreso", "hechas", (r, hecho, toggle) => {
      const id = "res-" + r.id;
      const li = el("li", { class: "check" + (hecho ? " hecho" : "") });
      const input = el("input", { type: "checkbox", id, onchange: (e) => toggle(r.id, e.target.checked, li) });
      input.checked = hecho;
      li.append(input, el("div", {},
        el("label", { for: id }, r.titulo, el("span", { class: "cuando", text: r.cuando })),
        el("p", { text: r.desc }),
        (r.url || r.url2) ? el("div", { class: "links" },
          r.url ? el("a", { href: r.url, target: "_blank", rel: "noopener", text: r.link }) : null,
          r.url2 ? el("a", { href: r.url2, target: "_blank", rel: "noopener", text: r.link2 }) : null
        ) : null
      ));
      return li;
    });
    $("#lista-reservas").replaceChildren(...items);
  }

  function renderComidas() {
    const items = checklist(TRIP.comidas, "comidas", "#comer-progreso", "probadas", (c, hecho, toggle) => {
      const li = el("li", { class: "comida" + (hecho ? " hecho" : "") });
      const input = el("input", { type: "checkbox", onchange: (e) => toggle(c.id, e.target.checked, li) });
      input.checked = hecho;
      li.append(el("label", {}, input, el("span", {},
        el("span", { class: "bg", lang: "bg", text: c.bg }),
        el("strong", { text: c.nombre }),
        el("small", { text: c.desc })
      )));
      return li;
    });
    $("#lista-comer").replaceChildren(...items);
  }

  function renderPrecios() {
    $("#tablas-precios").replaceChildren(...TRIP.precios.map((t) =>
      el("div", { class: "tabla-envoltorio" },
        el("table", {},
          el("caption", { text: t.titulo }),
          el("thead", {}, el("tr", {}, t.cols.map((c) => el("th", { scope: "col", text: c })))),
          el("tbody", {}, t.filas.map((f, i) =>
            el("tr", { class: t.destacada === i ? "destacada" : null }, f.map((c) => el("td", { text: c })))
          ))
        )
      )
    ));
  }

  // Frases con voz en búlgaro, solo si el móvil la tiene
  let vozBg = null;
  function buscarVoz() {
    if (!("speechSynthesis" in window)) return;
    vozBg = speechSynthesis.getVoices().find((v) => v.lang && v.lang.toLowerCase().startsWith("bg")) || null;
    document.body.classList.toggle("sin-voz", !vozBg);
  }

  function hablar(texto) {
    if (!vozBg) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto.replace(" / ", ", "));
    u.voice = vozBg;
    u.lang = vozBg.lang;
    u.rate = 0.85;
    speechSynthesis.speak(u);
  }

  function renderFrases() {
    $("#lista-frases").replaceChildren(...TRIP.frases.map((f) =>
      el("li", { class: "frase" },
        el("button", { type: "button", onclick: () => hablar(f.bg), "aria-label": `${f.es}: ${f.bg}, se pronuncia ${f.pr}` },
          el("span", { class: "es", text: f.es }),
          el("span", { class: "bgt", lang: "bg", text: f.bg }),
          el("span", { class: "pr", text: f.pr }),
          f.nota ? el("span", { class: "nota", text: f.nota }) : null,
          el("span", { class: "altavoz", "aria-hidden": "true", text: "▶" })
        )
      )
    ));
    $("#cirilico").replaceChildren(...TRIP.cirilico.map(([letra, sonido]) =>
      el("div", {}, el("dt", { lang: "bg", text: letra }), el("dd", { text: sonido }))
    ));
    document.body.classList.add("sin-voz");
    buscarVoz();
    if ("speechSynthesis" in window) speechSynthesis.addEventListener("voiceschanged", buscarVoz);
  }

  function renderConsejos(lista, sel) {
    $(sel).replaceChildren(...lista.map((c) => el("li", {}, el("strong", { text: c.t }), el("p", { text: c.d }))));
  }

  function renderInfo() {
    $("#lista-info").replaceChildren(...TRIP.info.map((i) => el("div", {}, el("dt", { text: i.t }), el("dd", { text: i.d }))));
    $("#lista-enlaces").replaceChildren(...TRIP.enlaces.map((e) =>
      el("li", {}, el("a", { href: e.url, target: "_blank", rel: "noopener", text: e.t }), el("span", { text: e.d }))
    ));
  }

  renderCountdown();
  iniciarMapa();
  renderTabs();
  renderDia(diaInicial());
  renderReservas();
  renderPrecios();
  renderComidas();
  renderFrases();
  renderConsejos(TRIP.noOfender, "#lista-respeto");
  renderConsejos(TRIP.comoLocal, "#lista-local");
  renderInfo();
})();
