# Mi bitácora de Patitas

En este ejercicio hice una cadena de nodos con las atenciones de Lola. La primera es la más antigua y la última es la más nueva:

```text
cabeza → [Vacunación, 02/02] → [Control de peso, 15/03] → [Limpieza dental, 20/05] → null
```

En `pruebas/nodos.js` primero muestro las atenciones y sumo sus costos. Después pongo `null` en `nodoVacunacion.siguiente` para probar qué pasa si se pierde el enlace. Al recorrer desde `cabeza`, solo aparece la vacunación. El control de peso y la limpieza todavía existen, pero ya no puedo llegar a ellos desde la cabeza porque se cortó la cadena.

```text
Antes:    cabeza → [Vacunación] → [Control] → [Limpieza] → null
Después:  cabeza → [Vacunación] → null
                       [Control] → [Limpieza] → null  (desconectados)
```

La prueba también cuenta los nodos alcanzables y comprueba que queda uno. Antes de cortar el enlace, imprime las tres atenciones y el total `$275.000`.

## Agregar atenciones

`nuevo` es el nodo que quiero agregar. Si la lista está vacía, `cabeza` y `cola` apuntan al mismo nodo, tanto si lo agrego al principio como al final:

```text
Antes:    cabeza → null
Después:  cabeza, cola → [nuevo] → null
```

Si ya hay un nodo, al agregar al inicio cambia `cabeza`. Al agregar al final, el nodo que estaba al final apunta al nuevo:

```text
Inicio:  cabeza → [nuevo] → [A] → null   (cola → [A])
Final:   cabeza → [A] → [nuevo] → null   (cola → [nuevo])
```

Con varios nodos es parecido. Al inicio, el nuevo apunta al primero. Al final, el último apunta al nuevo.

```text
Inicio:  cabeza → [nuevo] → [A] → [B] → null   (cola → [B])
Final:   cabeza → [A] → [B] → [nuevo] → null   (cola → [nuevo])
```

## Cuánto tarda cada operación

- `agregarAlInicio` y `agregarAlFinal` son O(1). Cambian unas referencias y no tienen que buscar por la lista.
- `estaVacia` y `obtenerTamanio` son O(1), porque leen un valor guardado.
- `recorrer` y `aArreglo` son O(n), porque visitan todos los nodos. `aArreglo` también usa O(n) espacio para guardar los datos.
- Crear una lista es O(1).

## Eliminar atenciones

Estos son los dibujos de cómo queda la lista cuando elimino un nodo:

```text
Cabeza:      [A] → [B] → [C]     queda [B] → [C]
Del medio:   [A] → [B] → [C]     queda [A] → [C]
Cola:        [A] → [B] → [C]     queda [A] → [B] (cola ahora es B)
```

- `buscar`, `insertarDespuesDe` y `eliminar` pueden ser O(n), porque quizá hay que recorrer muchos nodos para encontrar el dato.
- Eliminar la cola también puede tardar O(n). Aunque guardamos `cola`, la lista solo tiene enlaces hacia adelante. Para cambiar `cola`, tengo que recorrer desde `cabeza` y encontrar el nodo anterior.

## Comparar lista enlazada y arreglo

Esta tabla muestra cuánto tardan algunas operaciones. `n` es la cantidad de atenciones:

| Operación | Lista enlazada | Arreglo |
| --- | --- | --- |
| Agregar al final | O(1), usando `cola` | O(1) amortizado |
| Agregar al inicio | O(1), se actualiza `cabeza` | O(n), se desplazan los elementos |
| Acceder a la atención k | O(n), se recorre desde `cabeza` | O(1) |
| Buscar un dato | O(n) | O(n) |
| Eliminar la primera | O(1), se mueve `cabeza` al siguiente nodo | O(n), se desplazan los elementos |

## La cola de recepción (FIFO)

En este dibujo puse tres mascotas en la cola:

```text
frente → [Lola] → [Toby] → [Mía] ← final
```

Después llamé a Lola y la saqué de la cola:

```text
frente → [Toby] → [Mía] ← final
```

## Medición de cola y arreglo

Probé 100.000 turnos con `node pruebas/comparar-cola.js`. Estos fueron los tiempos de esa ejecución:

| Operación | Cola enlazada | Arreglo |
| --- | ---: | ---: |
| Encolar (`encolar` / `push`) | 5,60 ms | 2,23 ms |
| Desencolar (`desencolar` / `shift`) | 3,07 ms | 612,16 ms |

En mi prueba, `shift()` tardó más porque mueve los otros elementos del arreglo. Los tiempos pueden cambiar según el computador y lo que esté haciendo.

En la cola enlazada, `encolar` y `desencolar` son O(1). En el arreglo, `push` es O(1) amortizado, pero `shift` es O(n), porque mueve los turnos que quedan. Por eso la cola enlazada fue más rápida al sacar muchos turnos en esta prueba.

## Simulación del sábado

En la simulación cada consulta dura 20 minutos. Solo atiendo a las mascotas que ya llegaron. Si hay una urgencia esperando, pasa antes que una consulta general.

| Inicio | Mascota | Por qué sigue |
| --- | --- | --- |
| 8:00 | Toby | Llegó a las 8:00; no hay nadie más. |
| 8:20 | Luna | Ya llegó y es urgencia. |
| 8:40 | Kira | Es la siguiente urgencia; llegó a las 8:25. |
| 9:00 | Rocky | Llegó a las 9:00 y es urgencia. |
| 9:20 | Max | Ya no quedan urgencias; es el general que llegó primero. |
| 9:40 | Simón | Siguiente consulta general. |
| 10:00 | Nala | Última consulta general. |

Por eso Max espera aunque llegó antes que Luna: Luna es una urgencia y ya había llegado.

## La pila para deshacer y rehacer

También hice una pila con nodos. `apilar`, `desapilar`, `verTope`, `estaVacia` y `tamanio` son O(1), porque solo consultan o cambian el tope y el contador.

## Mi prueba de deshacer y rehacer

El tope de cada pila está a la izquierda. `+` quiere decir agregar y `−` quiere decir eliminar.

| Paso | Acción | Deshacer | Rehacer |
| --- | --- | --- | --- |
| 1 | Agregar A | A+ | — |
| 2 | Agregar B | B+, A+ | — |
| 3 | Eliminar A | A−, B+, A+ | — |
| 4 | Deshacer | B+, A+ | A− |
| 5 | Deshacer | A+ | B+, A− |
| 6 | Rehacer | B+, A+ | A− |
| 7 | Agregar C | C+, B+, A+ | — |
| 8 | Rehacer | C+, B+, A+ | — |

Cuando agrego C, se borra lo que quedaba en la pila de rehacer. Lo probé en `pruebas/editor.js`.

## Las estructuras del motor

Esta tabla resume para qué uso cada estructura y cuánto tardan sus operaciones:
| Estructura | Principio | Uso en Patitas | Operaciones principales |
| --- | --- | --- | --- |
| `Nodo` y lista enlazada | Secuencial | Guardan las atenciones de cada mascota | Agregar al inicio/final: O(1); buscar, eliminar y recorrer: O(n) |
| `Cola` | FIFO | Ordena los turnos por llegada | Encolar y desencolar: O(1) |
| `Pila` | LIFO | Guarda acciones para deshacer y rehacer | Apilar, desapilar y ver el tope: O(1) |
| `Map` en `RegistroClinico` | Acceso por clave | Encuentra el historial de cada mascota | Guardar y buscar historial: O(1) promedio |
| Arreglo | Secuencial por posición | Comparación con la cola enlazada | `push`: O(1) amortizado; `shift`: O(n) |
