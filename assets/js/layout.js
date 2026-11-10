/* ============================================================
   Papeleria Servyvent - layout compartido (navbar + footer)
   Se inyecta en <div id="site-header"> y <div id="site-footer">.
   La pagina activa se marca con <body data-page="...">.
   Logo real del cliente: assets/img/logo-512.png
   ============================================================ */
(function () {
  "use strict";

  var NAV = [
    { id: "inicio",       label: "Inicio",      href: "index.html" },
    { id: "nosotros",    label: "Nosotros",    href: "nosotros.html" },
    { id: "productos",   label: "Productos",   href: "productos.html" },
    { id: "catalogo",    label: "Catálogo",    href: "catalogo.html" },
    { id: "promociones", label: "Promociones", href: "promociones.html" },
    { id: "pedidos",     label: "Pedidos",     href: "pedidos.html" },
    { id: "contacto",    label: "Contacto",    href: "contacto.html" }
  ];

  // Logo real de Papeleria Servyvent (subido por el cliente)
  var LOGO_NAV = '<img src="assets/img/logo-512.png" alt="Logotipo de Papelería Servyvent" class="logo-img">';
  var LOGO_FOOTER = '<img src="assets/img/logo-512.png" alt="Logotipo de Papelería Servyvent" class="logo-footer">';

  var page = document.body.getAttribute("data-page") || "inicio";

  function linkClass(active) {
    return "font-display font-semibold text-sm px-3 py-2 rounded-md transition-colors " +
      (active ? "text-accent " : "text-ink/80 hover:text-accent ");
  }

  var desktopLinks = NAV.map(function (n) {
    var active = n.id === page;
    return (
      '<a href="' + n.href + '" class="' + linkClass(active) + '"' +
      (active ? ' aria-current="page"' : "") + ">" + n.label + "</a>"
    );
  }).join("");

  var mobileLinks = NAV.map(function (n) {
    var active = n.id === page;
    return (
      '<a href="' + n.href + '" class="block px-3 py-3 rounded-md font-display font-semibold ' +
      (active ? "text-accent bg-surface" : "text-ink hover:bg-surface") + '"' +
      (active ? ' aria-current="page"' : "") + ">" + n.label + "</a>"
    );
  }).join("");

  var header =
    '<header id="site-nav" class="fixed top-0 inset-x-0 z-50 bg-paper/95 backdrop-blur border-b border-primary/10 transition-shadow">' +
      '<div class="max-w-wrap mx-auto px-6 h-[72px] flex items-center justify-between gap-4">' +
        '<a href="index.html" class="flex items-center gap-3 shrink-0" aria-label="Papelería Servyvent - Inicio">' +
          LOGO_NAV +
          '<span class="font-display font-bold text-primary text-lg leading-none">Papelería<br/>Servyvent</span>' +
        "</a>" +
        '<nav class="hidden lg:flex items-center gap-1" aria-label="Navegación principal">' + desktopLinks + "</nav>" +
        '<div class="hidden lg:block">' +
          '<a href="pedidos.html" class="press inline-flex items-center gap-2 bg-accent hover:bg-primary text-white font-display font-semibold text-sm px-5 py-2.5 rounded-lg shadow-card">Pedir por WhatsApp</a>' +
        "</div>" +
        '<button id="menu-btn" type="button" class="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-primary hover:bg-surface" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menú de navegación">' +
          '<svg id="icon-open" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
          '<svg id="icon-close" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="hidden"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
        "</button>" +
      "</div>" +
      '<div id="mobile-menu" class="lg:hidden hidden border-t border-primary/10 bg-paper">' +
        '<nav class="px-6 py-3 flex flex-col gap-1" aria-label="Menú móvil">' + mobileLinks + "</nav>" +
      "</div>" +
    "</header>";

  var footer =
    '<footer class="bg-primary text-white mt-20">' +
      '<div class="max-w-wrap mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">' +
        '<div>' +
          '<div class="flex items-center gap-3">' + LOGO_FOOTER +
            '<span class="font-display font-bold text-lg leading-none">Papelería<br/>Servyvent</span>' +
          "</div>" +
          '<p class="mt-4 text-white/70 text-sm leading-relaxed">Todo lo que necesitas en un solo lugar. Papelería, mercería, regalos, electrónica, robótica e impresión en San Salvador El Seco, Puebla.</p>' +
        "</div>" +
        '<nav aria-label="Enlaces rápidos del pie">' +
          '<h3 class="font-display font-semibold text-white/90 text-sm uppercase tracking-wider">Sitio</h3>' +
          '<ul class="mt-4 space-y-2 text-sm">' +
            NAV.map(function (n) {
              return '<li><a class="text-white/70 hover:text-highlight transition-colors" href="' + n.href + '">' + n.label + "</a></li>";
            }).join("") +
          "</ul>" +
        "</nav>" +
        '<div>' +
          '<h3 class="font-display font-semibold text-white/90 text-sm uppercase tracking-wider">Contacto</h3>' +
          '<ul class="mt-4 space-y-2 text-sm text-white/70">' +
            '<li>San Salvador El Seco, Puebla, México</li>' +
            '<li>2 sucursales · Horario: consultar en tienda</li>' +
            '<li>Pagos: efectivo en sucursal y transferencia bancaria</li>' +
            '<li><a class="text-highlight hover:underline" href="pedidos.html">Hacer un pedido por WhatsApp</a></li>' +
          "</ul>" +
        "</div>" +
      "</div>" +
      '<div class="border-t border-white/10">' +
        '<div class="max-w-wrap mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">' +
          '<p>© <span id="year">2025</span> Papelería Servyvent. Todos los derechos reservados.</p>' +
          '<p>Fotografías de demostración: <a class="underline hover:text-white/80" href="assets/img/CREDITS.txt">Wikimedia Commons (créditos)</a></p>' +
        "</div>" +
      "</div>" +
    "</footer>";

  var h = document.getElementById("site-header");
  var f = document.getElementById("site-footer");
  if (h) h.innerHTML = header;
  if (f) f.innerHTML = footer;
})();

