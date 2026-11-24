const assert = require('node:assert/strict');
const Editor = require('../src/Editor');

const editor = new Editor();
assert.equal(editor.deshacer(), false);
assert.equal(editor.rehacer(), false);
assert.equal(editor.registro.obtenerHistorial('Lola'), null);
const A = { id: 'A' };
const B = { id: 'B' };
const C = { id: 'C' };

function acciones(pila) {
  const resultado = [];
  let actual = pila.tope;
  while (actual !== null) {
    const accion = actual.dato;
    resultado.push(`${accion.tipo}:${accion.atencion.id}`);
    actual = actual.siguiente;
  }
  return resultado;
}

const historial = () => editor.registro.obtenerHistorial('Lola')?.aArreglo() ?? [];

editor.agregar('Lola', A);
assert.deepEqual(historial(), [A]);
assert.deepEqual(acciones(editor.deshacerPila), ['agregar:A']);
assert.deepEqual(acciones(editor.rehacerPila), []);

editor.agregar('Lola', B);
assert.deepEqual(historial(), [A, B]);
assert.deepEqual(acciones(editor.deshacerPila), ['agregar:B', 'agregar:A']);
assert.deepEqual(acciones(editor.rehacerPila), []);

assert.equal(editor.eliminar('Lola', (dato) => dato === A), A);
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
