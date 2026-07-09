/* ================================================================
   AK Media — page logic
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

/* ---------------- Keyword marquee: fill the track ----------------
   The loop animates the track from 0 to -50%, so the track must be
   two identical halves, each at least as wide as the viewport.
   Clone the keyword sequence until that holds — no empty gaps. */
const MARQUEE_SPEED = 40; // pixels per second — lower = slower
const marqueeTrack = document.querySelector(".marquee-track");
if (marqueeTrack) {
  const firstSeq = marqueeTrack.querySelector(".marquee-seq");
  const seqWidth = firstSeq.offsetWidth;
  if (seqWidth > 0) {
    const perHalf = Math.max(1, Math.ceil((window.innerWidth * 1.25) / seqWidth));
    while (marqueeTrack.children.length < perHalf * 2) {
      marqueeTrack.appendChild(firstSeq.cloneNode(true));
    }
    // Constant pixel speed regardless of how many clones the screen needed
    const halfWidth = seqWidth * (marqueeTrack.children.length / 2);
    marqueeTrack.style.animationDuration = `${Math.round(halfWidth / MARQUEE_SPEED)}s`;
  }
}

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

/* ---------------- Client logos: fallback to initials if file is missing ---------------- */
document.querySelectorAll(".client-logo-img").forEach((img) => {
  img.addEventListener("error", () => {
    const initials = img.alt.replace(" logo", "").split(" ")
      .map((w) => w[0]).slice(0, 2).join("").toUpperCase();
    const span = document.createElement("span");
    span.className = "client-logo";
    span.textContent = initials;
    img.replaceWith(span);
  });
});

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
const errorMsg = document.getElementById("formError");

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

  // Sends via FormSubmit's AJAX endpoint (same address as the form action)
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  successMsg.hidden = true;
  errorMsg.hidden = true;
  try {
    const ajaxUrl = form.action.replace("formsubmit.co/", "formsubmit.co/ajax/");
    const response = await fetch(ajaxUrl, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("FormSubmit error");
    form.reset();
    successMsg.hidden = false;
  } catch {
    errorMsg.hidden = false;
  } finally {
    submitBtn.disabled = false;
  }
});

/* Clear error state as the user types */
form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("input", () => setInvalid(input, false));
});
