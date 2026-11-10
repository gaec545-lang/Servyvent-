/* ============================================================
   Papeleria Servyvent - main.js
   - Menu movil (hamburguesa)
   - Sombra del header al hacer scroll
   - Filtros del catalogo (catalogo.html)
   - Formularios de contacto y pedido -> WhatsApp prellenado
   ============================================================ */
(function () {
  "use strict";

  // Numero de WhatsApp Business (PLACEHOLDER - reemplazar con el real, formato internacional sin signos: 52 + lada + numero)
  var WA_NUMBER = "5210000000000";
  function waLink(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }
  window.SERVYVENT_WA = waLink;

  document.addEventListener("DOMContentLoaded", function () {
    /* Año del footer */
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());

    /* Menu movil */
    var btn = document.getElementById("menu-btn");
    var menu = document.getElementById("mobile-menu");
    var iconOpen = document.getElementById("icon-open");
    var iconClose = document.getElementById("icon-close");
    if (btn && menu) {
      btn.addEventListener("click", function () {
        var open = menu.classList.toggle("hidden") === false;
        btn.setAttribute("aria-expanded", String(open));
        btn.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
        if (iconOpen) iconOpen.classList.toggle("hidden", open);
        if (iconClose) iconClose.classList.toggle("hidden", !open);
      });
      menu.addEventListener("click", function (e) {
        if (e.target.closest("a")) btn.click();
      });
    }

    /* Sombra del header al hacer scroll */
    var nav = document.getElementById("site-nav");
    function onScroll() {
      if (!nav) return;
      nav.classList.toggle("shadow-card", window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- Filtros del catalogo ---------- */
    var filterBtns = document.querySelectorAll("[data-filter]");
    var items = document.querySelectorAll("[data-cat]");
    if (filterBtns.length && items.length) {
      filterBtns.forEach(function (b) {
        b.addEventListener("click", function () {
          var f = b.getAttribute("data-filter");
          filterBtns.forEach(function (x) {
            var on = x === b;
            x.classList.toggle("bg-accent", on);
            x.classList.toggle("text-white", on);
            x.classList.toggle("bg-surface", !on);
            x.classList.toggle("text-ink", !on);
            x.setAttribute("aria-pressed", String(on));
          });
          items.forEach(function (it) {
            var show = f === "all" || it.getAttribute("data-cat") === f;
            it.classList.toggle("hidden", !show);
          });
        });
      });
    }

    /* ---------- Formulario de pedido (pedidos.html) ---------- */
    var orderForm = document.getElementById("order-form");
    if (orderForm) {
      orderForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!orderForm.checkValidity()) { orderForm.reportValidity(); return; }
        var d = new FormData(orderForm);
        var msg =
          "Hola, soy " + (d.get("nombre") || "") + ".\n" +
          "Quiero pedir: " + (d.get("producto") || "") + "\n" +
          "Cantidad: " + (d.get("cantidad") || "1") + "\n" +
          "Sucursal de recolección: " + (d.get("sucursal") || "Matriz") + "\n" +
          (d.get("mensaje") ? "Mensaje: " + d.get("mensaje") + "\n" : "") +
          "Tel: " + (d.get("telefono") || "");
        var ok = document.getElementById("order-ok");
        if (ok) ok.classList.remove("hidden");
        var waBtn = document.getElementById("order-wa");
        if (waBtn) waBtn.setAttribute("href", waLink(msg));
        orderForm.reset();
        if (ok) ok.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    /* ---------- Formulario de contacto (contacto.html) ---------- */
    var contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
        var d = new FormData(contactForm);
        var msg =
          "Hola, soy " + (d.get("nombre") || "") + ". " + (d.get("mensaje") || "") +
          (d.get("telefono") ? " Mi tel: " + d.get("telefono") + "." : "");
        var ok = document.getElementById("contact-ok");
        if (ok) ok.classList.remove("hidden");
        var waBtn = document.getElementById("contact-wa");
        if (waBtn) waBtn.setAttribute("href", waLink(msg));
        contactForm.reset();
        if (ok) ok.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    /* Botones "Consultar por WhatsApp" del catalogo */
    document.querySelectorAll("[data-wa-product]").forEach(function (b) {
      b.addEventListener("click", function () {
        var p = b.getAttribute("data-wa-product");
        b.setAttribute("href", waLink("Hola, quiero consultar disponibilidad y precio de: " + p));
      });
    });
  });
})();
