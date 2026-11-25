let assert = require('node:assert/strict');
let Recepcion = require('../src/Recepcion');

let recepcion = new Recepcion();
assert.equal(recepcion.llamarSiguiente(), null);
assert.equal(recepcion.urgencias.estaVacia(), true);
assert.equal(recepcion.generales.estaVacia(), true);

console.log('La recepción vacía se maneja sin errores.');
