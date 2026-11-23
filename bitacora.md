# Las atenciones de Lola

Así quedan conectadas, de la más antigua a la más reciente:

```text
cabeza → [Vacunación, 02/02] → [Control de peso, 15/03] → [Limpieza dental, 20/05] → null
```

Si ponemos `null` en `nodoVacunacion.siguiente`, el recorrido desde `cabeza` solo muestra la vacunación. Las otras atenciones siguen creadas, pero ya no hay una flecha que permita llegar a ellas desde el inicio.
