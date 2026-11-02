# TP5: Flujo de Contratación Digital de Seguros

Este es mi Trabajo Práctico 5 para la materia Diseño UX/UI (Licenciatura en Sistemas, UADER)[cite: 1]. El objetivo del TP fue armar el front-end de un checkout para contratar seguros digitales, maquetando un diseño en Figma y manejando todo el flujo en JavaScript.

## 🔗 Link del proyecto
Acá está la versión subida a producción: (https://tp5seguros.netlify.app/)

## 🛠️ Tecnologías que usé
* **HTML5** (Semántico)
* **CSS:** Tailwind CSS v4 y Basecoat UI (cargados por CDN)[cite: 1, 3].
* **JavaScript:** Vanilla JS puro usando módulos ES6 (sin React ni otros frameworks)[cite: 1, 3].

## 📝 Resumen del desarrollo
El proyecto está armado en un solo archivo `index.html` donde las 7 pantallas (Inicio, Cotizar, Elegir Plan, Datos, Pago, Éxito y Error) se van ocultando o mostrando usando JavaScript y el atributo `hidden`[cite: 10]. 

* **El estado:** Manejé todo el flujo con un único objeto global `solicitud`.
* **Datos y cálculos:** Los planes se traen de forma asíncrona desde un archivo `planes.json`[cite: 2] y la cuota se calcula en el momento según la antigüedad del equipo.
* **Diseño:** Sobrescribí los tokens de CSS para igualar exactamente el modo claro y los colores primarios del Figma que nos pasó la cátedra, incluyendo la tipografía Inter[cite: 4].
* **Validaciones:** Agregué validaciones en línea (`blur` e `input`) usando Regex para que los botones de avanzar solo se habiliten si el formulario está perfecto[cite: 6, 15].

## ✨ Extras (Bonus)
Le agregué un par de funcionalidades extra para mejorar la experiencia:
1. **Persistencia (localStorage):** Los datos se van guardando mientras avanzás. Si apretás F5 por error, no perdés el progreso de la cotización[cite: 16].
2. **Máscara de input:** Le armé una máscara al campo de la tarjeta de crédito para que agregue espacios automáticamente cada 4 números[cite: 16].

## 📱 Vistas del proyecto
_
![alt text]({32CA6F66-53D7-45A1-95CB-F0843AFF8047}.png)
![alt text]({046256E8-243E-4442-B250-50EB05754D38}.png)
