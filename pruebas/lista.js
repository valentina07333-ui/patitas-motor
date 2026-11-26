let assert = require('node:assert/strict');
let ListaEnlazada = require('../src/estructuras/ListaEnlazada');

function verificar(lista, cabezaDato, colaDato, tamanio) {
  let datoCabeza = lista.cabeza === null ? null : lista.cabeza.dato;
  let datoCola = lista.cola === null ? null : lista.cola.dato;

  assert.equal(datoCabeza, cabezaDato);
  assert.equal(datoCola, colaDato);
  assert.equal(lista.obtenerTamanio(), tamanio);
  assert.equal(lista.estaVacia(), tamanio === 0);
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

let eliminarCabeza = new ListaEnlazada();
eliminarCabeza.agregarAlFinal('A');
eliminarCabeza.agregarAlFinal('B');
assert.equal(eliminarCabeza.eliminar(function (dato) {
  return dato === 'A';
}), 'A');
verificar(eliminarCabeza, 'B', 'B', 1);

let eliminarCola = new ListaEnlazada();
eliminarCola.agregarAlFinal('A');
eliminarCola.agregarAlFinal('B');
assert.equal(eliminarCola.eliminar(function (dato) {
  return dato === 'B';
}), 'B');
verificar(eliminarCola, 'A', 'A', 1);
assert.equal(eliminarCola.cola.siguiente, null);

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

console.log('OK: inserciones, eliminaciones y casos borde de lista enlazada.');
