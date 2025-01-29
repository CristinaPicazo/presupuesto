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

    // Nuevo boton para borrar de la aplicacion
    let botonBorrarAPI = document.createElement("button");
    botonBorrarAPI.setAttribute("type", "button");
    botonBorrarAPI.setAttribute("class", "gasto-borrar-api");
    let handleBorrarAPI = Object.create(BorrarHandleAPI);
    handleBorrarAPI.gasto = gasto;
    botonBorrarAPI.addEventListener("click", handleBorrarAPI);
    botonBorrarAPI.innerHTML = "Borrar (API)";
    estrucuturaGasto.appendChild(botonBorrarAPI);

    let botonEditarFormulario = document.createElement("button");
    botonEditarFormulario.setAttribute("type", "button");
    botonEditarFormulario.setAttribute("class", "gasto-editar-formulario");
    let handleEditarFormulario = Object.create(EditarHandleFormulario);
    handleEditarFormulario.gasto = gasto;
    botonEditarFormulario.addEventListener("click", handleEditarFormulario);
    botonEditarFormulario.innerHTML = "Editar (formulario)";
    estrucuturaGasto.appendChild(botonEditarFormulario);
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
  // Si no tiene gastos lo limpiamos todo
  console.log("gestionPre.listarGastos()", gestionPre.listarGastos());
  if (gestionPre.listarGastos() == "") {
    document.getElementById("listado-gastos-completo").innerHTML = "";
    document.getElementById("listado-gastos-filtrado-1").innerHTML = "";
    document.getElementById("listado-gastos-filtrado-2").innerHTML = "";
    document.getElementById("listado-gastos-filtrado-3").innerHTML = "";
    document.getElementById("listado-gastos-filtrado-4").innerHTML = "";
    document.getElementById("agrupacion-dia").innerHTML = "";
    document.getElementById("agrupacion-mes").innerHTML = "";
    document.getElementById("agrupacion-anyo").innerHTML = "";
  }

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

