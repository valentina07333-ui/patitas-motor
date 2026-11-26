let assert = require('node:assert/strict');
let Nodo = require('../src/estructuras/Nodo');
let ListaEnlazada = require('../src/estructuras/ListaEnlazada');
let Cola = require('../src/estructuras/Cola');
let Pila = require('../src/estructuras/Pila');
let RegistroClinico = require('../src/dominio/RegistroClinico');
let Recepcion = require('../src/dominio/Recepcion');
let Editor = require('../src/dominio/Editor');
let catalogoModulo = require('../src/catalogo');

let fallas = 0;

function probar(nombre, prueba) {
  try {
    prueba();
    console.log('OK - ' + nombre);
  } catch (error) {
    fallas++;
    console.error('FALLA - ' + nombre + ': ' + error.message);
  }
}

probar('Nodo: dato y enlace inicial', function () {
  let nodo = new Nodo('A');
  assert.equal(nodo.dato, 'A');
  assert.equal(nodo.siguiente, null);
});

probar('Lista enlazada: operaciones y lista vacía', function () {
  let lista = new ListaEnlazada();
  assert.equal(lista.buscar(function () { return true; }), null);
  assert.equal(lista.eliminar(function () { return true; }), null);
  assert.equal(lista.insertarDespuesDe(function () { return true; }, 'X'), false);
  lista.agregarAlFinal({ costo: 10 });
  lista.agregarAlFinal({ costo: 20 });
  lista.agregarAlInicio({ costo: 5 });
  assert.equal(lista.obtenerTamanio(), 3);
  assert.equal(lista.cabeza.dato.costo, 5);
  assert.equal(lista.cola.dato.costo, 20);
  assert.equal(lista.tamanioRecursivo(), 3);
  assert.equal(lista.costoTotalRecursivo(), 35);
  assert.equal(lista.buscar(function (dato) { return dato.costo === 20; }).costo, 20);
  assert.equal(lista.insertarDespuesDe(function (dato) {
    return dato.costo === 20;
  }, { costo: 30 }), true);
  assert.equal(lista.cola.dato.costo, 30);
  assert.equal(lista.eliminar(function (dato) { return dato.costo === 5; }).costo, 5);
  assert.equal(lista.eliminar(function (dato) { return dato.costo === 30; }).costo, 30);
  assert.deepEqual(lista.aArreglo(), [{ costo: 10 }, { costo: 20 }]);
  assert.equal(lista.eliminar(function () { return true; }).costo, 10);
  assert.equal(lista.eliminar(function () { return true; }).costo, 20);
  assert.equal(lista.cabeza, null);
  assert.equal(lista.cola, null);
});

probar('Cola FIFO: encolar, desencolar y cola vacía', function () {
  let cola = new Cola();
  assert.equal(cola.desencolar(), null);
  cola.encolar('Único');
  assert.equal(cola.desencolar(), 'Único');
  assert.equal(cola.frente, null);
  assert.equal(cola.final, null);
  cola.encolar('A');
  cola.encolar('B');
  assert.equal(cola.verFrente(), 'A');
  assert.equal(cola.tamanio(), 2);
  assert.equal(cola.desencolar(), 'A');
  assert.equal(cola.desencolar(), 'B');
  assert.equal(cola.estaVacia(), true);
  assert.equal(cola.tamanio(), 0);
});

probar('Pila LIFO: apilar, desapilar y pila vacía', function () {
  let pila = new Pila();
  assert.equal(pila.desapilar(), null);
  pila.apilar('A');
  pila.apilar('B');
  assert.equal(pila.verTope(), 'B');
  assert.equal(pila.desapilar(), 'B');
  assert.equal(pila.desapilar(), 'A');
  assert.equal(pila.estaVacia(), true);
});

probar('Map clínico: historial inexistente y registro', function () {
  let registro = new RegistroClinico();
  assert.equal(registro.obtenerHistorial('Lola'), null);
  registro.registrarAtencion('Lola', { motivo: 'Control', costo: 5 });
  assert.equal(registro.obtenerHistorial('Lola').obtenerTamanio(), 1);
});

probar('Recepción: sala vacía y prioridad de urgencia', function () {
  let recepcion = new Recepcion();
  let mensajes = [];
  let registrarMensaje = console.log;
  console.log = function (mensaje) {
    mensajes.push(mensaje);
  };
  let turnoVacio;
  try {
    turnoVacio = recepcion.llamarSiguiente();
  } finally {
    console.log = registrarMensaje;
  }
  assert.equal(turnoVacio, null);
  assert.equal(mensajes.length, 1);
  recepcion.registrarLlegada({ mascota: 'General', tipo: 'General' });
  recepcion.registrarLlegada({ mascota: 'Urgencia', tipo: 'Urgencia' });
  assert.equal(recepcion.llamarSiguiente().mascota, 'Urgencia');
  assert.equal(recepcion.llamarSiguiente().mascota, 'General');
});

probar('Editor: agregar, eliminar, deshacer y rehacer', function () {
  let editor = new Editor();
  let atencion = { id: 'A' };
  assert.equal(editor.deshacer(), false);
  assert.equal(editor.rehacer(), false);
  editor.agregar('Lola', atencion);
  assert.equal(editor.registro.obtenerHistorial('Lola').obtenerTamanio(), 1);
  assert.equal(editor.deshacer(), true);
  assert.equal(editor.registro.obtenerHistorial('Lola').obtenerTamanio(), 0);
  assert.equal(editor.rehacer(), true);
  assert.equal(editor.eliminar('Lola', function (dato) {
    return dato === atencion;
  }), atencion);
  assert.equal(editor.registro.obtenerHistorial('Lola').obtenerTamanio(), 0);
});

probar('Catálogo recursivo: resultados y categoría vacía', function () {
  assert.equal(catalogoModulo.contarServicios(catalogoModulo.catalogo), 10);
  assert.equal(catalogoModulo.profundidad(catalogoModulo.catalogo), 4);
  assert.equal(catalogoModulo.buscarServicio(catalogoModulo.catalogo, 'Gata').precio, 280000);
  assert.equal(catalogoModulo.buscarServicio(catalogoModulo.catalogo, 'Peluquería'), null);
  assert.equal(
    catalogoModulo.contarServicios({ nombre: 'Vacía', servicios: [], subcategorias: [] }),
    0,
  );
});

if (fallas > 0) {
  process.exitCode = 1;
}
