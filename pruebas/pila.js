let assert = require('node:assert/strict');
let Pila = require('../src/Pila');

let pila = new Pila();
assert.equal(pila.estaVacia(), true);
assert.equal(pila.verTope(), null);
assert.equal(pila.desapilar(), null);
assert.equal(pila.tamanio(), 0);

pila.apilar('A');
pila.apilar('B');
assert.equal(pila.verTope(), 'B');
assert.equal(pila.tamanio(), 2);
assert.equal(pila.desapilar(), 'B');
assert.equal(pila.desapilar(), 'A');
assert.equal(pila.estaVacia(), true);
assert.equal(pila.tamanio(), 0);

console.log('La pila funciona en orden LIFO.');
