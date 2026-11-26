let assert = require('node:assert/strict');
let Recepcion = require('../src/dominio/Recepcion');

let recepcion = new Recepcion();
let mensajes = [];
let registrarMensaje = console.log;
console.log = function (mensaje) {
  mensajes.push(mensaje);
};
let turno;
try {
  turno = recepcion.llamarSiguiente();
} finally {
  console.log = registrarMensaje;
}

assert.equal(turno, null);
assert.deepEqual(mensajes, ['La sala está vacía: no hay turnos para llamar.']);
assert.equal(recepcion.urgencias.estaVacia(), true);
assert.equal(recepcion.generales.estaVacia(), true);

console.log('La recepción vacía se maneja sin errores.');
