import * as gestionPreWeb from "./gestionPresupuestoWeb.js";
import * as gestionPre from "./gestionPresupuesto.js";

gestionPre.actualizarPresupuesto(1500);
let presu = gestionPre.mostrarPresupuesto();
gestionPreWeb.mostrarDatoEnId("presupuesto", presu);

let gasto = new gestionPre.CrearGasto(
  "Compra carne",
  23.44,
  "2021-10-06",
  "casa",
  "comida"
);
gestionPre.anyadirGasto(gasto);

gasto = new gestionPre.CrearGasto(
  "Compra fruta y verdura",
  14.25,
  "2021-09-06",
  "supermercado",
  "comida"
);
gestionPre.anyadirGasto(gasto);

gasto = new gestionPre.CrearGasto("Bonobús", 18.6, "2020-05-26", "transporte");
gestionPre.anyadirGasto(gasto);

gasto = new gestionPre.CrearGasto(
  "Gasolina",
  60.42,
  "2021-10-08",
  "transporte",
  "gasolina"
);
gestionPre.anyadirGasto(gasto);

gasto = new gestionPre.CrearGasto(
  "Seguro hogar",
  206.45,
  "2021-09-26",
  "casa",
  "seguros"
);
gestionPre.anyadirGasto(gasto);

gasto = new gestionPre.CrearGasto(
  "Seguro coche",
  195.78,
  "2021-10-06",
  "transporte",
  "seguros"
);
gestionPre.anyadirGasto(gasto);

let calculoGastoTotal = gestionPre.calcularTotalGastos();
gestionPreWeb.mostrarDatoEnId("gastos-totales", calculoGastoTotal.toFixed(2));

let balance = gestionPre.calcularBalance();
gestionPreWeb.mostrarDatoEnId("balance-total", balance.toFixed(2));

let listaGastosCompleto = gestionPre.listarGastos();
gestionPreWeb.mostrarGastoWeb("listado-gastos-completo", listaGastosCompleto);

let desdeSep21 = new Date("2021-09-01").toISOString().substr(0, 10);
let hastaSep21 = new Date("2021-09-30").toISOString().substr(0, 10);
let gastosFiltrados = gestionPre.filtrarGastos({
  fechaDesde: desdeSep21,
  fechaHasta: hastaSep21,
});
gestionPreWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gastosFiltrados);

let gastos50 = gestionPre.filtrarGastos({ valorMinimo: 50 });
gestionPreWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gastos50);

let gastos200 = gestionPre.filtrarGastos({ valorMinimo: 200 });
gestionPreWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gastos200);

let gastosEtiquetas50 = gestionPre.filtrarGastos({
  valorMaximo: 50,
  etiquetasTiene: "comida,transporte",
});
gestionPreWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gastosEtiquetas50);

let agrupDia = gestionPre.agruparGastos("dia");
gestionPreWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupDia, "dia");

let agrupMes = gestionPre.agruparGastos("mes");
gestionPreWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupMes, "mes");

let agrupAnyo = gestionPre.agruparGastos("anyo");
gestionPreWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupAnyo, "anyo");
