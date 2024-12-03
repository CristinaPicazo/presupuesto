// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

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

function CrearGasto(nuevadesc, nuevoValor, nuevaFecha, ...nuevasEtiquetas) {
  this.valor = nuevoValor >= 0 ? nuevoValor : 0;
  this.descripcion = nuevadesc;

  if (Date.parse(nuevaFecha)) {
    this.fecha = Date.parse(nuevaFecha);
  } else {
    this.fecha = Date.parse(new Date());
  }

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
    let listarGasto = `Gasto correspondiente a ${this.descripcion} con valor ${
      this.valor
    } €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`;

    for (let etiqueta of this.etiquetas) {
      listarGasto += `- ${etiqueta}\n`;
    }
    return listarGasto;
  };

  this.actualizarFecha = function (nuevaFecha) {
    if (Date.parse(nuevaFecha)) {
      this.fecha = Date.parse(nuevaFecha);
    }
  };

  this.anyadirEtiquetas = function (...nuevasEtiquetas) {
    nuevasEtiquetas.forEach((eti) => {
      this.etiquetas.push(eti);
      this.etiquetas = borrarDuplicados(this.etiquetas);
    });
  };

  this.borrarEtiquetas = function (...borraEtiqueta) {
    borraEtiqueta.forEach((eti) => {
      let indice = this.etiquetas.indexOf(eti);
      if (indice != -1) this.etiquetas.splice(indice, 1);
    });
  };

  this.obtenerPeriodoAgrupacion = function (periodo) {
    let fecha = new Date(this.fecha).toISOString();

    if (periodo == "anyo") {
      return fecha.substring(0, 4);
    } else if (periodo == "mes") {
      return fecha.substring(0, 7);
    } else if (periodo == "dia") {
      return fecha.substring(0, 10);
    }
  };

  this.etiquetas = nuevasEtiquetas.length > 0 ? [] : [...nuevasEtiquetas];
  this.anyadirEtiquetas(...nuevasEtiquetas);
}

function listarGastos() {
  return gastos;
}
function calcularTotalGastos() {
  return gastos.map((gasto) => gasto.valor).reduce((a, b) => a + b);
}
function calcularBalance() {
  return presupuesto - calcularTotalGastos();
}
function anyadirGasto(nuevoGasto) {
  nuevoGasto.id = idGasto++;
  gastos.push(nuevoGasto);
}
function borrarGasto(borraId) {
  gastos.forEach((gasto) => {
    if (gasto.id == borraId) {
      let indice = gastos.indexOf(gasto);
      gastos.splice(indice, 1);
    }
  });
}

function borrarDuplicados(arr) {
  return [...new Set(arr)];
}

function filtrarGastos(objeto) {
  return gastos.filter(function (contenidoGasto) {
    let filtrosRequeridos = true;

    if (objeto.fechaDesde) {
      var fechaD = Date.parse(objeto.fechaDesde);
      filtrosRequeridos = filtrosRequeridos && contenidoGasto.fecha >= fechaD;
    }
    if (objeto.fechaHasta) {
      var fechaH = Date.parse(objeto.fechaHasta);
      filtrosRequeridos = filtrosRequeridos && contenidoGasto.fecha <= fechaH;
    }
    if (objeto.valorMinimo) {
      filtrosRequeridos =
        filtrosRequeridos && contenidoGasto.valor >= objeto.valorMinimo;
    }
    if (objeto.valorMaximo) {
      filtrosRequeridos =
        filtrosRequeridos && contenidoGasto.valor <= objeto.valorMaximo;
    }
    if (objeto.descripcionContiene) {
      filtrosRequeridos =
        filtrosRequeridos &&
        contenidoGasto.descripcion
          .toLowerCase()
          .includes(objeto.descripcionContiene.toLowerCase());
    }
    if (objeto.etiquetasTiene) {
      let contieneEtiqueta = false;
      for (let etiqueta of contenidoGasto.etiquetas) {
        if (objeto.etiquetasTiene.indexOf(etiqueta) > -1) {
          contieneEtiqueta = true;
        }
      }
      filtrosRequeridos = filtrosRequeridos && contieneEtiqueta;
    }

    return filtrosRequeridos;
  });
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
  let gastoAgrupado = filtrarGastos({
    etiquetasTiene: etiquetas,
    fechaDesde: fechaDesde,
    fechaHasta: fechaHasta,
  });

  return gastoAgrupado.reduce((acumulador, gasto) => {
    let periodoNuevo = gasto.obtenerPeriodoAgrupacion(periodo);

    if (acumulador[periodoNuevo]) {
      acumulador[periodoNuevo] = acumulador[periodoNuevo] + gasto.valor;
    } else {
      acumulador[periodoNuevo] = gasto.valor;
    }
    return acumulador;
  }, {});
}

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
  filtrarGastos,
  agruparGastos,
};
