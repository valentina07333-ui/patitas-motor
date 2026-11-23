# Patitas Motor

Este proyecto guarda las visitas al veterinario de Lola, Toby y Mía. Al ejecutar el reporte, puedes ver sus atenciones, cuántas tiene cada mascota, cuánto suman y cuándo fue su última vacunación registrada.

## Cómo ejecutarlo

Necesitas tener Node.js instalado. Abre una terminal en esta carpeta y ejecuta:

```bash
node src/reporte.js
```

Para correr las pruebas de la lista enlazada:

```bash
node pruebas/lista.js
```

## Qué estructuras usa

- **Nodo:** guarda una atención y apunta a la siguiente.
- **Lista enlazada:** conecta las atenciones y permite agregarlas, buscarlas, eliminarlas y recorrerlas.
- **Registro clínico:** usa un `Map` para guardar una lista distinta por mascota.
