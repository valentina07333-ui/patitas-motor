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
