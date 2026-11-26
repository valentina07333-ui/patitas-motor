let assert = require('node:assert/strict');
let Cola = require('../src/estructuras/Cola');

let cola = new Cola();
assert.equal(cola.estaVacia(), true);
assert.equal(cola.verFrente(), null);
assert.equal(cola.desencolar(), null);
assert.equal(cola.frente, null);
assert.equal(cola.final, null);

let turnos = [
  { mascota: 'Lola', tutor: 'Ana', horaLlegada: '08:00', motivo: 'Control' },
  { mascota: 'Toby', tutor: 'Luis', horaLlegada: '08:05', motivo: 'Vacunas' },
  { mascota: 'Mía', tutor: 'Eva', horaLlegada: '08:10', motivo: 'Consulta' },
  { mascota: 'Max', tutor: 'Leo', horaLlegada: '08:15', motivo: 'Revisión' },
  { mascota: 'Kira', tutor: 'Sol', horaLlegada: '08:20', motivo: 'Herida' },
];

for (let i = 0; i < turnos.length; i++) {
  cola.encolar(turnos[i]);
}

assert.equal(cola.tamanio(), turnos.length);
assert.equal(cola.verFrente(), turnos[0]);

for (let j = 0; j < turnos.length; j++) {
  assert.equal(cola.desencolar(), turnos[j]);
}

assert.equal(cola.estaVacia(), true);
assert.equal(cola.tamanio(), 0);
assert.equal(cola.frente, null);
assert.equal(cola.final, null);

console.log('OK - Cola FIFO: cinco turnos en orden y cola vacía.');