// funcion añadir gasto a traves del fomulario template
function nuevoGastoWebFormulario(evento) {
  console.log("evento 220", evento);
  // copia del formulario y lo añade a la pagina
  let plantillaFormulario = document
    .getElementById("formulario-template")
    .content.cloneNode(true);
  document
    .getElementById("controlesprincipales")
    .appendChild(plantillaFormulario);

  // desactivamos el botón para añadir más
  document.getElementById("anyadirgasto-formulario").disabled = true;

  let formulario = document.querySelector("form");

  // enviar el gasto a localstoreage
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    document.getElementById("anyadirgasto-formulario").disabled = false;

    // obtenemos los datos nuevos
    let descripcion = evento.target.elements.descripcion.value;
    let valor = parseFloat(evento.target.elements.valor.value);
    let fecha = evento.target.elements.fecha.value;
    let etiquetas = evento.target.elements.etiquetas.value.split(" ");

    let nuevoGasto = new gestionPre.CrearGasto(
      descripcion,
      valor,
      fecha,
      ...etiquetas
    );

    gestionPre.anyadirGasto(nuevoGasto);
    repintar();

    // volvemos a hacer accesible boton para añadir y quitamos el fomulario
    document.getElementById("anyadirgasto-formulario").disabled = false;
    document.getElementById("controlesprincipales").removeChild(formulario);
  });

  // seleccionamos cancelar y añadimos un listener
  let botonCancelar = formulario.querySelector("button.cancelar");

  let manejadorCancelar = new CancelarHandleFormulario(
    formulario,
    document.getElementById("anyadirgasto-formulario")
  );
  botonCancelar.addEventListener("click", manejadorCancelar);

  // boton Enviar (API) para nuevos gastos en la aplicacion
  document
    .querySelector(".gasto-enviar-api")
    .addEventListener("click", (evento) => {
      evento.preventDefault();

      // obtenemos los datos
      let descripcion = document.querySelector("#descripcion").value;
      let valor = parseFloat(document.querySelector("#valor").value);
      let fecha = document.querySelector("#fecha").value;
      let etiquetas = document.querySelector("#etiquetas").value.split(" ");

      let nuevoGasto = new gestionPre.CrearGasto(
        descripcion,
        valor,
        fecha,
        ...etiquetas
      );

      let gastoId = Math.floor(Math.random() * 1000000);
      nuevoGasto.gastoId = gastoId;

      // se envian los datos
      fetch(`${aplicacion}/${usuario}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoGasto),
      })
        .then(() => cargarGastosApi())
        .catch((err) => console.log("Error: ", err));

      document.getElementById("anyadirgasto-formulario").disabled = false;
      document.getElementById("controlesprincipales").removeChild(formulario);
    });
}

function CancelarHandleFormulario(formulario, botonAnyadir) {
  this.formulario = formulario;
  this.botonAnyadir = botonAnyadir;

  this.handleEvent = function () {
    this.formulario.parentNode.removeChild(this.formulario);

    this.botonAnyadir.disabled = false;
  };
}

document
  .getElementById("anyadirgasto-formulario")
  .addEventListener("click", (event) => {
    event.preventDefault();
    nuevoGastoWebFormulario(event);
  });

let EditarHandleFormulario = {
  handleEvent: function (evento) {
    // copia del formulario y lo añade a la pagina en cada botón
    let plantillaFormulario = document
      .getElementById("formulario-template")
      .content.cloneNode(true);

    // añadimos la copia del furmulario
    evento.target.parentElement.appendChild(plantillaFormulario);

    // bloqueamos el boton editar (formulario)
    let botonAnadir = evento.target;
    botonAnadir.disabled = true;

    // obtenemos los valores del gasto para ponerlos en el input del formulario
    document.querySelector("#descripcion").value = this.gasto.descripcion;
    document.querySelector("#valor").value = this.gasto.valor;
    document.querySelector("#etiquetas").value = this.gasto.etiquetas;
    // convertimos la fecha
    let dia = new Date(this.gasto.fecha).getDay();
    let mes = new Date(this.gasto.fecha).getMonth();
    let anyo = new Date(this.gasto.fecha).getFullYear();
    if (dia < 10) {
      dia = "0" + dia;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }
    let fecha = `${anyo}-${mes}-${dia}`;
    document.querySelector("#fecha").value = fecha;

    // obtenemos el formulario para ver sus valores
    let formulario = document.querySelector(".gasto form");

    // boton enviar dentro del formulario en cada gasto
    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();
      document.getElementById("anyadirgasto-formulario").disabled = false;

      // obtenemos los valores del formulario por si se han modificado
      this.gasto.actualizarDescripcion(formulario.descripcion.value);
      this.gasto.actualizarFecha(formulario.fecha.value);
      this.gasto.actualizarValor(parseFloat(formulario.valor.value));
      // pintamos de nuevo la pagina
      repintar();
    });

    // al pinchar cancelar
    let botonCancelar = formulario.querySelector("button.cancelar");

    botonCancelar.addEventListener("click", (evento) => {
      evento.preventDefault();
      botonAnadir.disabled = false;
      formulario.parentElement.removeChild(formulario);
    });

    // nuevo botón para enviar el gasto a la aplicacion enviar (API) dentro del editar (formulario)
    let gastoEnviarAPI = formulario.querySelector(".gasto-enviar-api");
    gastoEnviarAPI.addEventListener("click", (evento) => {
      evento.preventDefault();

      let descripcion = document.querySelector("#descripcion").value;
      let valor = parseFloat(document.querySelector("#valor").value);
      let fecha = document.querySelector("#fecha").value;
      let etiquetas = document.querySelector("#etiquetas").value.split(" ");

      let nuevoGasto = new gestionPre.CrearGasto(
        descripcion,
        valor,
        fecha,
        ...etiquetas
      );

      // metodo put para enviar o actualizar a la api a traves del id
      fetch(`${aplicacion}/${usuario}/${this.gasto.gastoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoGasto),
      })
        .then(() => cargarGastosApi())
        .catch((err) => console.log("Se ha producido el error: ", err));
    });
  },
};

