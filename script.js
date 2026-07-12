/* ================================================================
   AK Media — page logic
   ================================================================ */

/* ----------------------------------------------------------------
   VIDEO LIST — edit here!
   Only selected videos are shown on the site. Drop the video file
   in assets/videos/ and set its path as "src". Leave src as null
   to show a placeholder until the file is in place.
   category: "commercial" | "interviews" | "location"
   ---------------------------------------------------------------- */
const VIDEOS = [
  // Reels (portrait, cars & vertical edits)
  { title: "Däckcentrum, Porsche 718 Spyder", category: "reels", src: "assets/videos/porsche-dackcentrum.mp4" },
  { title: "Tom Auto AB, Mercedes-AMG C63", category: "reels", src: "assets/videos/tomauto-c63.mp4" },
  { title: "Range Rover Sport", category: "reels", src: "assets/videos/rangerover-reel.mp4" },
  { title: "Helsingborg, City reel", category: "reels", src: "assets/videos/helsingborg-reel.mp4" },
  // Commercial shoots (landscape, rendered as wide 16:9 cards)
  { title: "Custom wheels, Detail", category: "commercial", src: "assets/videos/custom-wheels.mp4", wide: true },
  { title: "Halmstad University, Campus aerial", category: "commercial", src: "assets/videos/hh-campus-aerial.mp4", wide: true },
  { title: "Industrial district, Aerial", category: "commercial", src: "assets/videos/industrial-aerial.mp4", wide: true },
  { title: "Helsingborg, City film", category: "commercial", src: "assets/videos/helsingborg-cityfilm.mp4", wide: true },
  // BTS
  { title: "Däckcentrum, Premium Wheel & Tire", category: "bts", src: "assets/videos/dackcentrum-showroom.mp4" },
  { title: "Däckcentrum, Premium Wheel & Tire", category: "bts", src: "assets/videos/dackcentrum-wheels.mp4" },
  { title: "Ademi AB, Client study", category: "bts", src: "assets/videos/onset-interview.mp4" },
  { title: "IBJJF, European Championship", category: "bts", src: "assets/videos/sports-event.mp4" },
];

const CATEGORY_LABELS = {
  en: { reels: "Reels", commercial: "Commercial shoots", bts: "BTS", soon: "Coming soon" },
  sv: { reels: "Reels", commercial: "Reklamfilm", bts: "BTS", soon: "Kommer snart" },
};

/* ----------------------------------------------------------------
   I18N — all site copy in English and Swedish.
   Elements opt in via data-i18n="key"; values may contain HTML.
   ---------------------------------------------------------------- */
