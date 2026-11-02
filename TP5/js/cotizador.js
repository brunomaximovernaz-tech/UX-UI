export async function obtenerPlanes() {
  const respuesta = await fetch('data/planes.json');

  if (!respuesta.ok) {
    throw new Error(`No se pudieron obtener los planes: ${respuesta.status}`);
  }

  const planes = await respuesta.json();
  if (!Array.isArray(planes)) {
    throw new TypeError('El archivo de planes debe contener un array.');
  }

  return planes;
}

export function calcularCuota(valorIngresado, tasaAnual, antiguedadIngresada) {
  const valorLimpiado = Number(String(valorIngresado).replace(/\D/g, ''));
  const antiguedad = Number(antiguedadIngresada);

  if (!Number.isFinite(antiguedad)) {
    throw new TypeError('La antigüedad debe expresarse en años.');
  }

  const factoresMapeados = new Set([1, 1.1, 1.25]);
  const factorAntiguedad = factoresMapeados.has(antiguedad)
    ? antiguedad
    : antiguedad < 1
      ? 1
      : antiguedad <= 2
        ? 1.1
        : 1.25;

  return Math.round((valorLimpiado * tasaAnual / 12) * factorAntiguedad);
}
