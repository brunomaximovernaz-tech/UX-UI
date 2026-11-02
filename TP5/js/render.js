import { solicitud } from './estado.js';

export function render() {
  document.querySelectorAll('[data-paso]').forEach((seccion) => {
    seccion.hidden = Number(seccion.dataset.paso) !== solicitud.paso;
  });

  // Future enhancement: renderStepper();
  // Future enhancement: renderResumen();
}
