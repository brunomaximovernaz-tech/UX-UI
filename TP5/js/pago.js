export function simularPago(numero) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const numeroLimpio = String(numero).replace(/\s/g, '');
      resolve(
        numeroLimpio === '4000000000000002'
          ? { ok: false, motivo: 'Tarjeta rechazada' }
          : { ok: true },
      );
    }, 1500);
  });
}

export function generarPoliza() {
  const anio = new Date().getFullYear();
  const numero = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, '0');

  return `POL-${anio}-${numero}`;
}
