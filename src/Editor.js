const Pila = require('./Pila');
const RegistroClinico = require('./RegistroClinico');

class Editor {
  constructor(registro = new RegistroClinico()) {
    this.registro = registro;
    this.deshacerPila = new Pila();
    this.rehacerPila = new Pila();
  }

  agregar(mascota, atencion) {
    this.registro.registrarAtencion(mascota, atencion);
    this.deshacerPila.apilar({
      tipo: 'agregar',
      mascota,
      atencion,
      revertir: () => {
        this.registro.obtenerHistorial(mascota).eliminar((dato) => dato === atencion);
      },
      reaplicar: () => this.registro.registrarAtencion(mascota, atencion),
    });
    this.rehacerPila = new Pila();
    return atencion;
  }

  eliminar(mascota, condicion) {
    const historial = this.registro.obtenerHistorial(mascota);
    if (historial === null) return null;

    let actual = historial.cabeza;
    let anterior = null;

    while (actual !== null && !condicion(actual.dato)) {
      anterior = actual;
      actual = actual.siguiente;
    }

    if (actual === null) return null;

    const atencion = historial.eliminar((dato) => dato === actual.dato);
    const datoAnterior = anterior === null ? null : anterior.dato;
    this.deshacerPila.apilar({
      tipo: 'eliminar',
      mascota,
      atencion,
      anterior: datoAnterior,
      revertir: () => {
        const lista = this.registro.obtenerHistorial(mascota);
        if (datoAnterior === null) {
          lista.agregarAlInicio(atencion);
        } else {
          lista.insertarDespuesDe((dato) => dato === datoAnterior, atencion);
        }
      },
      reaplicar: () => {
        this.registro.obtenerHistorial(mascota).eliminar((dato) => dato === atencion);
      },
    });
    this.rehacerPila = new Pila();
    return atencion;
  }

  deshacer() {
    const accion = this.deshacerPila.desapilar();
    if (accion === null) return false;

    accion.revertir();

    this.rehacerPila.apilar(accion);
    return true;
  }

  rehacer() {
    const accion = this.rehacerPila.desapilar();
    if (accion === null) return false;

    accion.reaplicar();

    this.deshacerPila.apilar(accion);
    return true;
  }
}

module.exports = Editor;
