const Nodo = require('./Nodo');

class ListaEnlazada {
  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.tamanio = 0;
  }

  agregarAlFinal(dato) {
    const nuevo = new Nodo(dato);

    if (this.cabeza === null) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      this.cola.siguiente = nuevo;
      this.cola = nuevo;
    }

    this.tamanio++;
  }

  agregarAlInicio(dato) {
    const nuevo = new Nodo(dato);

    if (this.cabeza === null) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      nuevo.siguiente = this.cabeza;
      this.cabeza = nuevo;
    }

    this.tamanio++;
  }
  estaVacia() {
    return this.tamanio === 0;
  }

  obtenerTamanio() {
    return this.tamanio;
  }

  recorrer(callback) {
    let actual = this.cabeza;

    while (actual !== null) {
      callback(actual.dato);
      actual = actual.siguiente;
    }
  }

  aArreglo() {
    const datos = [];
    this.recorrer((dato) => datos.push(dato));
    return datos;
  }
}

module.exports = ListaEnlazada;
