export function validarMarca(valor) {
  return String(valor ?? '').trim() ? null : 'Elegí una marca';
}

export function validarModelo(valor) {
  const modelo = String(valor ?? '').trim();
  return modelo.length >= 2 && modelo.length <= 40
    ? null
    : 'Ingresá el modelo del equipo';
}

export function validarValorEquipo(valor) {
  const valorLimpio = Number(String(valor).replace(/\D/g, ''));

  return valorLimpio >= 100000 && valorLimpio <= 2500000
    ? null
    : 'El valor debe estar entre $100.000 y $2.500.000';
}

export function validarAntiguedad(valor) {
  return String(valor ?? '').trim() ? null : 'Indicá la antigüedad';
}

export function validarNombreApellido(valor) {
  return String(valor ?? '').trim().length >= 2
    ? null
    : 'Ingresá tu nombre / apellido';
}

export function validarDNI(valor) {
  return /^\d{7,8}$/.test(String(valor ?? '').trim())
    ? null
    : 'El DNI debe tener 7 u 8 números';
}

export function validarEdad(fechaNacimiento) {
  const fecha = String(fechaNacimiento ?? '').trim();
  const coincidencia = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fecha);
  if (!coincidencia) {
    return 'Tenés que ser mayor de edad';
  }

  const [, anio, mes, dia] = coincidencia.map(Number);
  const nacimiento = new Date(anio, mes - 1, dia);
  if (
    nacimiento.getFullYear() !== anio ||
    nacimiento.getMonth() !== mes - 1 ||
    nacimiento.getDate() !== dia
  ) {
    return 'Tenés que ser mayor de edad';
  }

  const hoy = new Date();
  let edad = hoy.getFullYear() - anio;
  const yaCumplioEsteAnio =
    hoy.getMonth() + 1 > mes ||
    (hoy.getMonth() + 1 === mes && hoy.getDate() >= dia);
  if (!yaCumplioEsteAnio) {
    edad -= 1;
  }

  return edad >= 18 ? null : 'Tenés que ser mayor de edad';
}

export function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(valor ?? '').trim())
    ? null
    : 'Ingresá un email válido';
}

export function validarCelular(valor) {
  const digitos = String(valor ?? '').replace(/\D/g, '');
  return /^\d{10}$/.test(digitos) &&
    !digitos.startsWith('0') &&
    !digitos.startsWith('15')
    ? null
    : 'Ej.: 11 5555-1234';
}

export function validarTarjeta(valor) {
  return /^\d{16}$/.test(String(valor ?? '').replace(/\s/g, ''))
    ? null
    : 'Número de tarjeta inválido';
}

export function validarVencimiento(valor) {
  const coincidencia = /^(\d{2})\/(\d{2})$/.exec(
    String(valor ?? '').trim(),
  );
  if (!coincidencia) {
    return 'Vencimiento inválido';
  }

  const mes = Number(coincidencia[1]);
  const anio = 2000 + Number(coincidencia[2]);
  const hoy = new Date();
  const vigente =
    mes >= 1 &&
    mes <= 12 &&
    (anio > hoy.getFullYear() ||
      (anio === hoy.getFullYear() && mes >= hoy.getMonth() + 1));

  return vigente ? null : 'Vencimiento inválido';
}

export function validarCVV(valor) {
  return /^\d{3}$/.test(String(valor ?? '').trim())
    ? null
    : 'CVV inválido';
}