// let filtrarGastosWeb = {
//   handleEvent: function (evento) {
//     evento.preventDefault();
//     document.getElementById("formulario-filtrado");
//   },
// };
function filtrarGastosWeb(evento) {
  let formulario = evento.target;
  let prueba = {};

  // Datos del formulario
  let descripcionContiene = formulario.querySelector(
    "#formulario-filtrado-descripcion"
  ).value;
  if (descripcionContiene > 0) {
    prueba = prueba.descripcionContiene = descripcionContiene;
  }

  let valorMinimo = parseFloat(
    formulario.querySelector("#formulario-filtrado-valor-minimo").value
  );
  let valorMaximo = parseFloat(
    formulario.querySelector("#formulario-filtrado-valor-maximo").value
  );
  let fechaDesde = formulario.querySelector(
    "#formulario-filtrado-fecha-desde"
  ).value;
  let fechaHasta = formulario.querySelector(
    "#formulario-filtrado-fecha-hasta"
  ).value;
  let etiquetasTiene = formulario.querySelector(
    "#formulario-filtrado-etiquetas-tiene"
  ).value;

  // Si tiene etiquetas se llama a transformarListadoEtiquetas
  if (etiquetasTiene.length > 0) {
    etiquetasTiene = gestionPre.transformarListadoEtiquetas(etiquetasTiene);
  }

  if (fechaHasta.length > 0) {
    prueba.push;
  }
  // Creamos el gasto para filtrarlo
  let gastoAgrupado = {
    fechaDesde,
    fechaHasta,
    valorMinimo,
    valorMaximo,
    descripcionContiene,
    etiquetasTiene,
  };

  // Filtramos el gasto con el objeto creado
  let gastosFiltrados = gestionPre.filtrarGastos(gastoAgrupado);

  // Vaciamos los gastos
  document.getElementById("listado-gastos-completo").innerHTML = "";

  // Actulizamos la lista de gastos
  mostrarGastoWeb("listado-gastos-completo", gastosFiltrados);
}

document
  .getElementById("formulario-filtrado")
  .addEventListener("submit", (evento) => {
    evento.preventDefault();
    filtrarGastosWeb(evento);
  });

function guardarGastosWeb() {
  // Obtiene todos los gastos
  let gastos = gestionPre.listarGastos();

  // Los convierte a JSON para poder almacenarlos
  let GestorGastosDWEC = JSON.stringify(gastos);

  // Los envía al localStorage
  localStorage.setItem("GestorGastosDWEC", GestorGastosDWEC);
}
document
  .getElementById("guardar-gastos")
  .addEventListener("click", (evento) => {
    evento.preventDefault();
    guardarGastosWeb();
  });

function cargarGastosWeb() {
  // Recupera los datos del localstoreage y los convierte
  let GestorGastosDWEC = JSON.parse(localStorage.getItem("GestorGastosDWEC"));

  // En caso de que este vacío
  if (GestorGastosDWEC == null) {
    let gastosVacio = new Array();
    gestionPre.cargarGastos(gastosVacio);
  } else {
    gestionPre.cargarGastos(GestorGastosDWEC);
  }
  repintar();
}
document.getElementById("cargar-gastos").addEventListener("click", (evento) => {
  evento.preventDefault();
  cargarGastosWeb();
});

// Obtenemos el nombre de usuario para hacer la carga
const aplicacion =
  "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest";
  // obtenemos el usuario
  let usuario = document.getElementById("nombre_usuario").value;

// Cargar gastos desde la aplicacion
function cargarGastosApi() {
// obtenemos el usuario introducido
let usuario = document.getElementById("nombre_usuario").value;

fetch(`${aplicacion}/${usuario}`)
    .then((response) => response.json())
    .then((gastosAPI) => gestionPre.cargarGastos(gastosAPI))
    .then(() => repintar())
    .catch((error) => alert("Se ha producido un error: ", error));
}

document
  .getElementById("cargar-gastos-api")
  .addEventListener("click", (evento) => {
    evento.preventDefault();
    cargarGastosApi();
  });

// Función BorrarHandle desde la API
let BorrarHandleAPI = {
  handleEvent: function () {
    fetch(`${aplicacion}/${usuario}/${this.gasto.gastoId}`, {
      method: "DELETE",
    }).then(() => cargarGastosApi());
  },
};

export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb };
