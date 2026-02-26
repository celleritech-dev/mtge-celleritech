# MTGE Ecuador – Matriz de Tratamiento a Gran Escala

Aplicación web para evaluar tratamientos de datos personales según la  
**Resolución SPDP-SPD-2026-0005-R** (Ley Orgánica de Protección de Datos Personales de Ecuador).

## Archivos

| Archivo | Descripción |
|---|---|
| `index.html` | Formulario de evaluación MTGE (6 variables) |
| `dashboard.html` | Panel de control con gráficos y registro |

## Uso local

Abre directamente `index.html` en cualquier navegador. No requiere servidor.

## Publicar en GitHub Pages

1. Sube los dos archivos a un repositorio GitHub (rama `main` o `gh-pages`)  
2. Ve a **Settings → Pages → Deploy from branch**  
3. Selecciona la rama y carpeta raíz `/`  
4. Tu app estará en `https://<usuario>.github.io/<repositorio>/`

## Variables MTGE

| Variable | Rango | Puntos |
|---|---|---|
| Titulares | ≤1 000 / ≤10 000 / ≤100 000 / >100 000 | 1 / 2 / 3 / 4 |
| Volumen | ≤10 / ≤30 / ≤100 / >100 tipos | 0.5 / 1 / 2 / 3 |
| Categorías | Básicos / 1 especial / múltiples-vulnerables-penales | 0.5 / 2 / 3 |
| Frecuencia | Puntual / Periódica / Continua | 0.5 / 1 / 2 |
| Permanencia | <1 año / 1-3 años / ≥3 años | 0.5 / 1 / 2 |
| Geografía | Local / Nacional / Transfronterizo | 1 / 2 / 3 |

**Gran Escala: P ≥ 6 puntos** (Art. 10 Resolución SPDP-SPD-2026-0005-R)

## Legal

Base legal: Resolución SPDP-SPD-2026-0005-R · LOPDP Ecuador  
Superintendencia de Protección de Datos Personales: https://www.datospersonales.gob.ec/
