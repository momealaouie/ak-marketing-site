/* ================================================================
   AK Media — legal pages (privacy.html, terms.html)
   Shows the article in the visitor's language: the same "lang" value
   script.js saves on the main page, switched with the same flag button.
   Elements with data-en / data-sv get their text swapped.
   ================================================================ */

const FLAG_EN =
  '<svg viewBox="0 0 20 14" aria-hidden="true">' +
  '<rect width="20" height="14" fill="#B22234"/>' +
  '<g fill="#fff"><rect y="2" width="20" height="2"/><rect y="6" width="20" height="2"/><rect y="10" width="20" height="2"/></g>' +
  '<rect width="9" height="8" fill="#3C3B6E"/>' +
  '<g fill="#fff"><circle cx="2" cy="2" r="0.7"/><circle cx="4.5" cy="2" r="0.7"/><circle cx="7" cy="2" r="0.7"/>' +
  '<circle cx="3.2" cy="4" r="0.7"/><circle cx="5.8" cy="4" r="0.7"/>' +
  '<circle cx="2" cy="6" r="0.7"/><circle cx="4.5" cy="6" r="0.7"/><circle cx="7" cy="6" r="0.7"/></g></svg>';
const FLAG_SV =
  '<svg viewBox="0 0 20 14" aria-hidden="true">' +
  '<rect width="20" height="14" fill="#006AA7"/>' +
  '<rect x="6" width="3" height="14" fill="#FECC00"/>' +
  '<rect y="5.5" width="20" height="3" fill="#FECC00"/></svg>';

const toggle = document.getElementById("langToggle");
let lang = "en";
try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}

function showLang(next) {
  lang = next;
  try { localStorage.setItem("lang", lang); } catch (e) {}
  document.documentElement.lang = lang;
  document.querySelectorAll("article[lang]").forEach((a) => { a.hidden = a.lang !== lang; });
  document.querySelectorAll("[data-en]").forEach((el) => { el.textContent = el.dataset[lang]; });
  toggle.innerHTML =
    '<span class="flag' + (lang === "en" ? " active" : "") + '" title="English">' + FLAG_EN + "</span>" +
    '<span class="flag' + (lang === "sv" ? " active" : "") + '" title="Svenska">' + FLAG_SV + "</span>";
}

toggle.addEventListener("click", () => showLang(lang === "en" ? "sv" : "en"));
showLang(lang);
