import * as gestionPre from "./gestionPresupuesto.js"


let divTotalGasto = document.getElementById("totalGasto")
let divCreaFormulario = document.getElementById("creaFormulario")
let divLista = document.getElementById("lista")

let formulario = document.createElement("form")

let div = document.createElement("div")
div.classList.add("form-control")

let input = document.createElement("input")
input.setAttribute("name", "descripcion")
input.setAttribute("id", "descripcion")





// let aplicacion = document.getElementById("aplicacion")
// let presupuesto = document.getElementById("presupuesto")
// let gastos_totales = document.getElementById("gastos-totales")
// let balance_total = document.getElementById("balance-total")
// let listado_gastos_completo = document.getElementById("listado-gastos-completo")
// let listado_gastos_filtrado_1 = document.getElementById("listado-gastos-filtrado-1")
// let listado_gastos_filtrado_2 = document.getElementById("listado-gastos-filtrado-2")
// let listado_gastos_filtrado_3 = document.getElementById("listado-gastos-filtrado-3")
// let listado_gastos_filtrado_4 = document.getElementById("listado-gastos-filtrado-4")
// let agrupacion_dia = document.getElementById("agrupacion-dia")
// let agrupacion_mes = document.getElementById("agrupacion-mes")
// let agrupacion_anyo = document.getElementById("agrupacion-anyo")


function mostrarDatoEnId(idElemento, valor){
    // document.querySelector("#"${idElemento}).value(valor)
    document.getElementById(idElemento).value = parseInt(valor)
}
function mostrarGastoWeb(idElemento, gastos){
    document.getElementById(idElemento).value = parseInt(valor)

    let estrucutraGasto = document.createElement("div")
    estrucutraGasto.setAttribute("class", "gasto")

    let gasto_descripcion = document.createElement("div")
    gasto_descripcion.setAttribute("class", "gasto-descripcion")
    estrucutraGasto.appendChild(gasto_descripcion)
    
    let gasto_fecha = document.createElement("div")
    gasto_fecha.setAttribute("class", "gasto-fecha")
    estrucutraGasto.appendChild(gasto_fecha)
    
    let gasto_valor = document.createElement("div")
    gasto_valor.setAttribute("class", "gasto-valor")
    estrucutraGasto.appendChild(gasto_valor)
    
    let gasto_etiquetas = document.createElement("div")
    gasto_etiquetas.setAttribute("class", "gasto-etiquetas")
    
    valor.forEach(gasto => {
        let gasto_etiquetas_etiqueta = document.createElement("span").value = gasto.etiqueta
        gasto_etiquetas_etiqueta.setAttribute("class", "gasto-etiquetas-etiqueta")
        gasto_etiquetas.appendChild(gasto_etiquetas_etiqueta)
    });
    estrucutraGasto.appendChild(gasto_etiquetas)

}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let idHTML = document.getElementById(idElemento)

    let div_agrupacion = document.createElement("div")
    div_agrupacion.setAttribute("class","agrupacion")

    let cabecera = document.createElement("h1")
    cabecera.textContent = "Gastos agrupados por PERIODO"
    div_agrupacion.appendChild(cabecera)

    agrup.array.forEach(agrupacion => {
        let agrupacion_dato = document.createElement("div")
        agrupacion_dato.setAttribute("class","agrupacion-dato")
        
        let agrupacion_dato_clave = document.createElement("span")
        agrupacion_dato_clave.setAttribute("class","agrupacion-dato-clave")
        agrupacion_dato_clave = agrupacion.clave;
        agrupacion_dato.appendChild(agrupacion_dato_clave)
        
        let agrupacion_dato_valor = document.createElement("span")
        agrupacion_dato_valor.setAttribute("class","agrupacion-dato-valor")
        agrupacion_dato_valor = agrupacion.valor;
        agrupacion_dato.appendChild(agrupacion_dato_valor)

    });
    

}

// function agruparGastos(periodo){
//     let fecha = new Date()
// }

export {mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb}