let ListaEnlazada = require('./ListaEnlazada');

class RegistroClinico {
  constructor() {
    this.historiales = new Map();
  }

  registrarAtencion(mascota, atencion) {
    if (!this.historiales.has(mascota)) {
      this.historiales.set(mascota, new ListaEnlazada());
    }

    let historial = this.historiales.get(mascota);
    historial.agregarAlFinal(atencion);
  }

  obtenerHistorial(nombreMascota) {
    if (this.historiales.has(nombreMascota)) {
      return this.historiales.get(nombreMascota);
    }

    return null;
  }
}

module.exports = RegistroClinico;
