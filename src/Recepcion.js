const Cola = require('./Cola');

class Recepcion {
  constructor() {
    this.urgencias = new Cola();
    this.generales = new Cola();
  }

  registrarLlegada(turno) {
    if (turno.tipo.toLowerCase() === 'urgencia') {
      this.urgencias.encolar(turno);
    } else {
      this.generales.encolar(turno);
    }
  }

  llamarSiguiente() {
    if (!this.urgencias.estaVacia()) {
      return this.urgencias.desencolar();
    }

    return this.generales.desencolar();
  }
}

module.exports = Recepcion;
