let Nodo = require('./Nodo');

class Pila {
  constructor() {
    this.tope = null;
    this._tamanio = 0;
  }

  apilar(dato) {
    let nuevo = new Nodo(dato);
    nuevo.siguiente = this.tope;
    this.tope = nuevo;
    this._tamanio++;
  }

  desapilar() {
    if (this.estaVacia()) {
      return null;
    }

    let dato = this.tope.dato;
    this.tope = this.tope.siguiente;
    this._tamanio--;
    return dato;
  }

  verTope() {
    if (this.tope === null) {
      return null;
    }

    return this.tope.dato;
  }

  estaVacia() {
    return this._tamanio === 0;
  }

  tamanio() {
    return this._tamanio;
  }
}

module.exports = Pila;
