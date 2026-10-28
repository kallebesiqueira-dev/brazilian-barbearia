/* ==========================================================================
   BRAZILIAN BARBEARIA — scroll storytelling com GSAP + ScrollTrigger

   Papel do GSAP aqui: ENRIQUECER. O efeito estrutural de painéis subindo
   sobre o hero é feito em CSS (position: sticky) e funciona sem JS.
   Este arquivo adiciona:
   - hero que escurece/recua suavemente conforme o primeiro painel sobe;
   - conteúdo de cada seção revelado de baixo para cima;
   - cards (serviços, produtos, diferenciais, galeria) com stagger.

   Salvaguardas:
   - se o CDN do GSAP falhar, nada acontece e o site segue íntegro;
   - prefers-reduced-motion desativa todas as animações;
   - em telas pequenas as animações são encurtadas;
   - fromTo() garante estado final consistente (sem conteúdo invisível).
   ========================================================================== */

(function () {
  "use strict";

  if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
    return; /* fallback: sem GSAP o site permanece completo e navegável */
  }

  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  var mm = gsap.matchMedia();

  /* usuários que preferem movimento reduzido: nenhuma animação é criada */
  mm.add(
    {
      reduced: "(prefers-reduced-motion: reduce)",
      desktop: "(prefers-reduced-motion: no-preference) and (min-width: 761px)",
      mobile: "(prefers-reduced-motion: no-preference) and (max-width: 760px)"
    },
    function (context) {
      if (context.conditions.reduced) return;

      var isMobile = context.conditions.mobile;

      /* ---- hero: leve zoom e recuo da foto enquanto o painel Sobre sobe ---- */
      var heroMedia = document.querySelector(".hero__media img");
      var firstPanel = document.querySelector(".panel");
      if (heroMedia && firstPanel) {
        gsap.fromTo(
          heroMedia,
          { scale: 1, filter: "brightness(1)" },
          {
            scale: isMobile ? 1.04 : 1.08,
            filter: "brightness(0.55)",
            ease: "none",
            scrollTrigger: {
              trigger: firstPanel,
              start: "top bottom",
              end: "top 25%",
              scrub: true
            }
          }
        );
      }

      /* ---- títulos e textos: sobem ao entrar na tela ---- */
      document.querySelectorAll(".section__inner").forEach(function (inner) {
        var headline = inner.querySelectorAll(
          ".section__eyebrow, .section__title, .section__text, .location, .btn, .about-marks, .section__figure"
        );
        if (!headline.length) return;
        gsap.fromTo(
          headline,
          { y: isMobile ? 30 : 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: inner,
              start: "top 78%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      /* ---- grades de cards: stagger de baixo para cima ---- */
      /* .features fica de fora: o marquee contínuo já cuida do movimento */
      [".products", ".carousel__track", ".gallery-squares"].forEach(function (selector) {
        var grid = document.querySelector(selector);
        if (!grid || !grid.children.length) return;
        gsap.fromTo(
          grid.children,
          { y: isMobile ? 36 : 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: grid,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      /* cleanup automático: gsap.matchMedia reverte tweens e
         ScrollTriggers deste contexto quando a media query muda */
    }
  );

  /* alturas dinâmicas (imagens carregando) podem deslocar os gatilhos */
  window.addEventListener("load", function () {
    window.ScrollTrigger.refresh();
  });
})();
