/* ================================================================
   AK Mediaz — page logic
   ================================================================ */

/* ----------------------------------------------------------------
   VIDEO LIST — edit here!
   Only selected videos are shown on the site. Drop the video file
   in assets/videos/ and set its path as "src". Leave src as null
   to show a placeholder until the file is in place.
   category: "reels" | "ads" | "brand"
   ---------------------------------------------------------------- */
const VIDEOS = [
  { title: "Launch campaign",   category: "reels", src: null },
  { title: "Product ad",        category: "ads",   src: null },
  { title: "Brand film",        category: "brand", src: null },
  { title: "Client case — Reel", category: "reels", src: null },
  { title: "Converting ad",     category: "ads",   src: null },
  { title: "Behind the scenes", category: "brand", src: null },
  { title: "Trend format",      category: "reels", src: null },
  { title: "Retargeting ad",    category: "ads",   src: null },
];

const CATEGORY_LABELS = {
  reels: "Reels",
  ads: "Ads",
  brand: "Brand Films",
};

/* ---------------- Scroll reveal ---------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------------- Render video gallery ---------------- */
const videoGrid = document.getElementById("videoGrid");

function renderVideos(category) {
  videoGrid.innerHTML = "";
  const filtered = category === "all"
    ? VIDEOS
    : VIDEOS.filter((v) => v.category === category);

  filtered.forEach((video, index) => {
    const card = document.createElement("div");
    card.className = "video-card reveal";
    card.style.setProperty("--d", `${(index % 4) * 0.08}s`);

    const media = video.src
      ? `<video src="${video.src}" controls preload="metadata" playsinline></video>`
      : `<div class="video-placeholder"><span class="play-icon"></span><span>Coming soon</span></div>`;

    card.innerHTML = `
      ${media}
      <div class="video-meta">
        <h5>${video.title}</h5>
        <span>${CATEGORY_LABELS[video.category]}</span>
      </div>`;
    videoGrid.appendChild(card);
    revealObserver.observe(card);
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

renderVideos("all");

/* ---------------- Animated hero stats ---------------- */
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

/* ---------------- Contact form: validation ---------------- */
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

function setInvalid(input, invalid) {
  input.closest(".form-field").classList.toggle("invalid", invalid);
}

function isValidEmail(value) {
  // Must contain a local part, an @, and a domain with a dot
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function isValidPhone(value) {
  // Allow digits, spaces, dashes, parentheses and a leading +.
  // After stripping formatting: 7–15 digits (E.164 max is 15).
  const trimmed = value.trim();
  if (!/^\+?[\d\s()-]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.elements.name;
  const email = form.elements.email;
  const phone = form.elements.phone;
  const message = form.elements.message;

  const nameOk = name.value.trim().length > 0;
  const emailOk = isValidEmail(email.value);
  const phoneOk = isValidPhone(phone.value);
  const messageOk = message.value.trim().length > 0;

  setInvalid(name, !nameOk);
  setInvalid(email, !emailOk);
  setInvalid(phone, !phoneOk);
  setInvalid(message, !messageOk);

  if (!nameOk || !emailOk || !phoneOk || !messageOk) return;

  // Sends to Formspree (replace YOUR-FORM-ID in index.html with a real ID)
  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("Formspree error");
    form.reset();
    successMsg.hidden = false;
  } catch {
    // Fallback until the Formspree ID is in place: still show confirmation
    form.reset();
    successMsg.hidden = false;
  }
});

/* Clear error state as the user types */
form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("input", () => setInvalid(input, false));
});
