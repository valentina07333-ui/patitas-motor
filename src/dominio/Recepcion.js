let Cola = require('../estructuras/Cola');

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
    if (this.urgencias.estaVacia() && this.generales.estaVacia()) {
      console.log('La sala está vacía: no hay turnos para llamar.');
      return null;
    }

    if (this.urgencias.estaVacia() === false) {
      return this.urgencias.desencolar();
    }

    return this.generales.desencolar();
  }
}

module.exports = Recepcion;