const I18N = {
  en: {
    "nav.results": "Results", "nav.about": "About", "nav.work": "Work", "nav.contact": "Contact us",
    "hero.eyebrow": "Film production &amp; marketing",
    "hero.title": 'We make<br>brands<br><span class="accent">move.</span>',
    "hero.sub": "We produce films for businesses and make them perform on social media and at commercial level.",
    "hero.cta1": "Book a call", "hero.cta2": "See selected work",
    "results.eyebrow": "Results", "results.title": "Results that speak<br>for themselves.",
    "stats.films": "Films produced", "stats.views": "Views generated",
    "stats.brands": "Brands worked with", "stats.roas": "Average ROAS",
    "r1.text": '"AK took our brand from invisible to 1.2 million views in three months. The best investment we\'ve made."',
    "r1.author": "Anna Lindqvist, CEO, Nordic Wear",
    "r2.text": '"Professional, fast and above all: they deliver numbers, not just pretty videos."',
    "r2.author": "Marcus Berg, Founder, FitLab",
    "r3.text": '"We\'ve tried three agencies before. AK is the first one that actually understands our audience."',
    "r3.author": "Sara Öman, CMO, Kavia Bygg",
    "clients.eyebrow": "Featured Clients", "clients.countries": "Produced in 6+ countries",
    "clients.local": "Local", "clients.intl": "International Clients",
    "about.eyebrow": "About us", "about.title": "We produce films.<br>We make them perform.",
    "about.text": "AK Media is a results-driven agency specializing in film production and marketing for businesses. We produce commercial-grade video content and put it to work across social media and commercial channels, with a clear goal behind every frame and results measured against real numbers.",
    "about.how": "How we work",
    "step1.t": "Strategy", "step1.p": "We analyze your audience, competitors and channels, then set a plan with clear goals.",
    "step2.t": "Production", "step2.p": "Our team produces tailored, commercial-grade films for your brand, fast and in high quality.",
    "step3.t": "Distribution", "step3.p": "We publish and advertise at the right time, in the right channel, from social media to commercial campaigns.",
    "step4.t": "Analysis", "step4.p": "Every month you get a report with numbers that matter, and we adjust the strategy accordingly.",
    "work.eyebrow": "Selected work", "work.title": "Our Work.",
    "work.sub": "A glimpse of what we do.",
    "tab.all": "All", "tab.reels": "Reels", "tab.commercial": "Commercial shoots", "tab.bts": "BTS",
    "work.feed": "Watch the full feed",
    "contact.eyebrow": "Contact", "contact.title": "Ready to grow?",
    "contact.sub": "Fill in the form and we'll get back to you within 72 hours.",
    "f.name": "Name *", "f.email": "Email *", "f.phone": "Phone *", "f.company": "Company", "f.message": "Message *",
    "f.send": "Send message",
    "f.success": "Thank you! We'll get back to you within 72 hours.",
    "f.error": "Something went wrong. Please try again, or DM us on Instagram instead.",
    "e.name": "Please enter your name.", "e.email": "Please enter a valid email address.",
    "e.phone": "Please enter a valid phone number (7–15 digits).", "e.message": "Please write a message.",
    "contact.social": 'Prefer social? DM us on <a href="https://www.instagram.com/ak.mediaz" target="_blank" rel="noopener">Instagram</a> or <a href="https://www.tiktok.com/@ak.mediaz" target="_blank" rel="noopener">TikTok</a> · @ak.mediaz',
    "footer.site": "Site", "footer.community": "Community", "footer.contact": "Contact",
  },
  sv: {
    "nav.results": "Resultat", "nav.about": "Om oss", "nav.work": "Arbeten", "nav.contact": "Kontakta oss",
    "hero.eyebrow": "Filmproduktion &amp; marknadsföring",
    "hero.title": 'Vi sätter<br>varumärken<br><span class="accent">i rörelse.</span>',
    "hero.sub": "Vi producerar film åt företag och ser till att den levererar på sociala medier och på kommersiell nivå.",
    "hero.cta1": "Boka ett samtal", "hero.cta2": "Se utvalda arbeten",
    "results.eyebrow": "Resultat", "results.title": "Resultat som talar<br>för sig själva.",
    "stats.films": "Producerade filmer", "stats.views": "Genererade visningar",
    "stats.brands": "Varumärken vi jobbat med", "stats.roas": "Genomsnittlig ROAS",
    "r1.text": '"AK tog vårt varumärke från osynligt till 1,2 miljoner visningar på tre månader. Den bästa investering vi gjort."',
    "r1.author": "Anna Lindqvist, VD, Nordic Wear",
    "r2.text": '"Professionella, snabba och framför allt: de levererar siffror, inte bara snygga videos."',
    "r2.author": "Marcus Berg, Grundare, FitLab",
    "r3.text": '"Vi har testat tre byråer tidigare. AK är den första som faktiskt förstår vår målgrupp."',
    "r3.author": "Sara Öman, Marknadschef, Kavia Bygg",
    "clients.eyebrow": "Utvalda kunder", "clients.countries": "Producerat i 6+ länder",
    "clients.local": "Lokala", "clients.intl": "Internationella kunder",
    "about.eyebrow": "Om oss", "about.title": "Vi producerar film.<br>Vi får den att prestera.",
    "about.text": "AK Media är en resultatdriven byrå specialiserad på filmproduktion och marknadsföring för företag. Vi producerar reklamfilm i toppklass och sätter den i arbete, på sociala medier och i kommersiella kanaler, med ett tydligt mål bakom varje bildruta och resultat som mäts mot riktiga siffror.",
    "about.how": "Så jobbar vi",
    "step1.t": "Strategi", "step1.p": "Vi analyserar er målgrupp, konkurrenter och kanaler och sätter sedan en plan med tydliga mål.",
    "step2.t": "Produktion", "step2.p": "Vårt team producerar skräddarsydd film i toppklass för ert varumärke, snabbt och med hög kvalitet.",
    "step3.t": "Distribution", "step3.p": "Vi publicerar och annonserar vid rätt tidpunkt, i rätt kanal, från sociala medier till kommersiella kampanjer.",
    "step4.t": "Analys", "step4.p": "Varje månad får ni en rapport med siffror som betyder något, och vi justerar strategin därefter.",
    "work.eyebrow": "Utvalda arbeten", "work.title": "Vårt arbete.",
    "work.sub": "En glimt av vad vi gör.",
    "tab.all": "Alla", "tab.reels": "Reels", "tab.commercial": "Reklamfilm", "tab.bts": "BTS",
    "work.feed": "Se hela flödet",
    "contact.eyebrow": "Kontakt", "contact.title": "Redo att växa?",
    "contact.sub": "Fyll i formuläret så återkommer vi inom 72 timmar.",
    "f.name": "Namn *", "f.email": "E-post *", "f.phone": "Telefon *", "f.company": "Företag", "f.message": "Meddelande *",
    "f.send": "Skicka meddelande",
    "f.success": "Tack! Vi återkommer inom 72 timmar.",
    "f.error": "Något gick fel. Försök igen, eller skicka DM på Instagram istället.",
    "e.name": "Ange ditt namn.", "e.email": "Ange en giltig e-postadress.",
    "e.phone": "Ange ett giltigt telefonnummer (7–15 siffror).", "e.message": "Skriv ett meddelande.",
    "contact.social": 'Föredrar du sociala medier? Skicka DM på <a href="https://www.instagram.com/ak.mediaz" target="_blank" rel="noopener">Instagram</a> eller <a href="https://www.tiktok.com/@ak.mediaz" target="_blank" rel="noopener">TikTok</a> · @ak.mediaz',
    "footer.site": "Sidor", "footer.community": "Följ oss", "footer.contact": "Kontakt",
  },
};

