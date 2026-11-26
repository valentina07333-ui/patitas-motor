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

### Traza de `contarServicios` en Cirugías

La categoría Cirugías no tiene servicios propios y contiene Esterilización (dos servicios) y Limpieza dental (un servicio). Las llamadas se completan de abajo hacia arriba:

```text
contarServicios(Cirugías) inicia total = 0
├─ contarServicios(Esterilización) inicia total = 2
│  └─ no tiene subcategorías → devuelve 2
├─ Cirugías suma 2 → total = 2
├─ contarServicios(Limpieza dental) inicia total = 1
│  └─ no tiene subcategorías → devuelve 1
├─ Cirugías suma 1 → total = 3
└─ devuelve 3
```

Las hojas terminan sin más llamadas recursivas; Cirugías combina los resultados de sus dos ramas (0 + 2 + 1) y devuelve 3.

## MiniReto 10: rutas, búsquedas y paquetes

`buscarServicio` revisa los servicios locales y retorna inmediatamente al encontrar la coincidencia; si no está en esta categoría, reduce el problema recorriendo sus subcategorías. `rutaDeServicio` agrega cada categoría al arreglo de la ruta mientras desciende y la retira al regresar de una rama sin coincidencia; devuelve una copia de la ruta al encontrar el servicio. Si no encuentra el nombre, devuelve `null`. `serviciosEnRango` acumula en un único arreglo los resultados de todas las ramas e incluye ambos límites.

`precioPaquete` separa la suma recursiva del descuento: primero suma todos los precios y después aplica el 10 % una única vez. En Cirugías, los servicios suman $780.000 y el total correcto es $702.000. Si se aplicara el descuento en cada nivel, Esterilización daría $567.000 y Limpieza dental $135.000; luego Cirugías descontaría otra vez esos $702.000 y cobraría $631.800. Ese descuento repetido es incorrecto porque el paquete debe descontar el total completo una sola vez.

Las pruebas buscan `Consulta general` (servicio de una rama superficial), `Gata` (rama profunda) y `Peluquería` (inexistente); también comprueban que la búsqueda corta al hallar un resultado, la categoría vacía, la ruta exacta de Gata, el paquete de Cirugías y los cinco servicios del rango de $80.000 a $150.000.

## MiniReto 11: operaciones recursivas en el historial

Cada método recursivo usa una función auxiliar que recibe el nodo actual. En los cuatro casos, el caso base es `nodo === null`. La recursión avanza a `nodo.siguiente`; al imprimir al revés, cada llamada espera a que termine la llamada siguiente antes de imprimir su propio dato. Por eso la pila de llamadas conserva el camino y produce el orden inverso sin arreglos ni una pila explícita.

`pruebas/recursiva.js` compara tamaño, costo, búsqueda e impresión inversa con resultados iterativos para Lola, Toby y Mía. También ejecuta `tamanioRecursivo()` sobre 100.000 nodos y captura el `RangeError: Maximum call stack size exceeded`: cada nodo agrega una llamada pendiente, así que el consumo de pila es O(n) y excede el límite del motor.

| Operación | Iterativa: tiempo | Iterativa: memoria auxiliar | Recursiva: tiempo | Recursiva: memoria de llamadas |
| --- | --- | --- | --- | --- |
| Tamaño | O(1) usando el contador mantenido por la lista | O(1) | O(n) | O(n) |
| Suma de costos | O(n) | O(1) | O(n) | O(n) |
| Buscar | O(n) | O(1) | O(n) | O(n) en el peor caso; O(1) si coincide con la cabeza |
| Imprimir al revés | O(n) usando un arreglo como pila auxiliar | O(n) | O(n) | O(n), mediante la pila de llamadas |

Dejo como oficiales las versiones iterativas para tamaño, suma y búsqueda: las tres evitan consumir una llamada de pila por nodo; para tamaño, el contador ya ofrece O(1). Mantengo `imprimirAlReves()` recursivo porque el requisito es mostrar el orden inverso sin modificar enlaces ni usar estructuras auxiliares explícitas. Su costo de pila O(n) limita su uso con historiales extremadamente largos, igual que las demás operaciones recursivas.

## Cierre: MiniRetos 1–12 y Patitas v1.0

| MiniReto | Construcción | Estructura elegida y motivo |
| --- | --- | --- |
| 1. La consulta cero | Nodo y recorrido de una cadena | Nodo simple; enlaza un dato con el siguiente |
| 2. El historial clínico como lista | Inserciones al inicio/final y enlaces cabeza/cola | Lista enlazada; inserta atenciones sin desplazar las existentes |
| 3. Corregir el historial | Búsqueda, inserción y eliminación | Lista enlazada; permite localizar datos y reparar enlaces |
| 4. Patitas v0.1 | Historiales por mascota y reporte | Map de historiales y listas de atenciones; acceso por clave y orden clínico |
| 5. La sala de espera | Turnos en orden de llegada | Cola enlazada FIFO; encolar y desencolar en O(1) |
| 6. Urgencias primero | Prioridad y paso del tiempo | Dos colas FIFO, una por tipo de turno |
| 7. Deshacer y rehacer | Acciones reversibles | Dos pilas LIFO; la acción más reciente se revierte primero |
| 8. Patitas v0.2 | Recepción integrada con historiales | Editor, pilas y colas; corrige errores y registra atenciones |
| 9. El catálogo anidado | Conteo, listado y profundidad | Objetos con arreglos y recursión; se adapta a cualquier nivel |
| 10. Rutas y paquetes | Búsqueda, rutas, rangos y descuentos | Recursión con retorno temprano y acumulación de resultados |
| 11. El historial recursivo | Tamaño, suma, búsqueda e impresión inversa recursivos | Llamadas recursivas sobre nodos; se comparan con recorridos iterativos |
| 12. Patitas v1.0 | Demostración, suite final, organización y documentación | Reutiliza las estructuras anteriores en módulos de estructuras y dominio |

La demostración final se ejecuta con `node demo.js`; `node pruebas/todo.js` valida los componentes principales con mensajes `OK` o `FALLA`. El historial de Git conserva commits por los MiniRetos de construcción, con commits separados para los retos 9, 10, 11 y el lanzamiento 1.0.
