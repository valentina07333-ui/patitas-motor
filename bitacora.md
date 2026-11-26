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

Antes de programar, hice este cálculo a mano. Cada consulta dura 20 minutos. En cada hora de inicio solo cuento a las mascotas que ya llegaron; si hay una urgencia esperando, la atiendo antes que a una consulta general.

| Llega | Inicio | Mascota | Espera | Por qué sigue |
| --- | --- | --- | ---: | --- |
| 8:00 | 8:00 | Toby | 0 min | Ya llegó; no hay otros turnos esperando. |
| 8:10 | 8:20 | Luna | 10 min | Ya llegó y es urgencia; Toby termina a las 8:20. |
| 8:25 | 8:40 | Kira | 15 min | Ya llegó y es la siguiente urgencia; Luna termina a las 8:40. |
| 9:00 | 9:00 | Rocky | 0 min | Llega justo cuando Kira termina y es urgencia. |
| 8:05 | 9:20 | Max | 75 min | Ya no quedan urgencias; es el general que llegó primero. |
| 8:20 | 9:40 | Simón | 80 min | Max ya pasó; Simón es el siguiente general que llegó. |
| 8:40 | 10:00 | Nala | 80 min | Es la última consulta general que queda. |

Al comparar esta tabla con la salida de `node src/simulacion.js`, el orden, las horas de inicio y las esperas coinciden. Encontré un error en mi primer cálculo: había anotado que Luna llegó a las 8:05. Mi hipótesis es que copié la hora de Max por equivocación. La corregí a las 8:10, que es la hora de la tabla de llegadas; el inicio de Luna sigue siendo 8:20 y su espera es 10 minutos. No encontré diferencias en el resultado del programa.

Max espera aunque llegó antes que Luna porque Luna ya llegó y es una urgencia.

## La pila para deshacer y rehacer

También hice una pila con nodos y reutilicé `Nodo`. Elegí los nodos porque ya los tenía en el proyecto y así puedo agregar o quitar el nodo del tope sin mover los demás, como pasaría al usar ciertas operaciones de un arreglo. `apilar`, `desapilar`, `verTope`, `estaVacia` y `tamanio` son O(1), porque solo consultan o cambian el tope y el contador.

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

Esta tabla resume el principio de cada estructura, para qué la uso y cuánto tardan sus operaciones principales. El `Map` se organiza por clave, así que no sigue un orden FIFO, LIFO ni secuencial.

| Estructura | Principio | Uso en Patitas | Operaciones principales |
| --- | --- | --- | --- |
| `Nodo` y lista enlazada | Secuencial | Guardan en orden las atenciones de cada mascota | Agregar al inicio/final: O(1); buscar y recorrer: O(n); eliminar por dato: O(n) |
| `Cola` | FIFO | Ordena los turnos por llegada | Encolar y desencolar: O(1) |
| `Pila` | LIFO | Guarda acciones para deshacer y rehacer | Apilar, desapilar y ver el tope: O(1) |
| `Map` en `RegistroClinico` | Acceso por clave (no aplica FIFO/LIFO/secuencial) | Relaciona cada mascota con su historial | Guardar y buscar historial: O(1) promedio |
| Arreglo (comparación) | Secuencial por posición | Compara el costo de manejar turnos con una cola | `push`: O(1) amortizado; `shift`: O(n) |

## MiniReto 9: catálogo anidado

Antes de programar, definí para cada recorrido recursivo:

| Función | Caso base | Reducción | Combinación |
| --- | --- | --- | --- |
| `contarServicios(categoria)` | Si no hay subcategorías, la suma de las ramas es 0 | Cuenta la lista local de servicios y llama la misma función para cada subcategoría | Suma los servicios locales y los totales recursivos |
| `listarCatalogo(categoria, nivel)` | Una categoría sin subcategorías no hace más llamadas | Imprime la categoría y sus servicios; procesa cada subcategoría con `nivel + 1` | La salida de cada rama queda debajo de su padre con `" ".repeat(nivel * 2)` |
| `profundidad(categoria)` | Una categoría sin subcategorías tiene profundidad 1 | Calcula la profundidad de cada subcategoría | Devuelve 1 más la profundidad máxima de las ramas |

`nivel` empieza en 0 para la raíz. El catálogo original tiene 9 servicios y 3 niveles. Al agregar Oftalmología bajo Consultas › Especializada, el recorrido encuentra un servicio adicional y una profundidad de 4 sin cambiar las funciones.
