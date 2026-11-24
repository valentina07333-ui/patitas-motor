# Patitas Motor

Patitas Motor guarda historiales clínicos y organiza los turnos de una clínica veterinaria. Usa listas enlazadas para las atenciones, colas para respetar la prioridad de urgencias y pilas para deshacer o rehacer cambios.

## Ejecutar

Necesitas Node.js. Desde la carpeta del proyecto, puedes ejecutar el reporte de historiales:

```bash
node src/reporte.js
```

Para simular la mañana del sábado —con llegadas, prioridad de urgencias, tiempos de espera, registro de atenciones y corrección de un error— ejecuta:

```bash
node src/simulacion.js
```

## Pruebas y comparación

```bash
node pruebas/lista.js
node pruebas/cola.js
node pruebas/recepcion.js
node pruebas/pila.js
node pruebas/editor.js
node pruebas/comparar-cola.js
```

## Estructuras

- **Lista enlazada:** guarda en orden las atenciones de cada mascota.
- **Map:** relaciona cada mascota con su historial.
- **Colas FIFO:** separan urgencias y consultas generales; las urgencias pasan primero.
- **Pilas LIFO:** permiten deshacer y rehacer acciones del registro.

La bitácora incluye diagramas, decisiones y comparaciones de complejidad.

## Lista enlazada y arreglo

Complejidad de las operaciones principales (n es la cantidad de atenciones):

| Operación | Lista enlazada | Arreglo |
| --- | --- | --- |
| Buscar un dato | O(n) | O(n) |
| Acceder por posición | O(n) | O(1) |
| Agregar al inicio | O(1) | O(n) |
| Agregar al final | O(1) con `cola` | O(1) amortizado |
| Eliminar el último | O(n), hay que buscar el anterior | O(1) |
