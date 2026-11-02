import { irAPaso, solicitud } from './estado.js';
import { render } from './render.js';
import {
  calcularCuota,
  obtenerPlanes,
} from './cotizador.js';
import {
  validarAntiguedad,
  validarCVV,
  validarCelular,
  validarDNI,
  validarEdad,
  validarEmail,
  validarMarca,
  validarModelo,
  validarNombreApellido,
  validarTarjeta,
  validarValorEquipo,
  validarVencimiento,
} from './validaciones.js';
import { generarPoliza, simularPago } from './pago.js';

render();

const camposPaso1 = [
  {
    elemento: document.querySelector('#marca'),
    error: document.querySelector('#marca-error'),
    validar: validarMarca,
    obtenerValor: (elemento) => elemento.value,
  },
  {
    elemento: document.querySelector('#modelo'),
    error: document.querySelector('#modelo-error'),
    validar: validarModelo,
    obtenerValor: (elemento) => elemento.value,
  },
  {
    elemento: document.querySelector('#valor'),
    error: document.querySelector('#valor-error'),
    validar: validarValorEquipo,
    obtenerValor: (elemento) => elemento.value,
  },
  {
    elemento: document.querySelector('#antiguedad'),
    error: document.querySelector('#antiguedad-error'),
    validar: validarAntiguedad,
    obtenerValor: () =>
      document.querySelector('input[name="antiguedad"]:checked')?.value ?? '',
  },
];

const botonVerPlanes = document.querySelector('#btn-ver-planes');
const errorPlanes = document.querySelector('#planes-error');
const camposPaso3 = [
  {
    elemento: document.querySelector('#nombre'),
    error: document.querySelector('#nombre-error'),
    validar: validarNombreApellido,
    clave: 'nombre',
  },
  {
    elemento: document.querySelector('#apellido'),
    error: document.querySelector('#apellido-error'),
    validar: validarNombreApellido,
    clave: 'apellido',
  },
  {
    elemento: document.querySelector('#dni'),
    error: document.querySelector('#dni-error'),
    validar: validarDNI,
    clave: 'dni',
  },
  {
    elemento: document.querySelector('#nacimiento'),
    error: document.querySelector('#nacimiento-error'),
    validar: validarEdad,
    clave: 'nacimiento',
  },
  {
    elemento: document.querySelector('#email'),
    error: document.querySelector('#email-error'),
    validar: validarEmail,
    clave: 'email',
  },
  {
    elemento: document.querySelector('#celular'),
    error: document.querySelector('#celular-error'),
    validar: validarCelular,
    clave: 'celular',
  },
  {
    elemento: document.querySelector('#terminos'),
    error: document.querySelector('#terminos-error'),
    validar: (valor) =>
      valor ? null : 'Aceptá los términos y condiciones',
    clave: 'terminos',
    obtenerValor: (elemento) => elemento.checked,
  },
];
const camposPaso4 = [
  {
    elemento: document.querySelector('#tarjeta'),
    error: document.querySelector('#tarjeta-error'),
    validar: validarTarjeta,
    clave: 'tarjeta',
  },
  {
    elemento: document.querySelector('#vencimiento'),
    error: document.querySelector('#vencimiento-error'),
    validar: validarVencimiento,
    clave: 'vencimiento',
  },
  {
    elemento: document.querySelector('#cvv'),
    error: document.querySelector('#cvv-error'),
    validar: validarCVV,
    clave: 'cvv',
  },
  {
    elemento: document.querySelector('#titular'),
    error: document.querySelector('#titular-error'),
    validar: validarNombreApellido,
    clave: 'titular',
  },
];
const botonContinuarPago = document.querySelector('#btn-continuar-pago');
const botonPagar = document.querySelector('#btn-pagar');
const errorPago = document.querySelector('#pago-error');

function valorCampo(campo) {
  return campo.obtenerValor
    ? campo.obtenerValor(campo.elemento)
    : campo.elemento.value;
}

function mostrarError(campo) {
  const mensaje = campo.validar(valorCampo(campo));
  if (mensaje) {
    campo.elemento.setAttribute('aria-invalid', 'true');
  } else {
    campo.elemento.removeAttribute('aria-invalid');
  }

  campo.error.textContent = mensaje ?? '';
  campo.error.hidden = !mensaje;
  return !mensaje;
}

function validarCampos(campos, mostrarTodos = false) {
  const resultados = campos.map((campo) => {
    const valido = campo.validar(valorCampo(campo)) === null;
    if (mostrarTodos || campo.elemento.hasAttribute('aria-invalid')) {
      mostrarError(campo);
    }
    return valido;
  });

  return resultados.every(Boolean);
}

function guardarCampos(campos, destino) {
  campos.forEach((campo) => {
    destino[campo.clave] = valorCampo(campo);
  });
}

function validarPaso3(mostrarTodos = false) {
  const valido = validarCampos(camposPaso3, mostrarTodos);
  botonContinuarPago.disabled = !valido;
  return valido;
}

function validarPaso4(mostrarTodos = false) {
  const valido = validarCampos(camposPaso4, mostrarTodos);
  botonPagar.disabled = !valido;
  return valido;
}

function actualizarCampoPaso(event, campos, validarPaso) {
  const campo = campos.find(({ elemento }) => elemento === event.target);
  if (!campo) {
    return;
  }

  mostrarError(campo);
  validarPaso();
}

function actualizarValidacionesDePaso(event) {
  actualizarCampoPaso(event, camposPaso3, validarPaso3);
  actualizarCampoPaso(event, camposPaso4, validarPaso4);
}

document.addEventListener('input', actualizarValidacionesDePaso);
document.addEventListener('change', actualizarValidacionesDePaso);
document.addEventListener('blur', actualizarValidacionesDePaso, true);

