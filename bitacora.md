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
| Encolar (`encolar` / `push`) | 5,44 ms | 4,15 ms |
| Desencolar (`desencolar` / `shift`) | 0,71 ms | 618,51 ms |

En esta ejecución, `shift()` tardó mucho más porque desplaza los elementos restantes. Los tiempos pueden cambiar según el computador y la carga del sistema.

`encolar` y `desencolar` en la cola enlazada son O(1). En el arreglo, `push` es O(1) amortizado, pero `shift` es O(n): mueve los demás turnos para dejar libre el primer lugar. Por eso la cola enlazada desencola más rápido cuando hay muchos turnos.
