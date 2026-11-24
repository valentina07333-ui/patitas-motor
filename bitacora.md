# Las atenciones de Lola

La lista va de la atención más antigua a la más reciente:

```text
cabeza → [Vacunación, 02/02] → [Control de peso, 15/03] → [Limpieza dental, 20/05] → null
```

Si `nodoVacunacion.siguiente` queda en `null`, desde `cabeza` solo se llega a la vacunación. Las otras atenciones siguen ahí, pero quedaron desconectadas.

## Agregar una atención

`nuevo` es el nodo que agregamos. Si la lista está vacía, tanto al inicio como al final `cabeza` y `cola` apuntan al mismo nodo:

```text
Antes:    cabeza → null
Después:  cabeza, cola → [nuevo] → null
```

Con un nodo, al inicio `cabeza` cambia; al final cambia el enlace del último nodo:

```text
Inicio:  cabeza → [nuevo] → [A] → null   (cola → [A])
Final:   cabeza → [A] → [nuevo] → null   (cola → [nuevo])
```

Con varios nodos pasa lo mismo: al inicio el nuevo apunta al primero; al final el último apunta al nuevo.

```text
Inicio:  cabeza → [nuevo] → [A] → [B] → null   (cola → [B])
Final:   cabeza → [A] → [B] → [nuevo] → null   (cola → [nuevo])
```

## Complejidad

- `agregarAlInicio` y `agregarAlFinal`: O(1), actualizan unas pocas referencias y no recorren la lista.
- `estaVacia` y `obtenerTamanio`: O(1), consultan una propiedad.
- `recorrer` y `aArreglo`: O(n), visitan cada nodo una vez. `aArreglo` además usa O(n) espacio para guardar los datos.
- Crear una lista: O(1).

## Eliminar un nodo

Así queda la lista en cada caso:

```text
Cabeza:      [A] → [B] → [C]     queda [B] → [C]
Del medio:   [A] → [B] → [C]     queda [A] → [C]
Cola:        [A] → [B] → [C]     queda [A] → [B] (cola ahora es B)
```

- `buscar`, `insertarDespuesDe` y `eliminar`: O(n) en el peor caso, porque recorren la lista.
- Eliminar la cola también es O(n): aunque tenemos `cola`, necesitamos recorrer desde `cabeza` para encontrar el nodo anterior y actualizar su enlace.

## Cola de recepción (FIFO)

Después de encolar a las tres mascotas:

```text
frente → [Lola] → [Toby] → [Mía] ← final
```

Después de llamar a Lola y desencolar una vez:

```text
frente → [Toby] → [Mía] ← final
```

## Comparación de cola y arreglo

Medí 100.000 turnos con `node pruebas/comparar-cola.js`:

| Operación | Cola enlazada | Arreglo |
| --- | ---: | ---: |
| Encolar (`encolar` / `push`) | 5,60 ms | 2,23 ms |
| Desencolar (`desencolar` / `shift`) | 3,07 ms | 612,16 ms |

En esta ejecución, `shift()` tardó mucho más porque desplaza los elementos restantes. Los tiempos pueden cambiar según el computador y la carga del sistema.

`encolar` y `desencolar` en la cola enlazada son O(1). En el arreglo, `push` es O(1) amortizado, pero `shift` es O(n): mueve los demás turnos para dejar libre el primer lugar. Por eso la cola enlazada desencola más rápido cuando hay muchos turnos.

## Simulación del sábado

Cada consulta dura 20 minutos. Solo entra alguien que ya llegó; entre quienes esperan, pasan primero las urgencias y se respeta el orden de llegada.

| Inicio | Mascota | Por qué sigue |
| --- | --- | --- |
| 8:00 | Toby | Llegó a las 8:00; no hay nadie más. |
| 8:20 | Luna | Ya llegó y es urgencia. |
| 8:40 | Kira | Es la siguiente urgencia; llegó a las 8:25. |
| 9:00 | Rocky | Llegó a las 9:00 y es urgencia. |
| 9:20 | Max | Ya no quedan urgencias; es el general que llegó primero. |
| 9:40 | Simón | Siguiente consulta general. |
| 10:00 | Nala | Última consulta general. |

Así, aunque Max llegó antes que Luna, las urgencias que ya estaban esperando pasan primero.

## Pila para deshacer y rehacer

La hice con nodos. `apilar`, `desapilar`, `verTope`, `estaVacia` y `tamanio` son O(1): consultan o cambian el tope y el contador.

## Prueba rápida de deshacer y rehacer

Tope a la izquierda. `+` agrega y `−` elimina.

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

Agregar C borra lo que quedaba por rehacer. Lo comprobé en `pruebas/editor.js`.

## Estructuras del motor

| Estructura | Principio | Uso en Patitas | Operaciones principales |
| --- | --- | --- | --- |
| `Nodo` y lista enlazada | Secuencial | Guardan las atenciones de cada mascota | Agregar al inicio/final: O(1); buscar, eliminar y recorrer: O(n) |
| `Cola` | FIFO | Ordena los turnos por llegada | Encolar y desencolar: O(1) |
| `Pila` | LIFO | Guarda acciones para deshacer y rehacer | Apilar, desapilar y ver el tope: O(1) |
| `Map` en `RegistroClinico` | Acceso por clave | Encuentra el historial de cada mascota | Guardar y buscar historial: O(1) promedio |
| Arreglo | Secuencial por posición | Comparación con la cola enlazada | `push`: O(1) amortizado; `shift`: O(n) |
