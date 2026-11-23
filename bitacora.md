# Las atenciones de Lola

La lista va de la atención más antigua a la más reciente:

```text
cabeza → [Vacunación, 02/02] → [Control de peso, 15/03] → [Limpieza dental, 20/05] → null
```

Si `nodoVacunacion.siguiente` queda en `null`, desde `cabeza` solo se llega a la vacunación. Las otras atenciones siguen ahí, pero quedaron desconectadas.

## Agregar una atención

`nuevo` es el nodo que se agrega. En una lista vacía, da igual si va al inicio o al final: `cabeza` apunta a él.

```text
Vacía:       cabeza → null
Con nuevo:   cabeza → [nuevo] → null
```

Si ya hay nodos, al **inicio** `cabeza` apunta a `nuevo`, y `nuevo` apunta al que antes era primero. Al **final**, el último nodo apunta a `nuevo`.

```text
Inicio:  cabeza → [nuevo] → [A] → [B] → null
Final:   cabeza → [A] → [B] → [nuevo] → null
```

Esto funciona igual si antes había uno o varios nodos: solo cambian esas referencias; el resto de la cadena queda igual.
