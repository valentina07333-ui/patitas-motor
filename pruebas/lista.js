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

// 2. Agregar al final de una lista vacía.
const finalVacia = new ListaEnlazada();
finalVacia.agregarAlFinal('A');
verificar(finalVacia, 'A', 'A', 1);

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

console.log('Los seis casos pasaron.');
