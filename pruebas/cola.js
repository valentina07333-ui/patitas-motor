let assert = require('node:assert/strict');
let Cola = require('../src/Cola');

let cola = new Cola();

assert.equal(cola.desencolar(), null);
assert.equal(cola.frente, null);
assert.equal(cola.final, null);
assert.equal(cola.tamanio(), 0);

cola.encolar('Lola');
assert.equal(cola.desencolar(), 'Lola');
assert.equal(cola.frente, null);
assert.equal(cola.final, null);
assert.equal(cola.estaVacia(), true);
assert.equal(cola.tamanio(), 0);

console.log('Los casos de cola vacía pasaron.');

let turnos = [
  { mascota: 'Lola', tutor: 'Ana', horaLlegada: '08:00', motivo: 'Vacunación' },
  { mascota: 'Toby', tutor: 'Luis', horaLlegada: '08:10', motivo: 'Cojera' },
  { mascota: 'Mía', tutor: 'Sofía', horaLlegada: '08:20', motivo: 'Control' },
  { mascota: 'Max', tutor: 'Carlos', horaLlegada: '08:30', motivo: 'Consulta' },
  { mascota: 'Nina', tutor: 'Elena', horaLlegada: '08:40', motivo: 'Vacunación' },
];

for (let i = 0; i < turnos.length; i++) {
  cola.encolar(turnos[i]);
}

assert.equal(cola.tamanio(), 5);
assert.equal(cola.verFrente(), turnos[0]);
assert.equal(cola.final.dato, turnos[4]);

for (let j = 0; j < turnos.length; j++) {
  assert.equal(cola.desencolar(), turnos[j]);
}

assert.equal(cola.estaVacia(), true);
assert.equal(cola.frente, null);
assert.equal(cola.final, null);
assert.equal(cola.tamanio(), 0);

console.log('Los cinco turnos salieron en orden de llegada.');
