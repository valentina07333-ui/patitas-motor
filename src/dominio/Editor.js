let Pila = require('../estructuras/Pila');
let RegistroClinico = require('./RegistroClinico');

class Editor {
  constructor(registro) {
    if (registro === undefined) {
      this.registro = new RegistroClinico();
    } else {
      this.registro = registro;
    }

    this.deshacerPila = new Pila();
    this.rehacerPila = new Pila();
  }

  agregar(mascota, atencion) {
    this.registro.registrarAtencion(mascota, atencion);

    let editor = this;
    let accion = {
      tipo: 'agregar',
      mascota: mascota,
      atencion: atencion,
      revertir: function () {
        let historial = editor.registro.obtenerHistorial(mascota);
        historial.eliminar(function (dato) {
          return dato === atencion;
        });
      },
      reaplicar: function () {
        editor.registro.registrarAtencion(mascota, atencion);
      },
    };
    this.deshacerPila.apilar(accion);
    this.rehacerPila = new Pila();
    return atencion;
  }

  eliminar(mascota, condicion) {
    let historial = this.registro.obtenerHistorial(mascota);
    if (historial === null) {
      return null;
    }

    let actual = historial.cabeza;
    let anterior = null;

    while (actual !== null) {
      if (condicion(actual.dato)) {
        break;
      }

      anterior = actual;
      actual = actual.siguiente;
    }

    if (actual === null) {
      return null;
    }

    let atencionEncontrada = actual.dato;
    let atencion = historial.eliminar(function (dato) {
      return dato === atencionEncontrada;
    });
    let datoAnterior = null;
    if (anterior !== null) {
      datoAnterior = anterior.dato;
    }

    let editor = this;

    let accion = {
      tipo: 'eliminar',
      mascota: mascota,
      atencion: atencion,
      anterior: datoAnterior,
      revertir: function () {
        let lista = editor.registro.obtenerHistorial(mascota);
        if (datoAnterior === null) {
          lista.agregarAlInicio(atencion);
        } else {
          lista.insertarDespuesDe(function (dato) {
            return dato === datoAnterior;
          }, atencion);
        }
      },
      reaplicar: function () {
        let lista = editor.registro.obtenerHistorial(mascota);
        lista.eliminar(function (dato) {
          return dato === atencion;
        });
      },
    };
    this.deshacerPila.apilar(accion);
    this.rehacerPila = new Pila();
    return atencion;
  }

  deshacer() {
    let accion = this.deshacerPila.desapilar();
    if (accion === null) {
      return false;
    }

    accion.revertir();

    this.rehacerPila.apilar(accion);
    return true;
  }

  rehacer() {
    let accion = this.rehacerPila.desapilar();
    if (accion === null) {
      return false;
    }

    accion.reaplicar();

    this.deshacerPila.apilar(accion);
    return true;
  }
}

module.exports = Editor;
