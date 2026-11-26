let catalogoModulo = require('./src/catalogo');
let Editor = require('./src/dominio/Editor');
let simularManana = require('./src/simulacion');
let formatoCosto = new Intl.NumberFormat('es-CO');

console.log('1. Catálogo de servicios');
catalogoModulo.listarCatalogo(catalogoModulo.catalogo);

console.log('\n2. Simulación de la mañana con urgencias');
let resultado = simularManana(false);
for (let indice = 0; indice < resultado.reporteAtencion.length; indice++) {
  let atencion = resultado.reporteAtencion[indice];
  console.log(
    (indice + 1) + '. ' + atencion.mascota + ' (' + atencion.tipo + ')' +
    ' | llegó ' + atencion.horaLlegada +
    ' | atención ' + atencion.horaAtencion +
    ' | espera ' + atencion.esperaMinutos + ' min' +
    ' | ' + atencion.motivo,
  );
}
for (let tipo of Object.keys(resultado.esperas)) {
  let datos = resultado.esperas[tipo];
  let nombre = tipo === 'Urgencia' ? 'urgencias' : 'consultas generales';
  let promedio = datos.cantidad === 0 ? 0 : datos.total / datos.cantidad;
  console.log('Espera promedio de ' + nombre + ': ' + promedio.toFixed(2) + ' minutos');
}

console.log('\n3. Corrección con deshacer y rehacer');
let editorDemostracion = new Editor();
let atencionToby = {
  horaAtencion: '08:00',
  motivo: 'Control de vacunas',
  tipo: 'General',
  esperaMinutos: 0,
};
editorDemostracion.agregar('Max', atencionToby);
console.log('Registro equivocado en Max.');
editorDemostracion.deshacer();
console.log('Deshacer: el registro equivocado fue retirado.');
editorDemostracion.rehacer();
console.log('Rehacer: se confirma que el cambio puede recuperarse.');
editorDemostracion.deshacer();
editorDemostracion.agregar('Toby', atencionToby);
console.log('Corrección final: atención registrada en Toby.');

console.log('\n4. Historiales finales de la simulación');
resultado.editor.registro.historiales.forEach(function (historial, mascota) {
  console.log(mascota + ' (' + historial.obtenerTamanio() + ' atenciones):');
  historial.recorrer(function (atencion) {
    console.log(
      '  ' + atencion.horaAtencion + ' | ' + atencion.motivo +
      ' | ' + atencion.tipo + ' | espera ' + atencion.esperaMinutos + ' min',
    );
  });
});

console.log('\n5. Búsqueda de servicio y paquete');
let servicio = catalogoModulo.buscarServicio(catalogoModulo.catalogo, 'Gata');
let ruta = catalogoModulo.rutaDeServicio(catalogoModulo.catalogo, 'Gata');
let cirugias = catalogoModulo.catalogo.subcategorias.find(function (categoria) {
  return categoria.nombre === 'Cirugías';
});
console.log('Servicio: ' + servicio.nombre + ' - $' + formatoCosto.format(servicio.precio));
console.log('Ruta: ' + ruta.join(' > '));
console.log('Paquete Cirugías con descuento: $' +
  formatoCosto.format(catalogoModulo.precioPaquete(cirugias)));
