// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
  if (isNaN(nuevoPresupuesto) || nuevoPresupuesto < 0) {
    return -1;
  } else if (nuevoPresupuesto > 0) {
    presupuesto = nuevoPresupuesto;
    return nuevoPresupuesto;
  } else {
    return "Tu presupuesto actual es de 0 €";
  }
}

function mostrarPresupuesto() {
  return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(nuevadesc, nuevoValor, nuevaFecha, ...NuevasEtiquetas) {
  this.valor = nuevoValor >= 0 ? nuevoValor : 0;
  this.descripcion = nuevadesc;
  this.fecha = nuevaFecha;
  this.etiquetas = NuevasEtiquetas.length > 0 ? [] : [...NuevasEtiquetas];

  this.mostrarGasto = function () {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
  };

  this.actualizarDescripcion = function (nuevadesc) {
    this.descripcion = nuevadesc;
  };

  this.actualizarValor = function (nuevoValor) {
    this.valor = nuevoValor >= 0 ? nuevoValor : this.valor;
  };

  this.mostrarGastoCompleto = function () {
    let listarEtiquetas = this.etiquetas.forEach((elemento) => {
      `- ${elemento}\n`;
    });
    return `Gasto correspondiente a descripción del gasto con valor ${this.valor} €.
    \n Fecha: ${this.fecha}\n
    Etiquetas: ${listarEtiquetas}`;
  };

  this.actualizarFecha = function (nuevaFecha) {
    if (nuevaFecha instanceof Date && !isNaN(d)) {
      this.fecha = nuevaFecha;
    }
  };

  this.anyadirEtiquetas = function (NuevasEtiquetas) {
    this.etiquetas.push(...NuevasEtiquetas);
  };

  this.borrarEtiquetas = function (...borraEtiqueta) {
    borraEtiqueta.forEach((etiqueta) => {
      etiquetas.find(etiqueta).splice(etiqueta);
    });
  };
}

function listarGastos() {}
function calcularTotalGastos() {}
function calcularBalance() {}
function anyadirGasto() {}
function borrarGasto() {}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
  mostrarPresupuesto,
  actualizarPresupuesto,
  CrearGasto,
  listarGastos,
  anyadirGasto,
  calcularTotalGastos,
  calcularBalance,
  borrarGasto,
};
