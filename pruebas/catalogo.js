let assert = require('node:assert/strict');
let catalogoModulo = require('../src/catalogo');

function copiarCatalogo(categoria) {
  return JSON.parse(JSON.stringify(categoria));
}

let original = copiarCatalogo(catalogoModulo.catalogo);
let especializada = original.subcategorias[0].subcategorias[0];
especializada.subcategorias = [];
assert.equal(catalogoModulo.contarServicios(original), 9);
assert.equal(catalogoModulo.profundidad(original), 3);

especializada.subcategorias.push({
  nombre: 'Oftalmología',
  servicios: [{ nombre: 'Examen ocular', precio: 160000 }],
  subcategorias: [],
});
assert.equal(catalogoModulo.contarServicios(original), 10);
assert.equal(catalogoModulo.profundidad(original), 4);

let lineas = [];
let registrarMensaje = console.log;
console.log = function (linea) {
  lineas.push(linea);
};
try {
  catalogoModulo.listarCatalogo(original);
} finally {
  console.log = registrarMensaje;
}

assert.ok(lineas.includes('Patitas'));
assert.ok(lineas.includes('  Consultas'));
assert.ok(lineas.includes('    Especializada'));
assert.ok(lineas.includes('      Oftalmología'));
assert.ok(lineas.includes('        Examen ocular - $160.000'));

let servicioGeneral = catalogoModulo.buscarServicio(
  catalogoModulo.catalogo,
  'Consulta general',
);
assert.deepEqual(servicioGeneral, { nombre: 'Consulta general', precio: 60000 });
assert.deepEqual(
  catalogoModulo.buscarServicio(catalogoModulo.catalogo, 'Gata'),
  { nombre: 'Gata', precio: 280000 },
);
assert.equal(catalogoModulo.buscarServicio(catalogoModulo.catalogo, 'Peluquería'), null);
assert.equal(
  catalogoModulo.buscarServicio({ nombre: 'Vacía', servicios: [], subcategorias: [] }, 'Gata'),
  null,
);

assert.deepEqual(catalogoModulo.rutaDeServicio(catalogoModulo.catalogo, 'Gata'), [
  'Patitas',
  'Cirugías',
  'Esterilización',
  'Gata',
]);
assert.deepEqual(
  catalogoModulo.rutaDeServicio(catalogoModulo.catalogo, 'Consulta general'),
  ['Patitas', 'Consultas', 'Consulta general'],
);
assert.equal(catalogoModulo.rutaDeServicio(catalogoModulo.catalogo, 'Peluquería'), null);

let cirugias = catalogoModulo.catalogo.subcategorias[1];
assert.equal(catalogoModulo.precioPaquete(cirugias), 702000);
assert.equal(
  catalogoModulo.precioPaquete({ nombre: 'Vacía', servicios: [], subcategorias: [] }),
  0,
);

let serviciosEnRango = catalogoModulo.serviciosEnRango(
  catalogoModulo.catalogo,
  80000,
  150000,
);
assert.deepEqual(
  serviciosEnRango.map(function (servicio) {
    return servicio.nombre;
  }),
  [
    'Consulta a domicilio',
    'Dermatología',
    'Cardiología',
    'Con anestesia',
    'Triple felina',
  ],
);

let categoriaConRetornoTemprano = {
  nombre: 'Prueba',
  servicios: [{ nombre: 'Coincidencia', precio: 1 }],
};
Object.defineProperty(categoriaConRetornoTemprano, 'subcategorias', {
  get: function () {
    throw new Error('La búsqueda debió detenerse al encontrar el servicio.');
  },
});
assert.equal(
  catalogoModulo.buscarServicio(categoriaConRetornoTemprano, 'Coincidencia').nombre,
  'Coincidencia',
);

console.log('El catálogo recursivo cuenta, lista y calcula su profundidad.');