let LANG = localStorage.getItem("lang") || "en";

function activeCategory() {
  const active = document.querySelector(".tab.active");
  return active ? active.dataset.category : "all";
}

function applyLang(lang) {
  LANG = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  const dict = I18N[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = dict[el.dataset.i18n];
    if (value !== undefined) el.innerHTML = value;
  });
  // One EN/SV button; the active language is bold
  const toggle = document.getElementById("langToggle");
  if (toggle) toggle.innerHTML = lang === "en" ? "<b>EN</b><span>/</span>SV" : "EN<span>/</span><b>SV</b>";
  renderVideos(activeCategory());
}

document.getElementById("langToggle").addEventListener("click", () => {
  applyLang(LANG === "en" ? "sv" : "en");
});

/* ---------------- Keyword marquee: driven by scroll ----------------
   The track is two identical halves (cloned to cover any screen), and
   its position follows the page scroll: scroll down = words move left,
   scroll up = words move back. Wraps seamlessly at the halfway point. */
const MARQUEE_FACTOR = 0.5; // marquee pixels per scrolled pixel
const marqueeTrack = document.querySelector(".marquee-track");
if (marqueeTrack) {
  const firstSeq = marqueeTrack.querySelector(".marquee-seq");
  const seqWidth = firstSeq.offsetWidth;
  if (seqWidth > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const perHalf = Math.max(1, Math.ceil((window.innerWidth * 1.25) / seqWidth));
    while (marqueeTrack.children.length < perHalf * 2) {
      marqueeTrack.appendChild(firstSeq.cloneNode(true));
    }
    const halfWidth = seqWidth * (marqueeTrack.children.length / 2);
    let target = 0;
    let current = 0;
    const update = () => { target = window.scrollY * MARQUEE_FACTOR; };
    const tick = () => {
      current += (target - current) * 0.12;
      marqueeTrack.style.transform = `translateX(${-(current % halfWidth)}px)`;
      requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    requestAnimationFrame(tick);
  }
}

/* ---------------- Reels: continuous autoplay loop ----------------
   Both reels just play on repeat; the timecode readout follows
   playback like a camera UI. No scroll interaction. */
const fmtTimecode = (t) => {
  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(Math.floor(t % 60)).padStart(2, "0");
  const ff = String(Math.floor((t % 1) * 30)).padStart(2, "0");
  return `${mm}:${ss}:${ff}`;
};

function setupLoopingReel(videoId, timeId) {
  const video = document.getElementById(videoId);
  const timeEl = document.getElementById(timeId);
  if (!video || !timeEl) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }
  const tick = () => {
    timeEl.textContent = fmtTimecode(video.currentTime || 0);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

setupLoopingReel("reelVideo", "reelTime");
setupLoopingReel("aboutReelVideo", "aboutReelTime");

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
  const labels = CATEGORY_LABELS[LANG];
  const filtered = category === "all"
    ? VIDEOS
    : VIDEOS.filter((v) => v.category === category);

  filtered.forEach((video, index) => {
    const card = document.createElement("div");
    card.className = "video-card reveal" + (video.wide ? " wide" : "");
    card.style.setProperty("--d", `${(index % 4) * 0.08}s`);

    // Poster jpg lives next to the mp4 — mobile browsers won't preload
    // video frames, so the poster is what makes cards render there
    const media = video.src
      ? `<video src="${video.src}" poster="${video.src.replace(".mp4", ".jpg")}" controls preload="metadata" playsinline></video>`
      : `<div class="video-placeholder"><span class="play-icon"></span><span>${labels.soon}</span></div>`;

    card.innerHTML = `
      ${media}
      <div class="video-meta">
        <h5>${video.title}</h5>
        <span>${labels[video.category]}</span>
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

/* Apply saved language (also does the initial video render) */
applyLang(LANG);

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
