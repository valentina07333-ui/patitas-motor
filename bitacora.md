# Las atenciones de Lola

Así están conectadas, de la más antigua a la más reciente:

```text
cabeza → [Vacunación, 02/02] → [Control de peso, 15/03] → [Limpieza dental, 20/05] → null
```

En `pruebas/nodos.js` corté el enlace después de la vacunación. Si recorremos la lista desde `cabeza`, solo sale esa atención: como ya no hay flecha hacia la siguiente, el recorrido se acaba. Las otras dos siguen ahí, pero quedaron desconectadas del inicio.
