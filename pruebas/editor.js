let assert = require('node:assert/strict');
let Editor = require('../src/Editor');

let editor = new Editor();
assert.equal(editor.deshacer(), false);
assert.equal(editor.rehacer(), false);
assert.equal(editor.registro.obtenerHistorial('Lola'), null);
let A = { id: 'A' };
let B = { id: 'B' };
let C = { id: 'C' };

function acciones(pila) {
  let resultado = [];
  let actual = pila.tope;
  while (actual !== null) {
    let accion = actual.dato;
    resultado.push(accion.tipo + ':' + accion.atencion.id);
    actual = actual.siguiente;
  }
  return resultado;
}

function historial() {
  let lista = editor.registro.obtenerHistorial('Lola');
  if (lista === null) {
    return [];
  }
  return lista.aArreglo();
}

editor.agregar('Lola', A);
assert.deepEqual(historial(), [A]);
assert.deepEqual(acciones(editor.deshacerPila), ['agregar:A']);
assert.deepEqual(acciones(editor.rehacerPila), []);

editor.agregar('Lola', B);
assert.deepEqual(historial(), [A, B]);
assert.deepEqual(acciones(editor.deshacerPila), ['agregar:B', 'agregar:A']);
assert.deepEqual(acciones(editor.rehacerPila), []);

assert.equal(editor.eliminar('Lola', function (dato) {
  return dato === A;
}), A);
assert.deepEqual(historial(), [B]);
assert.deepEqual(acciones(editor.deshacerPila), ['eliminar:A', 'agregar:B', 'agregar:A']);
assert.deepEqual(acciones(editor.rehacerPila), []);

assert.equal(editor.deshacer(), true);
assert.deepEqual(historial(), [A, B]);
assert.deepEqual(acciones(editor.deshacerPila), ['agregar:B', 'agregar:A']);
assert.deepEqual(acciones(editor.rehacerPila), ['eliminar:A']);

assert.equal(editor.deshacer(), true);
assert.deepEqual(historial(), [A]);
assert.deepEqual(acciones(editor.deshacerPila), ['agregar:A']);
assert.deepEqual(acciones(editor.rehacerPila), ['agregar:B', 'eliminar:A']);

assert.equal(editor.rehacer(), true);
assert.deepEqual(historial(), [A, B]);
assert.deepEqual(acciones(editor.deshacerPila), ['agregar:B', 'agregar:A']);
assert.deepEqual(acciones(editor.rehacerPila), ['eliminar:A']);

editor.agregar('Lola', C);
assert.deepEqual(historial(), [A, B, C]);
assert.deepEqual(acciones(editor.deshacerPila), ['agregar:C', 'agregar:B', 'agregar:A']);
assert.deepEqual(acciones(editor.rehacerPila), []);

assert.equal(editor.rehacer(), false);
assert.deepEqual(historial(), [A, B, C]);
assert.deepEqual(acciones(editor.deshacerPila), ['agregar:C', 'agregar:B', 'agregar:A']);
assert.deepEqual(acciones(editor.rehacerPila), []);

console.log('La secuencia de deshacer y rehacer pasó.');
