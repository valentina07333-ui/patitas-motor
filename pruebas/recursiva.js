let assert = require('node:assert/strict');
let ListaEnlazada = require('../src/estructuras/ListaEnlazada');

let historiales = new Map([
  [
    'Lola',
    [
      { fecha: '02/02', motivo: 'Vacunación anual', costo: 85000 },
      { fecha: '15/03', motivo: 'Control de peso', costo: 40000 },
      { fecha: '20/05', motivo: 'Limpieza dental', costo: 150000 },
    ],
  ],
  [
    'Toby',
    [
      { fecha: '10/01', motivo: 'Consulta por cojera', costo: 60000 },
      { fecha: '12/01', motivo: 'Radiografía de pata', costo: 120000 },
      { fecha: '05/04', motivo: 'Vacunación anual', costo: 85000 },
    ],
  ],
  [
    'Mía',
    [
      { fecha: '18/02', motivo: 'Esterilización', costo: 280000 },
      { fecha: '25/02', motivo: 'Control posquirúrgico', costo: 0 },
    ],
  ],
]);

for (let [mascota, atenciones] of historiales) {
  let lista = new ListaEnlazada();
  for (let atencion of atenciones) {
    lista.agregarAlFinal(atencion);
  }

  assert.equal(lista.tamanioRecursivo(), lista.obtenerTamanio());

  let costoIterativo = 0;
  lista.recorrer(function (atencion) {
    costoIterativo += atencion.costo;
  });
  assert.equal(lista.costoTotalRecursivo(), costoIterativo);

  let condicion = function (atencion) {
    return atencion.motivo === 'Vacunación anual';
  };
  assert.deepEqual(lista.buscarRecursivo(condicion), lista.buscar(condicion));

  let impresiones = [];
  let registrarMensaje = console.log;
  console.log = function (atencion) {
    impresiones.push(atencion);
  };
  try {
    lista.imprimirAlReves();
  } finally {
    console.log = registrarMensaje;
  }
  assert.deepEqual(impresiones, atenciones.slice().reverse());
  console.log('OK: operaciones recursivas equivalentes para ' + mascota + '.');
}

let listaVacia = new ListaEnlazada();
assert.equal(listaVacia.tamanioRecursivo(), 0);
assert.equal(listaVacia.costoTotalRecursivo(), 0);
assert.equal(listaVacia.buscarRecursivo(function () { return true; }), null);

let listaGrande = new ListaEnlazada();
for (let indice = 0; indice < 100000; indice++) {
  listaGrande.agregarAlFinal({ costo: 1 });
}

assert.throws(
  function () {
    listaGrande.tamanioRecursivo();
  },
  function (error) {
    assert.ok(error instanceof RangeError);
    assert.match(error.message, /Maximum call stack size exceeded/);
    return true;
  },
);
console.log('OK: 100.000 nodos producen RangeError por límite de pila.');
