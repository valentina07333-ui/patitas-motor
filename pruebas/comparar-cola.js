let Cola = require('../src/estructuras/Cola');

let cantidad = 100000;
let turnos = [];

for (let i = 0; i < cantidad; i++) {
  let turno = {
    mascota: 'Mascota ' + (i + 1),
    tutor: 'Tutor ' + (i + 1),
    horaLlegada: '09:00',
    motivo: 'Consulta',
  };
  turnos.push(turno);
}

let cola = new Cola();
console.time('Cola enlazada - encolar');
for (let j = 0; j < turnos.length; j++) {
  cola.encolar(turnos[j]);
}
console.timeEnd('Cola enlazada - encolar');

console.time('Cola enlazada - desencolar');
while (!cola.estaVacia()) {
  cola.desencolar();
}
console.timeEnd('Cola enlazada - desencolar');

let arreglo = [];
console.time('Arreglo - push');
for (let k = 0; k < turnos.length; k++) {
  arreglo.push(turnos[k]);
}
console.timeEnd('Arreglo - push');

console.time('Arreglo - shift');
while (arreglo.length > 0) {
  arreglo.shift();
}
console.timeEnd('Arreglo - shift');
