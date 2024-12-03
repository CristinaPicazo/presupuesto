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
      console.log("etiquetas", etiquetas);
      let gasto_etiquetas_etiqueta = document.createElement("span");
      gasto_etiquetas_etiqueta.textContent = etiquetas;
      gasto_etiquetas_etiqueta.setAttribute(
        "class",
        "gasto-etiquetas-etiqueta"
      );
      gasto_etiquetas.appendChild(gasto_etiquetas_etiqueta);
    });
    estrucuturaGasto.appendChild(gasto_etiquetas);
  });
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  let idHTML = document.getElementById(idElemento);

  let div_agrupacion = document.createElement("div");
  div_agrupacion.setAttribute("class", "agrupacion");
  idHTML.appendChild(div_agrupacion);

  let cabecera = document.createElement("h1");
  cabecera.textContent = `Gastos agrupados por ${periodo}`;
  div_agrupacion.appendChild(cabecera);

  Object.entries(agrup).map(([key, value]) => {
    let agrupacion_dato = document.createElement("div");
    agrupacion_dato.setAttribute("class", "agrupacion-dato");

    let agrupacion_dato_clave = document.createElement("div");
    agrupacion_dato_clave.setAttribute("class", "agrupacion-dato-clave");
    agrupacion_dato_clave.textContent = key;
    agrupacion_dato.appendChild(agrupacion_dato_clave);

    let agrupacion_dato_valor = document.createElement("div");
    agrupacion_dato_valor.setAttribute("class", "agrupacion-dato-valor");
    agrupacion_dato_valor.textContent = value.toFixed(2);
    agrupacion_dato.appendChild(agrupacion_dato_valor);

    div_agrupacion.appendChild(agrupacion_dato);
  });
}
export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb };
