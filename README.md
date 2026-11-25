# Patitas Motor

Patitas Motor guarda historiales clínicos y organiza los turnos de una clínica veterinaria. Usa listas enlazadas para las atenciones, colas para respetar la prioridad de urgencias y pilas para deshacer o rehacer cambios.

## Novedades de v0.2

- La simulación muestra al terminar el orden de atención, las horas de llegada e inicio, los tiempos de espera y sus promedios.
- Al final también imprime los historiales clínicos actualizados de todas las mascotas atendidas.
- Si se intenta llamar un turno con la sala vacía, recepción muestra un aviso y devuelve `null` sin fallar.
- La [bitácora](./bitacora.md) documenta las estructuras, sus principios y las complejidades de sus operaciones principales.

## Ejecutar

Necesitas Node.js. Desde la carpeta del proyecto, puedes ejecutar el reporte de historiales:

```bash
node src/reporte.js
```

Para simular la mañana del sábado —con llegadas, prioridad de urgencias, tiempos de espera, registro de atenciones y corrección de un error— ejecuta:

```bash
node src/simulacion.js
```

La simulación incluye el reporte y los historiales actualizados al finalizar la jornada.

## Pruebas y comparación

```bash
node pruebas/nodos.js
node pruebas/lista.js
node pruebas/cola.js
node pruebas/recepcion.js
node pruebas/pila.js
node pruebas/editor.js
node pruebas/comparar-cola.js
```

`pruebas/nodos.js` muestra la cadena enlazada manualmente de Lola, calcula su costo total y demuestra cómo se trunca el recorrido al perder un enlace.

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
| Eliminar la primera | O(1), se mueve `cabeza` al siguiente nodo | O(n), se desplazan los elementos |
