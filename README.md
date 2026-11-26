# Patitas Motor v1.0

Patitas Motor es una demostración ejecutable del motor de una clínica veterinaria. Organiza los turnos, prioriza urgencias, mantiene historiales clínicos, permite corregir registros con deshacer/rehacer y consulta un catálogo jerárquico de servicios.

No requiere dependencias externas; necesita Node.js.

## Ejecutar desde cero

Clona el repositorio y entra a su carpeta:

```bash
git clone https://github.com/valentina07333-ui/patitas-motor.git
cd patitas-motor
```

Ejecuta la demostración integrada:

```bash
node demo.js
```

La demostración presenta, en cinco secciones:

1. El catálogo de servicios con su jerarquía y precios.
2. La simulación de la mañana, con urgencias, orden de atención, horas y esperas.
3. Una corrección de registro con deshacer y rehacer.
4. Los historiales clínicos finales de las mascotas atendidas.
5. La ruta de un servicio y el precio de un paquete con descuento.

Para ejecutar por separado el reporte clínico o la simulación:

```bash
node src/reporte.js
node src/simulacion.js
```

## Pruebas

La suite final muestra `OK` o `FALLA` para cada componente y devuelve un código de error si alguna falla:

```bash
node pruebas/todo.js
```

Las pruebas específicas de recursión y catálogo, incluida la prueba controlada del límite de pila con 100.000 nodos, se ejecutan así:

```bash
node pruebas/catalogo.js
node pruebas/recursiva.js
```

También se pueden ejecutar las pruebas detalladas originales:

```bash
node pruebas/nodos.js
node pruebas/recepcion.js
node pruebas/editor.js
node pruebas/comparar-cola.js
```

## Estructuras y módulos

Los módulos están organizados en [src/estructuras](./src/estructuras) y [src/dominio](./src/dominio):

- **Nodo y lista enlazada:** conservan las atenciones de cada mascota en orden cronológico.
- **Cola FIFO:** mantiene turnos de urgencias y consultas generales; recepción llama primero a las urgencias.
- **Pila LIFO:** almacena acciones reversibles que usa el editor para deshacer y rehacer.
- **Map:** relaciona el nombre de cada mascota con su historial.
- **Arreglos:** guardan las listas de servicios y subcategorías del catálogo.
- **Categorías recursivas:** cuentan, muestran, buscan y agrupan servicios sin limitar la profundidad.
- **Editor:** registra y elimina atenciones; una nueva acción descarta la pila de rehacer.

La [bitácora](./bitacora.md) documenta las decisiones, trazas, complejidades y resultados de los MiniRetos.

## Complejidad de las operaciones

`n` es el número de elementos de una estructura; `C` el número de categorías; `S` el número de servicios; `h` la profundidad máxima del catálogo.

| Estructura | Operación | Tiempo | Memoria auxiliar |
| --- | --- | --- | --- |
| Nodo | Crear y acceder a dato/enlace | O(1) | O(1) |
| Lista enlazada | Agregar al inicio o al final | O(1) | O(1) |
| Lista enlazada | Tamaño (contador guardado) | O(1) | O(1) |
| Lista enlazada | Recorrer, buscar, insertar después o eliminar por condición | O(n) | O(1) iterativa |
| Lista enlazada | Convertir a arreglo | O(n) | O(n) |
| Lista enlazada | Tamaño, costo o búsqueda recursivos | O(n) | O(n) pila de llamadas |
| Lista enlazada | Imprimir al revés recursivamente | O(n) | O(n) pila de llamadas |
| Cola enlazada | Encolar, desencolar, ver frente, consultar tamaño/vacía | O(1) | O(1) |
| Pila enlazada | Apilar, desapilar, ver tope, consultar tamaño/vacía | O(1) | O(1) |
| Map clínico | Guardar o buscar historial por mascota | O(1) promedio | O(1) auxiliar por operación; O(m) para guardar m historiales |
| Editor | Agregar atención | O(1) | O(1) por acción |
| Editor | Eliminar, deshacer o rehacer | O(n) peor caso | O(1) por acción, aparte del recorrido |
| Catálogo recursivo | Contar, listar o calcular precio de paquete | O(C + S) | O(h) pila de llamadas |
| Catálogo recursivo | Buscar, obtener ruta o filtrar por precio | O(C + S) | O(h), más el resultado |
| Arreglo | Acceder por índice | O(1) | O(1) |
| Arreglo | `push` al final | O(1) amortizado | O(1) auxiliar; puede crecer al redimensionar |
| Arreglo | Recorrer o buscar | O(n) | O(1) auxiliar |
| Arreglo | `shift` | O(n) | O(1) |

Las operaciones recursivas de la lista usan O(n) memoria de pila y pueden exceder el límite del motor con listas grandes. Para tamaño, costo y búsqueda, el motor conserva como opción oficial la versión iterativa (el tamaño usa el contador O(1)).
