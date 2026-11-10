# Papelería Servyvent — Sitio web (proyecto escolar)

Sitio multi-página para **Papelería Servyvent** (San Salvador El Seco, Puebla, México):
papelería, mercería, regalos, electrónica, robótica e impresión y copiado. 25 años de trayectoria, 2 sucursales.

## Cómo ver el sitio
Abrir cualquiera de las páginas con doble clic (funciona desde `file://`) o servir la carpeta:

```
python -m http.server 8080
# y abrir http://127.0.0.1:8080/index.html
```

El sitio es **100% offline**: Tailwind compilado local, fuentes descargadas y fotos locales.
Solo necesitan internet el mapa de Google y los enlaces a WhatsApp/redes.

## Páginas
| Archivo | Sección |
|---|---|
| `index.html` | Inicio (hero, categorías, promo, sucursales, CTA) |
| `nosotros.html` | Historia, línea del tiempo, misión, compromiso, valores |
| `productos.html` | 6 categorías con descripción y listas |
| `catalogo.html` | Catálogo filtrable por categoría + consulta por WhatsApp |
| `promociones.html` | Promociones de temporada, productos seleccionados, ofertas en redes |
| `pedidos.html` | Proceso de pedido (5 pasos), formulario de pedido, métodos de pago |
| `contacto.html` | Formulario de contacto, datos, mapa y sucursales |

## Estructura
```
├── *.html                  7 páginas
└── assets/
    ├── css/
    │   ├── fonts.css           @font-face (fuentes locales)
    │   ├── tailwind.build.css  Tailwind compilado (minificado)
    │   └── site.css            estilos propios: micro-interacciones, hero entrance
    ├── js/
    │   ├── layout.js           navbar + footer compartidos (se inyectan en cada página)
    │   └── main.js             menú móvil, filtros del catálogo, formularios → WhatsApp
    ├── fonts/                  Montserrat 500/600/700, Roboto 400/500/italic (woff2)
    └── img/                    fotos (Wikimedia Commons) + CREDITS.txt + favicon.svg
```

## Tokens de marca (en `tailwind.config.cjs` y `assets/js/tailwind.config.js`)
| Token | Hex | Uso |
|---|---|---|
| `primary` | `#17365D` | Encabezados, elementos destacados |
| `accent` | `#2878B5` | Enlaces, botones, interactivos |
| `surface` | `#F3F6F9` | Fondos de secciones y tarjetas |
| `paper` | `#FFFFFF` | Fondo principal |
| `ink` | `#263238` | Textos |
| `highlight` | `#E8A23A` | Promociones, CTAs, atención |

Tipografías: **Montserrat** (display: títulos) y **Roboto** (body: textos), servidas desde `assets/fonts/`.

## Pendientes para producción
- Reemplazar el número placeholder de WhatsApp en `assets/js/main.js` (`WA_NUMBER`).
- Sustituir las fotos de demostración (Wikimedia Commons, ver `assets/img/CREDITS.txt`) por fotos reales de la tienda y su logo oficial.
- Completar dirección exacta de cada sucursal en `contacto.html` y `index.html`.
- Crear las redes Facebook/Instagram y enlazarlas en `contacto.html`.
- La transferencia bancaria está marcada como propuesta pendiente de validación con la administración.

## Cómo regenerar el CSS de Tailwind tras editar clases
```
npm install -D tailwindcss@3 --cache .\.npm-cache
npx tailwindcss -c tailwind.config.cjs -i tw.input.css -o assets/css/tailwind.build.css --minify
```
(`tw.input.css` contiene las 3 directivas `@tailwind`; recrearlo si se borró.)
