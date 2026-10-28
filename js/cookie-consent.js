/* ==========================================================================
   BRAZILIAN BARBEARIA — consentimento de cookies (LGPD)

   Estado atual do site: NENHUM cookie de terceiros, nenhuma ferramenta de
   analytics ou publicidade está ativa. O consentimento é guardado em
   localStorage (categoria essencial) e a escolha sobre "estatísticas"
   fica registrada para quando/SE uma ferramenta for adicionada.

   API exposta: window.cookieConsent.get() → { essential, analytics } | null
                window.cookieConsent.open() → reabre o banner
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "bb-cookie-consent-v1";

  var banner = document.getElementById("cookieBanner");
  var btnAccept = document.getElementById("cookieAccept");
  var btnReject = document.getElementById("cookieReject");
  var btnCustomize = document.getElementById("cookieCustomize");
  var btnReopen = document.getElementById("reopenCookies");
  var prefsForm = document.getElementById("cookiePrefs");
  var analyticsInput = document.getElementById("cookieAnalytics");

  if (!banner) return;

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function saveConsent(analytics) {
    var consent = {
      essential: true,
      analytics: Boolean(analytics),
      decidedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (error) {
      /* armazenamento indisponível (ex.: modo privado restrito):
         o banner apenas fecha e voltará na próxima visita */
    }
    hideBanner();
    return consent;
  }

  /* exibição via classe (transform/opacity) para não gerar layout shift */
  function showBanner() {
    var current = readConsent();
    if (analyticsInput && current) analyticsInput.checked = current.analytics;
    banner.classList.add("cookie-banner--visible");
  }

  function hideBanner() {
    banner.classList.remove("cookie-banner--visible");
    if (prefsForm) prefsForm.hidden = true;
    if (btnCustomize) btnCustomize.setAttribute("aria-expanded", "false");
  }

  if (btnAccept) {
    btnAccept.addEventListener("click", function () { saveConsent(true); });
  }
  if (btnReject) {
    btnReject.addEventListener("click", function () { saveConsent(false); });
  }
  if (btnCustomize && prefsForm) {
    btnCustomize.addEventListener("click", function () {
      var open = prefsForm.hidden;
      prefsForm.hidden = !open;
      btnCustomize.setAttribute("aria-expanded", String(open));
    });
    prefsForm.addEventListener("submit", function (event) {
      event.preventDefault();
      saveConsent(analyticsInput && analyticsInput.checked);
    });
  }
  if (btnReopen) {
    btnReopen.addEventListener("click", showBanner);
  }

  /* primeira visita: mostra o banner; visitas seguintes: respeita a escolha */
  if (!readConsent()) showBanner();

  window.cookieConsent = {
    get: readConsent,
    open: showBanner
  };
})();
