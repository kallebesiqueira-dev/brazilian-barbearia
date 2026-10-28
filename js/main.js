/* ==========================================================================
   BRAZILIAN BARBEARIA — comportamento principal
   Renderiza serviços, vitrine de produtos, contatos condicionais,
   menu móvel, lightbox da galeria e ano do rodapé.
   Sem dependências externas — funciona mesmo se o GSAP não carregar.
   ========================================================================== */

(function () {
  "use strict";

  var CONFIG = window.SITE_CONFIG || {};
  var PRODUCTS = window.PRODUCTS || [];

  /* ---------- utilitário: cria elemento com classe e conteúdo ---------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  /* ---------- painéis empilhados: a página inteira sobe de baixo pra cima ----------
     Cada seção fixa no topo (sticky) e a seguinte sobe por cima dela.
     Seções mais altas que a tela recebem top negativo: o conteúdo rola
     por completo antes de a seção fixar — nada fica inacessível. */
  var panels = document.querySelectorAll(".panel");
  function updateStackedPanels() {
    panels.forEach(function (panel) {
      panel.classList.add("panel--stack");
      var overflow = panel.offsetHeight - window.innerHeight;
      panel.style.top = overflow > 0 ? -overflow + "px" : "0px";
    });
  }
  if (panels.length) {
    updateStackedPanels();
    window.addEventListener("resize", updateStackedPanels);
    /* alturas mudam quando imagens/fontes terminam de carregar */
    window.addEventListener("load", updateStackedPanels);
  }

  /* ---------- marquee contínuo dos diferenciais ----------
     Duplica o grupo de cards (cópia decorativa, aria-hidden) para que a
     animação CSS translateX(-100%) feche um loop perfeito. Sem JS, os
     cards ficam estáticos e visíveis. */
  var marquee = document.getElementById("featuresMarquee");
  if (marquee) {
    var group = marquee.querySelector(".marquee__group");
    if (group) {
      /* clona até cobrir a tela sem vão: (cópias-1) × larguraGrupo >= viewport */
      var copies = Math.min(6, Math.ceil(window.innerWidth / group.offsetWidth) + 1);
      for (var c = 1; c < Math.max(2, copies); c++) {
        var clone = group.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        marquee.appendChild(clone);
      }
      marquee.classList.add("marquee--on");
    }
  }

  /* ---------- carrossel antes/depois ---------- */
  var carouselTrack = document.getElementById("carouselTrack");
  var carouselPrev = document.getElementById("carouselPrev");
  var carouselNext = document.getElementById("carouselNext");
  if (carouselTrack && carouselPrev && carouselNext) {
    function slideBy(direction) {
      var item = carouselTrack.querySelector(".carousel__item");
      var step = item ? item.offsetWidth + 24 : carouselTrack.clientWidth / 2;
      carouselTrack.scrollBy({ left: direction * step * 2, behavior: "smooth" });
    }
    carouselPrev.addEventListener("click", function () { slideBy(-1); });
    carouselNext.addEventListener("click", function () { slideBy(1); });
  }

  /* ---------- menu móvel ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    var nav = navToggle.closest(".nav");
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("nav--open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.querySelector(".visually-hidden").textContent =
        open ? "Fechar menu" : "Abrir menu";
    });
    navMenu.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        nav.classList.remove("nav--open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- serviços (dados editáveis em js/config.js) ---------- */
  var servicesGrid = document.getElementById("servicesGrid");
  var servicesEmpty = document.getElementById("servicesEmpty");
  if (servicesGrid) {
    var services = CONFIG.services || [];
    if (!services.length) {
      if (servicesEmpty) servicesEmpty.hidden = false;
    } else {
      services.forEach(function (service) {
        var card = el("article", "service-card");
        card.appendChild(el("h3", null, service.name));
        if (service.description) {
          card.appendChild(el("p", null, service.description));
        }
        if (service.price) {
          card.appendChild(el("p", "service-card__price", service.price));
        }
        servicesGrid.appendChild(card);
      });
    }
  }

  /* ---------- vitrine de produtos (dados em js/products.js) ---------- */
  var productsGrid = document.getElementById("productsGrid");
  if (productsGrid) {
    PRODUCTS.forEach(function (product) {
      var card = el("article", "product-card");

      var media = el("div", "product-card__media");
      var img = document.createElement("img");
      img.src = product.image;
      img.alt = product.alt || product.name;
      img.loading = "lazy";
      img.width = 960;
      img.height = 1280;
      media.appendChild(img);
      card.appendChild(media);

      var body = el("div", "product-card__body");
      body.appendChild(el("h3", "product-card__name", product.name));
      if (product.description) {
        body.appendChild(el("p", "product-card__desc", product.description));
      }

      var prices = el("div", "product-card__prices");
      (product.prices || []).forEach(function (price) {
        var wrap = el("span", "product-card__price");
        if (price.label) {
          wrap.appendChild(el("span", "product-card__price-label", price.label));
        }
        wrap.appendChild(el("span", "product-card__price-value", price.value));
        prices.appendChild(wrap);
      });
      body.appendChild(prices);

      card.appendChild(body);
      productsGrid.appendChild(card);
    });
  }

  /* ---------- lightbox acessível da galeria ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  if (lightbox && lightboxImg && typeof lightbox.showModal === "function") {
    document.querySelectorAll(".gallery__zoom").forEach(function (button) {
      button.addEventListener("click", function () {
        lightboxImg.src = button.getAttribute("data-full");
        lightboxImg.alt = button.getAttribute("data-alt") || "";
        lightbox.showModal();
      });
    });
    lightboxClose.addEventListener("click", function () {
      lightbox.close();
    });
    /* clique no backdrop fecha */
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("close", function () {
      lightboxImg.src = "";
    });
  }

  /* ---------- agendamento futuro (Agenda Easy) ---------- */
  var booking = document.getElementById("agendamento");
  var bookingLink = document.getElementById("bookingLink");
  if (booking && bookingLink && CONFIG.agendaEasyUrl) {
    bookingLink.href = CONFIG.agendaEasyUrl;
    booking.hidden = false;
  }

  /* ---------- horários e telefone (exibidos só quando confirmados) ---------- */
  var hoursBox = document.getElementById("locationHours");
  if (hoursBox && Array.isArray(CONFIG.hours) && CONFIG.hours.length) {
    var hoursTitle = el("h3", null, "Horários");
    hoursBox.appendChild(hoursTitle);
    CONFIG.hours.forEach(function (line) {
      hoursBox.appendChild(el("p", null, line));
    });
    hoursBox.hidden = false;
  }

  var phoneBox = document.getElementById("locationPhone");
  if (phoneBox && CONFIG.phone) {
    phoneBox.appendChild(el("h3", null, "Telefone"));
    phoneBox.appendChild(el("p", null, CONFIG.phone));
    phoneBox.hidden = false;
  }

  /* ---------- redes sociais (exibidas só quando confirmadas) ---------- */
  var socialList = document.getElementById("socialLinks");
  if (socialList) {
    function addSocial(label, href, icon) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      var img = document.createElement("img");
      img.src = icon;
      img.alt = label;
      img.width = 96;
      img.height = 96;
      img.loading = "lazy";
      a.appendChild(img);
      li.appendChild(a);
      socialList.appendChild(li);
    }
    if (CONFIG.instagram) addSocial("Instagram", CONFIG.instagram, "img/insta-icon.png");
    if (CONFIG.whatsapp) addSocial("WhatsApp", "https://wa.me/" + CONFIG.whatsapp, "img/whatsapp-icon.png");
  }

  /* ---------- vídeo da galeria: contínuo, mas respeita movimento reduzido ---------- */
  var galleryVideo = document.querySelector(".gallery__item--video video");
  if (galleryVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    galleryVideo.removeAttribute("autoplay");
    galleryVideo.pause();
    galleryVideo.setAttribute("controls", "");
  }

  /* ---------- ano dinâmico no rodapé ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
