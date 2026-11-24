const Nodo = require('./Nodo');

class Pila {
  constructor() {
    this.tope = null;
    this._tamanio = 0;
  }

  apilar(dato) {
    const nuevo = new Nodo(dato);
    nuevo.siguiente = this.tope;
    this.tope = nuevo;
    this._tamanio++;
  }

  desapilar() {
    if (this.estaVacia()) {
      return null;
    }

    const dato = this.tope.dato;
    this.tope = this.tope.siguiente;
    this._tamanio--;
    return dato;
  }

  verTope() {
    return this.tope === null ? null : this.tope.dato;
  }

  estaVacia() {
    return this._tamanio === 0;
  }

  tamanio() {
    return this._tamanio;
  }
}

module.exports = Pila;
