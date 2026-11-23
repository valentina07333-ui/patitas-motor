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

  buscar(condicion) {
    let actual = this.cabeza;

    while (actual !== null) {
      if (condicion(actual.dato)) {
        return actual.dato;
      }
      actual = actual.siguiente;
    }

    return null;
  }

  insertarDespuesDe(condicion, dato) {
    let actual = this.cabeza;

    while (actual !== null) {
      if (condicion(actual.dato)) {
        const nuevo = new Nodo(dato);
        nuevo.siguiente = actual.siguiente;
        actual.siguiente = nuevo;

        if (actual === this.cola) {
          this.cola = nuevo;
        }

        this.tamanio++;
        return true;
      }
      actual = actual.siguiente;
    }

    return false;
  }

  eliminar(condicion) {
    let actual = this.cabeza;
    let anterior = null;

    while (actual !== null) {
      if (condicion(actual.dato)) {
        if (anterior === null) {
          this.cabeza = actual.siguiente;
        } else {
          anterior.siguiente = actual.siguiente;
        }

        if (actual === this.cola) {
          this.cola = anterior;
        }

        this.tamanio--;
        return actual.dato;
      }

      anterior = actual;
      actual = actual.siguiente;
    }

    return null;
  }

  aArreglo() {
    const datos = [];
    this.recorrer((dato) => datos.push(dato));
    return datos;
  }
}

module.exports = ListaEnlazada;
