let assert = require('node:assert/strict');
let ListaEnlazada = require('../src/estructuras/ListaEnlazada');

function verificar(lista, cabezaDato, colaDato, tamanio) {
  let datoCabeza = null;
  let datoCola = null;

  if (lista.cabeza !== null) {
    datoCabeza = lista.cabeza.dato;
  }
  if (lista.cola !== null) {
    datoCola = lista.cola.dato;
  }

  assert.equal(datoCabeza, cabezaDato);
  assert.equal(datoCola, colaDato);
  assert.equal(lista.obtenerTamanio(), tamanio);
  console.log('✓ cabeza=' + cabezaDato + ', cola=' + colaDato + ', tamaño=' + tamanio);
}

let inicioVacia = new ListaEnlazada();
inicioVacia.agregarAlInicio('A');
verificar(inicioVacia, 'A', 'A', 1);
assert.deepEqual(inicioVacia.aArreglo(), ['A']);

let finalVacia = new ListaEnlazada();
finalVacia.agregarAlFinal('A');
verificar(finalVacia, 'A', 'A', 1);
assert.deepEqual(finalVacia.aArreglo(), ['A']);

let inicioUnNodo = new ListaEnlazada();
inicioUnNodo.agregarAlFinal('A');
inicioUnNodo.agregarAlInicio('nuevo');
verificar(inicioUnNodo, 'nuevo', 'A', 2);
assert.deepEqual(inicioUnNodo.aArreglo(), ['nuevo', 'A']);

let finalUnNodo = new ListaEnlazada();
finalUnNodo.agregarAlFinal('A');
finalUnNodo.agregarAlFinal('nuevo');
verificar(finalUnNodo, 'A', 'nuevo', 2);
assert.deepEqual(finalUnNodo.aArreglo(), ['A', 'nuevo']);

let inicioVarios = new ListaEnlazada();
inicioVarios.agregarAlFinal('A');
inicioVarios.agregarAlFinal('B');
inicioVarios.agregarAlFinal('C');
inicioVarios.agregarAlInicio('nuevo');
verificar(inicioVarios, 'nuevo', 'C', 4);
assert.deepEqual(inicioVarios.aArreglo(), ['nuevo', 'A', 'B', 'C']);

let finalVarios = new ListaEnlazada();
finalVarios.agregarAlFinal('A');
finalVarios.agregarAlFinal('B');
finalVarios.agregarAlFinal('C');
finalVarios.agregarAlFinal('nuevo');
verificar(finalVarios, 'A', 'nuevo', 4);
assert.deepEqual(finalVarios.aArreglo(), ['A', 'B', 'C', 'nuevo']);

let eliminarVacia = new ListaEnlazada();
assert.equal(eliminarVacia.eliminar(function (dato) {
  return dato === 'A';
}), null);
verificar(eliminarVacia, null, null, 0);
assert.deepEqual(eliminarVacia.aArreglo(), []);

let eliminarUnico = new ListaEnlazada();
eliminarUnico.agregarAlFinal('A');
assert.equal(eliminarUnico.eliminar(function (dato) {
  return dato === 'A';
}), 'A');
verificar(eliminarUnico, null, null, 0);
assert.equal(eliminarUnico.cola, null);
assert.deepEqual(eliminarUnico.aArreglo(), []);

let eliminarCabeza = new ListaEnlazada();
eliminarCabeza.agregarAlFinal('A');
eliminarCabeza.agregarAlFinal('B');
assert.equal(eliminarCabeza.eliminar(function (dato) {
  return dato === 'A';
}), 'A');
verificar(eliminarCabeza, 'B', 'B', 1);
assert.deepEqual(eliminarCabeza.aArreglo(), ['B']);

let eliminarCola = new ListaEnlazada();
eliminarCola.agregarAlFinal('A');
eliminarCola.agregarAlFinal('B');
assert.equal(eliminarCola.eliminar(function (dato) {
  return dato === 'B';
}), 'B');
verificar(eliminarCola, 'A', 'A', 1);
assert.equal(eliminarCola.cola.siguiente, null);
assert.deepEqual(eliminarCola.aArreglo(), ['A']);

let eliminarInexistente = new ListaEnlazada();
eliminarInexistente.agregarAlFinal('A');
assert.equal(eliminarInexistente.eliminar(function (dato) {
  return dato === 'Z';
}), null);
verificar(eliminarInexistente, 'A', 'A', 1);
assert.deepEqual(eliminarInexistente.aArreglo(), ['A']);

let insertarTrasCola = new ListaEnlazada();
insertarTrasCola.agregarAlFinal('A');
insertarTrasCola.agregarAlFinal('B');
assert.equal(insertarTrasCola.insertarDespuesDe(function (dato) {
  return dato === 'B';
}, 'C'), true);
verificar(insertarTrasCola, 'A', 'C', 3);
assert.deepEqual(insertarTrasCola.aArreglo(), ['A', 'B', 'C']);

console.log('Los doce casos pasaron.');
