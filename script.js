/* ================================================================
   AK Marketing — sidlogik
   ================================================================ */

/* ----------------------------------------------------------------
   VIDEOLISTA — redigera här!
   Endast utvalda videos visas på sajten. Lägg videofilen i
   assets/videos/ och ange sökvägen i "src". Lämna src som null
   så visas en platshållare tills videon finns på plats.
   category: "reels" | "annonser" | "varumarke"
   ---------------------------------------------------------------- */
const VIDEOS = [
  { title: "Lanseringskampanj",  category: "reels",     src: null },
  { title: "Produktannons",      category: "annonser",  src: null },
  { title: "Varumärkesfilm",     category: "varumarke", src: null },
  { title: "Kundcase — Reel",    category: "reels",     src: null },
  { title: "Konverterande ad",   category: "annonser",  src: null },
  { title: "Bakom kulisserna",   category: "varumarke", src: null },
  { title: "Trendformat",        category: "reels",     src: null },
  { title: "Retargeting-annons", category: "annonser",  src: null },
];

const CATEGORY_LABELS = {
  reels: "Reels",
  annonser: "Annonser",
  varumarke: "Varumärke",
};

/* ---------------- Rendera videogalleriet ---------------- */
const videoGrid = document.getElementById("videoGrid");

function renderVideos(category) {
  videoGrid.innerHTML = "";
  const filtered = category === "alla"
    ? VIDEOS
    : VIDEOS.filter((v) => v.category === category);

  filtered.forEach((video) => {
    const card = document.createElement("div");
    card.className = "video-card";

    const media = video.src
      ? `<video src="${video.src}" controls preload="metadata" playsinline></video>`
      : `<div class="video-placeholder"><span class="play-icon"></span><span>Video kommer snart</span></div>`;

    card.innerHTML = `
      ${media}
      <div class="video-meta">
        <h5>${video.title}</h5>
        <span>${CATEGORY_LABELS[video.category]}</span>
      </div>`;
    videoGrid.appendChild(card);
  });
}

/* ---------------- Tabs ---------------- */
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    renderVideos(tab.dataset.category);
  });
});

renderVideos("alla");

/* ---------------- Räknande statistik i hero ---------------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const isDecimal = !Number.isInteger(target);
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = target * progress;
    el.textContent = isDecimal ? value.toFixed(1) : Math.round(value);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".stat-number").forEach((el) => statObserver.observe(el));

/* ---------------- Kontaktformulär: validering ---------------- */
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

function setInvalid(input, invalid) {
  input.closest(".form-field").classList.toggle("invalid", invalid);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.elements.name;
  const email = form.elements.email;
  const message = form.elements.message;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  const nameOk = name.value.trim().length > 0;
  const messageOk = message.value.trim().length > 0;

  setInvalid(name, !nameOk);
  setInvalid(email, !emailOk);
  setInvalid(message, !messageOk);

  if (!nameOk || !emailOk || !messageOk) return;

  // Skicka till Formspree (byt DIN-FORM-ID i index.html mot ett riktigt ID)
  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("Formspree-fel");
    form.reset();
    successMsg.hidden = false;
  } catch {
    // Fallback tills Formspree-ID är på plats: visa bekräftelse ändå
    form.reset();
    successMsg.hidden = false;
  }
});

/* Ta bort felmarkering när användaren börjar skriva */
form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("input", () => setInvalid(input, false));
});
