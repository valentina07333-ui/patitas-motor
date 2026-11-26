let catalogo = {
  nombre: 'Patitas',
  servicios: [],
  subcategorias: [
    {
      nombre: 'Consultas',
      servicios: [
        { nombre: 'Consulta general', precio: 60000 },
        { nombre: 'Consulta a domicilio', precio: 90000 },
      ],
      subcategorias: [
        {
          nombre: 'Especializada',
          servicios: [
            { nombre: 'Dermatología', precio: 110000 },
            { nombre: 'Cardiología', precio: 130000 },
          ],
          subcategorias: [
            {
              nombre: 'Oftalmología',
              servicios: [{ nombre: 'Examen ocular', precio: 160000 }],
              subcategorias: [],
            },
          ],
        },
      ],
    },
    {
      nombre: 'Cirugías',
      servicios: [],
      subcategorias: [
        {
          nombre: 'Esterilización',
          servicios: [
            { nombre: 'Gata', precio: 280000 },
            { nombre: 'Perra', precio: 350000 },
          ],
          subcategorias: [],
        },
        {
          nombre: 'Limpieza dental',
          servicios: [{ nombre: 'Con anestesia', precio: 150000 }],
          subcategorias: [],
        },
      ],
    },
    {
      nombre: 'Vacunas',
      servicios: [
        { nombre: 'Rabia', precio: 45000 },
        { nombre: 'Triple felina', precio: 85000 },
      ],
      subcategorias: [],
    },
  ],
};

function contarServicios(categoria) {
  let total = categoria.servicios.length;

  for (let subcategoria of categoria.subcategorias) {
    total += contarServicios(subcategoria);
  }

  return total;
}

function listarCatalogo(categoria, nivel) {
  if (nivel === undefined) {
    nivel = 0;
  }

  console.log(' '.repeat(nivel * 2) + categoria.nombre);

  for (let servicio of categoria.servicios) {
    console.log(
      ' '.repeat((nivel + 1) * 2) +
      servicio.nombre +
      ' - $' +
      new Intl.NumberFormat('es-CO').format(servicio.precio),
    );
  }

  for (let subcategoria of categoria.subcategorias) {
    listarCatalogo(subcategoria, nivel + 1);
  }
}

function profundidad(categoria) {
  if (categoria.subcategorias.length === 0) {
    return 1;
  }

  let profundidadMaxima = 0;
  for (let subcategoria of categoria.subcategorias) {
    profundidadMaxima = Math.max(profundidadMaxima, profundidad(subcategoria));
  }

  return profundidadMaxima + 1;
}

function buscarServicio(categoria, nombre) {
  for (let servicio of categoria.servicios) {
    if (servicio.nombre === nombre) {
      return servicio;
    }
  }

  for (let subcategoria of categoria.subcategorias) {
    let encontrado = buscarServicio(subcategoria, nombre);
    if (encontrado !== null) {
      return encontrado;
    }
  }

  return null;
}

function rutaDeServicio(categoria, nombre) {
  function buscarRuta(actual, ruta) {
    ruta.push(actual.nombre);

    for (let servicio of actual.servicios) {
      if (servicio.nombre === nombre) {
        return ruta.concat(servicio.nombre);
      }
    }

    for (let subcategoria of actual.subcategorias) {
      let resultado = buscarRuta(subcategoria, ruta);
      if (resultado !== null) {
        return resultado;
      }
    }

    ruta.pop();
    return null;
  }

  return buscarRuta(categoria, []);
}

function sumarServicios(categoria) {
  let total = 0;
  for (let servicio of categoria.servicios) {
    total += servicio.precio;
  }

  for (let subcategoria of categoria.subcategorias) {
    total += sumarServicios(subcategoria);
  }

  return total;
}

function precioPaquete(categoria) {
  return sumarServicios(categoria) * 0.9;
}

function serviciosEnRango(categoria, min, max) {
  let resultado = [];

  function buscarEnRango(actual) {
    for (let servicio of actual.servicios) {
      if (servicio.precio >= min && servicio.precio <= max) {
        resultado.push(servicio);
      }
    }

    for (let subcategoria of actual.subcategorias) {
      buscarEnRango(subcategoria);
    }
  }

  buscarEnRango(categoria);
  return resultado;
}

module.exports = {
  catalogo: catalogo,
  buscarServicio: buscarServicio,
  contarServicios: contarServicios,
  precioPaquete: precioPaquete,
  listarCatalogo: listarCatalogo,
  profundidad: profundidad,
  rutaDeServicio: rutaDeServicio,
  serviciosEnRango: serviciosEnRango,
};