function mostrarErrorCampo(campo) {
  const mensaje = campo.validar(campo.obtenerValor(campo.elemento));
  const elementos = campo.elemento.matches('fieldset')
    ? campo.elemento.querySelectorAll('input[name="antiguedad"]')
    : [campo.elemento];

  elementos.forEach((elemento) => {
    if (mensaje) {
      elemento.setAttribute('aria-invalid', 'true');
    } else {
      elemento.removeAttribute('aria-invalid');
    }
  });

  campo.error.textContent = mensaje ?? '';
  campo.error.hidden = !mensaje;
  return !mensaje;
}

function validarPaso1() {
  const valido = camposPaso1.every(
    (campo) => campo.validar(campo.obtenerValor(campo.elemento)) === null,
  );

  botonVerPlanes.disabled = !valido;
  return valido;
}

function actualizarValidacion(event) {
  const campo = camposPaso1.find(
    ({ elemento }) =>
      elemento === event.target || elemento.contains(event.target),
  );

  if (campo) {
    mostrarErrorCampo(campo);
    validarPaso1();
  }
}

document.addEventListener('input', actualizarValidacion);
document.addEventListener('change', actualizarValidacion);
document.addEventListener('blur', actualizarValidacion, true);

validarPaso1();
validarPaso3();
validarPaso4();

function guardarTitular() {
  guardarCampos(camposPaso3, solicitud.titular);
}

async function procesarPago() {
  if (!validarPaso4(true)) {
    return;
  }

  guardarCampos(camposPaso4, solicitud.pago);
  const textoOriginal = 'Pagar y contratar';
  botonPagar.textContent = 'Procesando...';
  botonPagar.disabled = true;
  errorPago.hidden = true;
  errorPago.textContent = '';

  try {
    const resultado = await simularPago(solicitud.pago.tarjeta);
    if (resultado.ok) {
      solicitud.poliza = generarPoliza();
      document.querySelector('#numero-poliza').textContent = solicitud.poliza;
      irAPaso(5);
    } else {
      document.querySelector('#motivo-error-pago').textContent =
        resultado.motivo;
      irAPaso(6);
    }
  } catch (error) {
    errorPago.textContent =
      error instanceof Error
        ? `No se pudo procesar el pago: ${error.message}`
        : 'No se pudo procesar el pago.';
    errorPago.hidden = false;
  } finally {
    botonPagar.textContent = textoOriginal;
    validarPaso4();
  }
}

async function cotizarEquipo() {
  if (!validarPaso1()) {
    camposPaso1.forEach(mostrarErrorCampo);
    return;
  }

  const antiguedadIngresada = document.querySelector(
    'input[name="antiguedad"]:checked',
  ).value;
  const factoresAntiguedad = {
    'menos-1-anio': 1,
    '1-2-anios': 1.1,
    'mas-2-anios': 1.25,
  };
  const factorAntiguedad = factoresAntiguedad[antiguedadIngresada];
  const valorLimpio = Number(
    String(document.querySelector('#valor').value).replace(/\D/g, ''),
  );

  solicitud.equipo = {
    marca: document.querySelector('#marca').value,
    modelo: document.querySelector('#modelo').value.trim(),
    valor: valorLimpio,
    antiguedad: antiguedadIngresada,
  };

  botonVerPlanes.disabled = true;
  errorPlanes.hidden = true;
  errorPlanes.textContent = '';

  try {
    const planes = await obtenerPlanes();
    const formatoMoneda = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    });
    const identificadoresPlanes = {
      Básico: 'basico',
      Plus: 'plus',
      Premium: 'premium',
    };

    planes.forEach((plan) => {
      const identificador = identificadoresPlanes[plan.nombre];
      const precio = document.querySelector(
        `[data-plan="${identificador}"] [data-cuota]`,
      );

      if (!identificador || !precio) {
        throw new Error(`No se encontró la tarjeta del plan "${plan.nombre}".`);
      }

      const cuota = calcularCuota(
        valorLimpio,
        plan.tasaAnual,
        factorAntiguedad,
      );
      precio.textContent = `${formatoMoneda.format(cuota)} / mes`;
    });

    irAPaso(2);
  } catch (error) {
    errorPlanes.textContent =
      error instanceof Error
        ? `No se pudieron cargar los planes: ${error.message}`
        : 'No se pudieron cargar los planes.';
    errorPlanes.hidden = false;
  } finally {
    validarPaso1();
  }
}

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const botonIniciar = event.target.closest('#btn-iniciar-cotizacion');
  if (botonIniciar && !botonIniciar.disabled) {
    irAPaso(1);
    return;
  }

  const boton = event.target.closest('button');
  if (!boton || boton.disabled) {
    return;
  }

  if (boton === botonVerPlanes) {
    cotizarEquipo();
    return;
  }

  if (boton === botonContinuarPago) {
    if (validarPaso3(true)) {
      guardarTitular();
      irAPaso(4);
    }
    return;
  }

  if (boton === botonPagar) {
    procesarPago();
    return;
  }

  const texto = boton.textContent.trim().toLocaleLowerCase('es');

  if (texto === 'reintentar pago' || texto === 'cambiar medio de pago') {
    irAPaso(4);
  } else if (texto === 'volver al inicio') {
    irAPaso(0);
  } else if (texto === 'comenzar' || texto === 'cotizar celular') {
    irAPaso(1);
  } else if (texto === 'continuar' || texto.startsWith('continuar ')) {
    irAPaso(solicitud.paso + 1);
  } else if (texto === 'ver planes') {
    irAPaso(solicitud.paso + 1);
  } else if (texto === 'volver' || texto.startsWith('volver ')) {
    irAPaso(solicitud.paso - 1);
  }
});
