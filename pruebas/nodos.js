const assert = require('node:assert/strict');
const Nodo = require('../src/Nodo');

const lola = {
  nombre: 'Lola',
  especie: 'gata',
  edad: 4,
};

const nodoVacunacion = new Nodo({
  fecha: '02/02',
  motivo: 'vacunación',
  veterinario: 'Dra. Ríos',
  costo: 85000,
});

const nodoControlPeso = new Nodo({
  fecha: '15/03',
  motivo: 'control de peso',
  veterinario: 'Dr. Gómez',
  costo: 40000,
});

const nodoLimpiezaDental = new Nodo({
  fecha: '20/05',
  motivo: 'limpieza dental',
  veterinario: 'Dra. Ríos',
  costo: 150000,
});

nodoVacunacion.siguiente = nodoControlPeso;
nodoControlPeso.siguiente = nodoLimpiezaDental;

const cabeza = nodoVacunacion;

let actual = cabeza;
while (actual !== null) {
  console.log(actual.dato);
  actual = actual.siguiente;
}

let costoTotal = 0;
actual = cabeza;
while (actual !== null) {
  costoTotal += actual.dato.costo;
  actual = actual.siguiente;
}
console.log(
  'Costo total del historial:',
  `$${new Intl.NumberFormat('es-CO').format(costoTotal)}`,
);

nodoVacunacion.siguiente = null;
let atencionesAlcanzables = 0;
actual = cabeza;
while (actual !== null) {
  atencionesAlcanzables++;
  actual = actual.siguiente;
}
assert.equal(atencionesAlcanzables, 1);
console.log(
  'Atenciones alcanzables después de perder el enlace:',
  atencionesAlcanzables,
);

module.exports = { lola, nodoVacunacion, nodoControlPeso, nodoLimpiezaDental, cabeza, costoTotal };
