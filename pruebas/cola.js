const assert = require('node:assert/strict');
const Cola = require('../src/Cola');

const cola = new Cola();

// Desencolar una cola vacía devuelve null y no falla.
assert.equal(cola.desencolar(), null);
assert.equal(cola.frente, null);
assert.equal(cola.final, null);
assert.equal(cola.tamanio(), 0);

// Al quitar el último dato, ambos extremos vuelven a null.
cola.encolar('Lola');
assert.equal(cola.desencolar(), 'Lola');
assert.equal(cola.frente, null);
assert.equal(cola.final, null);
assert.equal(cola.estaVacia(), true);
assert.equal(cola.tamanio(), 0);

console.log('Los casos de cola vacía pasaron.');

const turnos = [
  { mascota: 'Lola', tutor: 'Ana', horaLlegada: '08:00', motivo: 'Vacunación' },
  { mascota: 'Toby', tutor: 'Luis', horaLlegada: '08:10', motivo: 'Cojera' },
  { mascota: 'Mía', tutor: 'Sofía', horaLlegada: '08:20', motivo: 'Control' },
  { mascota: 'Max', tutor: 'Carlos', horaLlegada: '08:30', motivo: 'Consulta' },
  { mascota: 'Nina', tutor: 'Elena', horaLlegada: '08:40', motivo: 'Vacunación' },
];

for (const turno of turnos) {
  cola.encolar(turno);
}

assert.equal(cola.tamanio(), 5);
assert.equal(cola.verFrente(), turnos[0]);
assert.equal(cola.final.dato, turnos[4]);

for (const turno of turnos) {
  assert.equal(cola.desencolar(), turno);
}

assert.equal(cola.estaVacia(), true);
assert.equal(cola.frente, null);
assert.equal(cola.final, null);
assert.equal(cola.tamanio(), 0);

console.log('Los cinco turnos salieron en orden de llegada.');
