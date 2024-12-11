import * as gestionPre from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
  document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gastos) {
  gastos.forEach((gasto) => {
    let divIdElemento = document.getElementById(idElemento);

    let estrucuturaGasto = document.createElement("div");
    estrucuturaGasto.setAttribute("class", "gasto");
    divIdElemento.appendChild(estrucuturaGasto);

    let gasto_descripcion = document.createElement("div");
    gasto_descripcion.setAttribute("class", "gasto-descripcion");
    gasto_descripcion.textContent = gasto.descripcion;
    estrucuturaGasto.appendChild(gasto_descripcion);

    let gasto_fecha = document.createElement("div");
    gasto_fecha.setAttribute("class", "gasto-fecha");
    gasto_fecha.textContent = new Date(gasto.fecha)
      .toLocaleString()
      .substring(0, 9);
    estrucuturaGasto.appendChild(gasto_fecha);

    let gasto_valor = document.createElement("div");
    gasto_valor.setAttribute("class", "gasto-valor");
    gasto_valor.textContent = gasto.valor;
    estrucuturaGasto.appendChild(gasto_valor);

    let gasto_etiquetas = document.createElement("div");
    gasto_etiquetas.setAttribute("class", "gasto-etiquetas");
    gasto.etiquetas.forEach((etiquetas) => {
      let gasto_etiquetas_etiqueta = document.createElement("span");
      gasto_etiquetas_etiqueta.textContent = etiquetas;
      gasto_etiquetas_etiqueta.setAttribute(
        "class",
        "gasto-etiquetas-etiqueta"
      );
      let handleEtiqueta = Object.create(BorrarEtiquetasHandle);
      handleEtiqueta.gasto = gasto;
      handleEtiqueta.etiqueta = etiquetas;
      gasto_etiquetas_etiqueta.addEventListener("click", handleEtiqueta);
      gasto_etiquetas.appendChild(gasto_etiquetas_etiqueta);
    });
    estrucuturaGasto.appendChild(gasto_etiquetas);
    
    let botonEditar = document.createElement("button");
    botonEditar.setAttribute("class", "gasto-editar");
    botonEditar.setAttribute("type", "button");
    let handleEditar = Object.create(EditarHandle);
    handleEditar.gasto = gasto;
    botonEditar.addEventListener("click", handleEditar);
    botonEditar.innerHTML = "Editar";
    estrucuturaGasto.appendChild(botonEditar);
    
    let botonBorrar = document.createElement("button");
    botonBorrar.setAttribute("type", "button");
    botonBorrar.setAttribute("class", "gasto-borrar");
    let handleBorrar = Object.create(BorrarHandle);
    handleBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", handleBorrar);
    botonBorrar.innerHTML = "Borrar";
    estrucuturaGasto.appendChild(botonBorrar);
  });
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  let periodoH1 = periodo;
  if (periodo == "dia") {
    periodoH1 = "día";
  }
  if (periodo == "anyo") {
    periodoH1 = "año";
  }
  let idHTML = document.getElementById(idElemento);

  let div_agrupacion = document.createElement("div");
  div_agrupacion.setAttribute("class", "agrupacion");
  idHTML.appendChild(div_agrupacion);

  let cabecera = document.createElement("h1");
  cabecera.textContent = `Gastos agrupados por ${periodoH1}`;
  div_agrupacion.appendChild(cabecera);

  Object.entries(agrup).map(([key, value]) => {
    let agrupacion_dato = document.createElement("div");
    agrupacion_dato.setAttribute("class", "agrupacion-dato");

    let agrupacion_dato_clave = document.createElement("span");
    agrupacion_dato_clave.setAttribute("class", "agrupacion-dato-clave");
    agrupacion_dato_clave.textContent = key;
    agrupacion_dato.appendChild(agrupacion_dato_clave);

    let agrupacion_dato_valor = document.createElement("span");
    agrupacion_dato_valor.setAttribute("class", "agrupacion-dato-valor");
    agrupacion_dato_valor.textContent = value.toFixed(2);
    agrupacion_dato.appendChild(agrupacion_dato_valor);

    div_agrupacion.appendChild(agrupacion_dato);
  });
}

// Crear una función repintar para actualizar la página
function repintar() {
  mostrarDatoEnId("presupuesto", gestionPre.mostrarPresupuesto());
  mostrarDatoEnId(
    "gastos-totales",
    gestionPre.calcularTotalGastos().toFixed(2)
  );
  mostrarDatoEnId("balance-total", gestionPre.calcularBalance().toFixed(2));
  document.getElementById("listado-gastos-completo").innerHTML = "";
  mostrarGastoWeb("listado-gastos-completo", gestionPre.listarGastos());
}

document
  .getElementById("actualizarpresupuesto")
  .addEventListener("click", actualizarPresupuestoWeb);

function actualizarPresupuestoWeb() {
  let presupuesto = prompt("Introduce un presupuesto:");
  presupuesto = parseInt(presupuesto);
  gestionPre.actualizarPresupuesto(presupuesto);
  repintar();
}

document
  .getElementById("anyadirgasto")
  .addEventListener("click", nuevoGastoWeb);

// Función nuevoGastoWeb y botón anyadirgasto
function nuevoGastoWeb() {
  let descripcion = prompt("Introduce una descripción:");
  let valor = prompt("Introduce un valor:");
  valor = parseFloat(valor);
  let fecha = prompt("Introduce una fecha (yyyy-mm-dd):");
  let etiquetas = prompt("Introduce unas etiquetas (separado por comas):");
  etiquetas = etiquetas.split(",");

  let gasto = new gestionPre.CrearGasto(
    descripcion,
    valor,
    fecha,
    ...etiquetas
  );
  gestionPre.anyadirGasto(gasto);
  repintar();
}

// Función EditarHandle
let EditarHandle = {
  handleEvent: function () {
    let descripcion = prompt("Introduce una descripción:");
    let valor = prompt("Introduce un valor:");
    valor = parseFloat(valor);
    let fecha = prompt("Introduce una fecha (yyyy-mm-dd):");
    let etiquetas = prompt("Introduce unas etiquetas (separado por comas):");
    etiquetas = etiquetas.split(",");

    this.gasto.actualizarValor(valor);
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);

    repintar();
  },
};

// Función BorrarHandle
let BorrarHandle = {
  handleEvent: function () {
    gestionPre.borrarGasto(this.gasto.id);
    repintar();
  },
};

// Función BorrarEtiquetasHandle
let BorrarEtiquetasHandle = {
  handleEvent: function () {
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
  },
};


// -------------------------------------------------
// Modificación de la función mostrarGastoWeb


export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb };
