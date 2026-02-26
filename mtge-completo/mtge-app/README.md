# 🛡️ MTGE - Matriz de Tratamiento a Gran Escala

## Aplicación Web para la LOPDP de Ecuador

Esta es una aplicación web completa para evaluar si un tratamiento de datos personales se considera de **Gran Escala** según la **Ley Orgánica de Protección de Datos Personales (LOPDP)** de Ecuador.

### 📋 Base Legal
- **Resolución:** SPDP-SPD-2026-0005-R
- **Organismo:** Superintendencia de Protección de Datos Personales de Ecuador
- **Normativa:** Ley Orgánica de Protección de Datos Personales (LOPDP)

## ✨ Características

### 🎯 Funcionalidades Principales
1. **Cálculo Automático:** Calcula automáticamente el puntaje MTGE basado en 6 variables
2. **Validación en Tiempo Real:** Actualiza puntuaciones mientras ingresas datos
3. **Clasificación Automática:** Determina si es tratamiento de gran escala (≥ 6 puntos)
4. **Obligaciones Legales:** Muestra las obligaciones derivadas según la clasificación
5. **Exportación PDF:** Genera reportes profesionales en formato PDF
6. **Interfaz Intuitiva:** Diseño moderno y fácil de usar
7. **Responsive:** Funciona en desktop, tablet y móvil

### 📊 Variables Evaluadas

La aplicación evalúa las 6 variables establecidas en la Resolución:

1. **Número de Titulares** (12 meses)
   - 0-1,000: 1 punto
   - 1,001-10,000: 2 puntos
   - 10,001-100,000: 3 puntos
   - >101,000: 4 puntos

2. **Volumen de Datos** (tipos de datos por titular)
   - Hasta 10: 0.5 puntos
   - 11-30: 1 punto
   - 31-100: 2 puntos
   - >101: 3 puntos

3. **Categorías de Datos**
   - Solo básicos: 0.5 puntos
   - Una categoría especial: 2 puntos
   - Múltiples especiales/vulnerables/penales: 3 puntos

4. **Frecuencia del Tratamiento**
   - Puntual: 0.5 puntos
   - Periódica: 1 punto
   - Continua: 2 puntos

5. **Permanencia del Tratamiento**
   - Ocasional (<1 año): 0.5 puntos
   - Temporal (1-3 años): 1 punto
   - Prolongada (≥3 años): 2 puntos

6. **Alcance Geográfico**
   - Local: 1 punto
   - Nacional: 2 puntos
   - Transfronterizo/Global: 3 puntos

### 📈 Fórmula de Cálculo

```
P = Ttitulares + Tvolumen + Tcategorías + Tfrecuencia + Tpermanencia + Tgeografía
```

**Umbral de Gran Escala:** P ≥ 6 puntos

## 🚀 Instalación y Uso

### Opción 1: Uso Directo (Sin Servidor)
1. Descarga todos los archivos
2. Abre `index.html` en tu navegador web
3. ¡Listo! La aplicación funciona completamente offline

### Opción 2: Servidor Local (Recomendado)

#### Usando Python:
```bash
# Python 3
python -m http.server 8000

# Luego abre: http://localhost:8000
```

#### Usando Node.js:
```bash
npx http-server -p 8000

# Luego abre: http://localhost:8000
```

#### Usando Live Server (VS Code):
1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

## 📁 Estructura de Archivos

```
mtge-app/
│
├── index.html          # Estructura HTML de la aplicación
├── styles.css          # Estilos y diseño responsivo
├── script.js           # Lógica de cálculo y funcionalidades
└── README.md           # Esta documentación
```

## 💡 Cómo Usar la Aplicación

### Paso 1: Información General
Completa los datos básicos del tratamiento:
- Nombre del tratamiento
- Responsable
- Finalidad
- Fecha de evaluación

### Paso 2: Evaluar las 6 Variables
Para cada variable, ingresa o selecciona los valores correspondientes:
- La puntuación se actualiza automáticamente
- Las tablas de referencia ayudan a entender los rangos

### Paso 3: Calcular y Revisar
- Click en **"Calcular Puntuación"**
- Revisa el desglose completo
- Verifica la clasificación (Gran Escala o No)
- Consulta las obligaciones legales aplicables

### Paso 4: Exportar (Opcional)
- Click en **"Exportar a PDF"** para generar un reporte
- El PDF incluye todos los datos y resultados
- Ideal para documentación y auditorías

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --primary-color: #2563eb;    /* Color principal */
    --success-color: #10b981;    /* Color de éxito */
    --danger-color: #ef4444;     /* Color de alerta */
}
```

### Modificar Textos
Los textos están en español y pueden editarse directamente en `index.html`

### Ajustar Puntajes
Si necesitas modificar los rangos de puntuación, edita las funciones en `script.js`:
- `calculateTitularesScore()`
- `calculateVolumenScore()`

## ⚖️ Obligaciones Legales

### Si es Tratamiento de Gran Escala (≥ 6 puntos):

1. **Evaluación de Impacto (EIPD)**
   - Obligatoria antes de iniciar el tratamiento
   - Debe documentar riesgos y medidas de mitigación

2. **Delegado de Protección de Datos (DPD)**
   - Designación obligatoria
   - Debe cumplir requisitos establecidos en la normativa

3. **Registro de Actividades de Tratamiento (RAT)**
   - Incorporación del tratamiento
   - Incluir evidencia del cálculo MTGE

4. **Responsabilidad Proactiva Reforzada**
   - Medidas adicionales de accountability
   - Documentación exhaustiva

5. **Revisión Periódica**
   - Al menos una vez al año
   - Cuando haya cambios sustanciales

6. **Documentación**
   - Conservar evidencia por 5 años mínimo
   - Disponible para auditorías

## 🔒 Privacidad y Seguridad

- **Procesamiento Local:** Todos los cálculos se realizan en el navegador
- **Sin Envío de Datos:** No se transmite información a servidores externos
- **Sin Cookies:** No se utilizan cookies ni tracking
- **Código Abierto:** Todo el código es auditable

## 📱 Compatibilidad

- ✅ Chrome/Edge (Recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Navegadores móviles

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica
- **CSS3:** Diseño moderno y responsivo
- **JavaScript Vanilla:** Sin dependencias externas
- **Print CSS:** Exportación optimizada a PDF

## 📞 Soporte y Consultas Oficiales

Para consultas oficiales sobre la LOPDP, contacta a:

**Superintendencia de Protección de Datos Personales (SPDP)**
- Web: https://www.datospersonales.gob.ec/
- Email: info@datospersonales.gob.ec

## ⚠️ Aviso Legal

Esta aplicación es una **herramienta de apoyo** para facilitar el cálculo de la MTGE. No constituye asesoría legal oficial. Para interpretaciones vinculantes y consultas específicas, diríjase a la Superintendencia de Protección de Datos Personales de Ecuador.

## 📄 Licencia

Esta aplicación ha sido desarrollada con fines educativos y de cumplimiento normativo. Puede ser utilizada libremente por organizaciones que necesiten evaluar sus tratamientos de datos personales según la LOPDP de Ecuador.

---

**Versión:** 1.0.0  
**Fecha:** 2026  
**Base Legal:** Resolución SPDP-SPD-2026-0005-R  

---

## 🎯 Ejemplos de Uso

### Ejemplo 1: Sistema de Nómina
- **Titulares:** 500 empleados → 1 punto
- **Volumen:** 25 tipos de datos → 1 punto
- **Categorías:** Datos básicos + salud → 2 puntos
- **Frecuencia:** Mensual (periódica) → 1 punto
- **Permanencia:** 5 años → 2 puntos
- **Geografía:** Nacional → 2 puntos
- **Total:** 9 puntos → **GRAN ESCALA** ✓

### Ejemplo 2: Newsletter Simple
- **Titulares:** 800 suscriptores → 1 punto
- **Volumen:** 5 tipos de datos → 0.5 puntos
- **Categorías:** Solo básicos → 0.5 puntos
- **Frecuencia:** Semanal → 1 punto
- **Permanencia:** 2 años → 1 punto
- **Geografía:** Local → 1 punto
- **Total:** 5 puntos → **NO ES GRAN ESCALA**

---

**¿Necesitas ayuda?** Revisa la documentación oficial de la SPDP o consulta con un profesional en protección de datos.