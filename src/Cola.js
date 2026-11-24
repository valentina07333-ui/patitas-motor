const Nodo = require('./Nodo');

class Cola {
  constructor() {
    this.frente = null;
    this.final = null;
    this._tamanio = 0;
  }

  encolar(dato) {
    const nuevo = new Nodo(dato);

    if (this.estaVacia()) {
      this.frente = nuevo;
      this.final = nuevo;
    } else {
      this.final.siguiente = nuevo;
      this.final = nuevo;
    }

    this._tamanio++;
  }

  desencolar() {
    if (this.estaVacia()) {
      return null;
    }

    const dato = this.frente.dato;
    this.frente = this.frente.siguiente;
    this._tamanio--;

    if (this.estaVacia()) {
      this.final = null;
    }

    return dato;
  }

  verFrente() {
    return this.frente === null ? null : this.frente.dato;
  }

  estaVacia() {
    return this._tamanio === 0;
  }

  tamanio() {
    return this._tamanio;
  }
}

module.exports = Cola;
