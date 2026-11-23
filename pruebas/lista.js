const assert = require('node:assert/strict');
const ListaEnlazada = require('../src/ListaEnlazada');

function verificar(lista, cabezaDato, colaDato, tamanio) {
  assert.equal(lista.cabeza?.dato ?? null, cabezaDato);
  assert.equal(lista.cola?.dato ?? null, colaDato);
  assert.equal(lista.obtenerTamanio(), tamanio);
  console.log(`✓ cabeza=${cabezaDato}, cola=${colaDato}, tamaño=${tamanio}`);
}

// 1. Agregar al inicio de una lista vacía.
const inicioVacia = new ListaEnlazada();
inicioVacia.agregarAlInicio('A');
verificar(inicioVacia, 'A', 'A', 1);
assert.deepEqual(inicioVacia.aArreglo(), ['A']);

// 2. Agregar al final de una lista vacía.
const finalVacia = new ListaEnlazada();
finalVacia.agregarAlFinal('A');
verificar(finalVacia, 'A', 'A', 1);
assert.deepEqual(finalVacia.aArreglo(), ['A']);

// 3. Agregar al inicio cuando ya hay un nodo.
const inicioUnNodo = new ListaEnlazada();
inicioUnNodo.agregarAlFinal('A');
inicioUnNodo.agregarAlInicio('nuevo');
verificar(inicioUnNodo, 'nuevo', 'A', 2);
assert.deepEqual(inicioUnNodo.aArreglo(), ['nuevo', 'A']);

// 4. Agregar al final cuando ya hay un nodo.
const finalUnNodo = new ListaEnlazada();
finalUnNodo.agregarAlFinal('A');
finalUnNodo.agregarAlFinal('nuevo');
verificar(finalUnNodo, 'A', 'nuevo', 2);
assert.deepEqual(finalUnNodo.aArreglo(), ['A', 'nuevo']);

// 5. Agregar al inicio cuando hay varios nodos.
const inicioVarios = new ListaEnlazada();
inicioVarios.agregarAlFinal('A');
inicioVarios.agregarAlFinal('B');
inicioVarios.agregarAlFinal('C');
inicioVarios.agregarAlInicio('nuevo');
verificar(inicioVarios, 'nuevo', 'C', 4);
assert.deepEqual(inicioVarios.aArreglo(), ['nuevo', 'A', 'B', 'C']);

// 6. Agregar al final cuando hay varios nodos.
const finalVarios = new ListaEnlazada();
finalVarios.agregarAlFinal('A');
finalVarios.agregarAlFinal('B');
finalVarios.agregarAlFinal('C');
finalVarios.agregarAlFinal('nuevo');
verificar(finalVarios, 'A', 'nuevo', 4);
assert.deepEqual(finalVarios.aArreglo(), ['A', 'B', 'C', 'nuevo']);

// 7. Eliminar en una lista vacía.
const eliminarVacia = new ListaEnlazada();
assert.equal(eliminarVacia.eliminar((dato) => dato === 'A'), null);
verificar(eliminarVacia, null, null, 0);
assert.deepEqual(eliminarVacia.aArreglo(), []);

// 8. Eliminar el único nodo.
const eliminarUnico = new ListaEnlazada();
eliminarUnico.agregarAlFinal('A');
assert.equal(eliminarUnico.eliminar((dato) => dato === 'A'), 'A');
verificar(eliminarUnico, null, null, 0);
assert.equal(eliminarUnico.cola, null);
assert.deepEqual(eliminarUnico.aArreglo(), []);

// 9. Eliminar la cabeza.
const eliminarCabeza = new ListaEnlazada();
eliminarCabeza.agregarAlFinal('A');
eliminarCabeza.agregarAlFinal('B');
assert.equal(eliminarCabeza.eliminar((dato) => dato === 'A'), 'A');
verificar(eliminarCabeza, 'B', 'B', 1);
assert.deepEqual(eliminarCabeza.aArreglo(), ['B']);

// 10. Eliminar la cola.
const eliminarCola = new ListaEnlazada();
eliminarCola.agregarAlFinal('A');
eliminarCola.agregarAlFinal('B');
assert.equal(eliminarCola.eliminar((dato) => dato === 'B'), 'B');
verificar(eliminarCola, 'A', 'A', 1);
assert.equal(eliminarCola.cola.siguiente, null);
assert.deepEqual(eliminarCola.aArreglo(), ['A']);

// 11. Intentar eliminar un dato que no existe.
const eliminarInexistente = new ListaEnlazada();
eliminarInexistente.agregarAlFinal('A');
assert.equal(eliminarInexistente.eliminar((dato) => dato === 'Z'), null);
verificar(eliminarInexistente, 'A', 'A', 1);
assert.deepEqual(eliminarInexistente.aArreglo(), ['A']);

// 12. Insertar después de la cola.
const insertarTrasCola = new ListaEnlazada();
insertarTrasCola.agregarAlFinal('A');
insertarTrasCola.agregarAlFinal('B');
assert.equal(insertarTrasCola.insertarDespuesDe((dato) => dato === 'B', 'C'), true);
verificar(insertarTrasCola, 'A', 'C', 3);
assert.deepEqual(insertarTrasCola.aArreglo(), ['A', 'B', 'C']);

console.log('Los doce casos pasaron.');
