# Coffea — TP4 UX/UI

Landing page estática para una cafetería, desarrollada como trabajo práctico de Diseño UX/UI.

**Materia:** Diseño UX/UI — 2026  
**Carrera:** Licenciatura en Sistemas de Información (UADER FCyT)

## Contenido

- Hero y navegación responsive: menú desplegable en móvil y enlaces horizontales en escritorio.
- Categorías y carruseles de café y postres.
- Promoción de granos de café.
- Reseñas con valoraciones por estrellas.
- Formulario de newsletter.
- Footer con enlaces y redes sociales.

## Tecnologías

- HTML semántico.
- CSS organizado por componentes, con variables y nomenclatura BEM.
- SVG y AVIF locales para íconos e imágenes.
- Google Fonts para la tipografía.

No requiere instalación de dependencias ni un proceso de build.

## Uso local

Abrí `index.html` en un navegador. Para probar el formulario de newsletter, publicá el sitio en Netlify, que procesa el formulario mediante Netlify Forms.

## Publicación en Netlify

El archivo `netlify.toml` configura la carpeta actual como directorio de publicación (`publish = "."`). Al conectar este proyecto en Netlify, usá `TP4` como base y directorio de publicación; no hace falta un comando de build.
