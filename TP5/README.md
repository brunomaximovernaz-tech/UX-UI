# TP5: Flujo de Contratación Digital de Seguros 🛡️📱

Este es el Trabajo Práctico de maquetación avanzada y manejo de estados en JavaScript para la materia de Diseño UX/UI (Licenciatura en Sistemas, UADER).

## 🔗 Despliegue en Producción
**URL del sitio en Netlify:** [Tu link de Netlify va aquí]

## 🛠️ Stack Tecnológico
* **Estructura:** HTML5 semántico[cite: 1].
* **Estilos:** Tailwind CSS v4 + Basecoat UI (vía CDN)[cite: 1, 3].
* **Lógica:** JavaScript Vanilla (Módulos ES6)[cite: 1, 3].
* **Arquitectura:** Manejo de un estado global único (`solicitud`) sin recargas de página[cite: 2, 8].

## 📝 Descripción y Decisiones Técnicas
* Se implementó el flujo lineal de 4 pasos (Cotizar, Plan, Datos, Pago) más pantallas de Éxito/Error en un solo archivo `index.html`, alternando visibilidad con JS[cite: 10].
* Los datos de los planes se obtienen asíncronamente desde un archivo local `data/planes.json`[cite: 2].
* Los estilos visuales se sobrescribieron en `css/tokens.css` para lograr una fidelidad visual exacta con el Figma provisto, forzando modo claro y tipografía Inter[cite: 4].
* Se utilizó la validación recomendada (`blur` e `input`) para habilitar dinámicamente los botones de continuación, validando mediante Regex y funciones puras[cite: 6, 15].

## ✨ Bonus Implementados
* **Persistencia de Datos:** Se implementó `localStorage` para guardar el avance del usuario. Si la página se recarga accidentalmente, el flujo y los datos ingresados no se pierden[cite: 16].
* **Máscara de Input:** Se implementó formateo automático en tiempo real para el número de tarjeta (agregando un espacio cada 4 dígitos)[cite: 16].

## 📱 Capturas de Pantalla
_(Agregá acá una captura de la versión Mobile y otra de la versión Desktop de tu proyecto)_[cite: 1, 15]

git push --set-upstream origin main