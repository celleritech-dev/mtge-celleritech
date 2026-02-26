// Dashboard MTGE - JavaScript Principal

// Base de datos simulada (en producción, conectar con backend)
let tratamientosData = [];
let charts = {};

// Cargar datos iniciales
document.addEventListener('DOMContentLoaded', function() {
    inicializarDashboard();
    cargarDatosDemo();
    cargarDatos();
});

// Inicializar dashboard
function inicializarDashboard() {
    // Configurar navegación
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            cambiarSeccion(section);
        });
    });
}

// Cambiar sección activa
function cambiarSeccion(seccionId) {
    // Actualizar nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
    
    // Actualizar secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(seccionId + '-section').classList.add('active');
    
    // Actualizar título
    const titles = {
        'overview': 'Resumen General',
        'treatments': 'Tratamientos Registrados',
        'analytics': 'Análisis Detallado',
        'compliance': 'Cumplimiento Normativo',
        'risks': 'Gestión de Riesgos',
        'reports': 'Reportes y Exportaciones'
    };
    
    document.getElementById('sectionTitle').textContent = titles[seccionId];
    document.getElementById('breadcrumb').textContent = titles[seccionId];
}

// Cargar datos de demostración
function cargarDatosDemo() {
    tratamientosData = [
        {
            id: 1,
            nombre: "Sistema de Nómina",
            responsable: "Recursos Humanos",
            fecha: "2026-01-15",
            titulares: 1500,
            volumen: 30,
            categorias: 2,
            frecuencia: 2,
            permanencia: 2,
            geografia: 2,
            puntaje: 11,
            clasificacion: "gran-escala"
        },
        {
            id: 2,
            nombre: "CRM Ventas",
            responsable: "Departamento Comercial",
            fecha: "2026-01-20",
            titulares: 5000,
            volumen: 25,
            categorias: 0.5,
            frecuencia: 2,
            permanencia: 2,
            geografia: 2,
            puntaje: 9.5,
            clasificacion: "gran-escala"
        },
        {
            id: 3,
            nombre: "Newsletter Marketing",
            responsable: "Marketing",
            fecha: "2026-02-01",
            titulares: 800,
            volumen: 8,
            categorias: 0.5,
            frecuencia: 1,
            permanencia: 1,
            geografia: 1,
            puntaje: 4.5,
            clasificacion: "no-gran-escala"
        },
        {
            id: 4,
            nombre: "Portal de Empleados",
            responsable: "TI",
            fecha: "2026-02-10",
            titulares: 1200,
            volumen: 35,
            categorias: 2,
            frecuencia: 2,
            permanencia: 2,
            geografia: 1,
            puntaje: 10,
            clasificacion: "gran-escala"
        },
        {
            id: 5,
            nombre: "Sistema de Registro Visitantes",
            responsable: "Seguridad",
            fecha: "2026-02-15",
            titulares: 500,
            volumen: 5,
            categorias: 0.5,
            frecuencia: 0.5,
            permanencia: 0.5,
            geografia: 1,
            puntaje: 3.5,
            clasificacion: "no-gran-escala"
        },
        {
            id: 6,
            nombre: "Plataforma E-learning",
            responsable: "Capacitación",
            fecha: "2026-01-25",
            titulares: 2500,
            volumen: 20,
            categorias: 0.5,
            frecuencia: 2,
            permanencia: 2,
            geografia: 2,
            puntaje: 8.5,
            clasificacion: "gran-escala"
        }
    ];
}

// Cargar y actualizar todos los datos
function cargarDatos() {
    actualizarKPIs();
    actualizarGraficos();
    actualizarTabla();
    actualizarAlertas();
    actualizarCumplimiento();
    actualizarRiesgos();
    llenarComparadores();
}

// Actualizar KPIs
function actualizarKPIs() {
    const total = tratamientosData.length;
    const granEscala = tratamientosData.filter(t => t.clasificacion === "gran-escala").length;
    const promedioScore = (tratamientosData.reduce((sum, t) => sum + t.puntaje, 0) / total).toFixed(1);
    const totalTitulares = tratamientosData.reduce((sum, t) => sum + t.titulares, 0);
    
    document.getElementById('totalTratamientos').textContent = total;
    document.getElementById('granEscala').textContent = granEscala;
    document.getElementById('granEscalaPct').textContent = `${Math.round(granEscala/total*100)}% del total`;
    document.getElementById('promedioScore').textContent = promedioScore;
    document.getElementById('totalTitulares').textContent = totalTitulares.toLocaleString();
}

// Actualizar gráficos
function actualizarGraficos() {
    // Gráfico de clasificación (Pie)
    const clasificacionCtx = document.getElementById('clasificacionChart');
    if (charts.clasificacion) charts.clasificacion.destroy();
    
    const granEscala = tratamientosData.filter(t => t.clasificacion === "gran-escala").length;
    const noGranEscala = tratamientosData.length - granEscala;
    
    charts.clasificacion = new Chart(clasificacionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Gran Escala', 'No Gran Escala'],
            datasets: [{
                data: [granEscala, noGranEscala],
                backgroundColor: ['#ef4444', '#10b981'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Gráfico de distribución de puntuaciones
    const scoreDistCtx = document.getElementById('scoreDistChart');
    if (charts.scoreDist) charts.scoreDist.destroy();
    
    const scoreRanges = {
        '0-3': 0, '3-6': 0, '6-9': 0, '9-12': 0, '12+': 0
    };
    
    tratamientosData.forEach(t => {
        if (t.puntaje < 3) scoreRanges['0-3']++;
        else if (t.puntaje < 6) scoreRanges['3-6']++;
        else if (t.puntaje < 9) scoreRanges['6-9']++;
        else if (t.puntaje < 12) scoreRanges['9-12']++;
        else scoreRanges['12+']++;
    });
    
    charts.scoreDist = new Chart(scoreDistCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(scoreRanges),
            datasets: [{
                label: 'Número de Tratamientos',
                data: Object.values(scoreRanges),
                backgroundColor: '#3b82f6',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    
    // Gráfico de evolución temporal
    const evolucionCtx = document.getElementById('evolucionChart');
    if (charts.evolucion) charts.evolucion.destroy();
    
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    const dataEvolucion = [2, 4, 4, 5, 6, 6]; // Datos simulados
    
    charts.evolucion = new Chart(evolucionCtx, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [{
                label: 'Tratamientos Registrados',
                data: dataEvolucion,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    
    // Gráfico de variables críticas
    const variablesCtx = document.getElementById('variablesChart');
    if (charts.variables) charts.variables.destroy();
    
    const promedios = {
        'Titulares': tratamientosData.reduce((sum, t) => sum + calcularPuntosTitulares(t.titulares), 0) / tratamientosData.length,
        'Volumen': tratamientosData.reduce((sum, t) => sum + calcularPuntosVolumen(t.volumen), 0) / tratamientosData.length,
        'Categorías': tratamientosData.reduce((sum, t) => sum + t.categorias, 0) / tratamientosData.length,
        'Frecuencia': tratamientosData.reduce((sum, t) => sum + t.frecuencia, 0) / tratamientosData.length,
        'Permanencia': tratamientosData.reduce((sum, t) => sum + t.permanencia, 0) / tratamientosData.length,
        'Geografía': tratamientosData.reduce((sum, t) => sum + t.geografia, 0) / tratamientosData.length
    };
    
    charts.variables = new Chart(variablesCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(promedios),
            datasets: [{
                label: 'Promedio de Puntos',
                data: Object.values(promedios),
                backgroundColor: [
                    '#3b82f6', '#10b981', '#f59e0b', 
                    '#ef4444', '#8b5cf6', '#06b6d4'
                ],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 4
                }
            }
        }
    });
    
    // Gráfico Radar para Analytics
    actualizarGraficoRadar();
    
    // Gráficos adicionales de Analytics
    actualizarGraficosAnalytics();
}

// Actualizar gráfico radar
function actualizarGraficoRadar() {
    const radarCtx = document.getElementById('variablesRadarChart');
    if (charts.radar) charts.radar.destroy();
    
    const promedios = {
        'Titulares': tratamientosData.reduce((sum, t) => sum + calcularPuntosTitulares(t.titulares), 0) / tratamientosData.length,
        'Volumen': tratamientosData.reduce((sum, t) => sum + calcularPuntosVolumen(t.volumen), 0) / tratamientosData.length,
        'Categorías': tratamientosData.reduce((sum, t) => sum + t.categorias, 0) / tratamientosData.length,
        'Frecuencia': tratamientosData.reduce((sum, t) => sum + t.frecuencia, 0) / tratamientosData.length,
        'Permanencia': tratamientosData.reduce((sum, t) => sum + t.permanencia, 0) / tratamientosData.length,
        'Geografía': tratamientosData.reduce((sum, t) => sum + t.geografia, 0) / tratamientosData.length
    };
    
    charts.radar = new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: Object.keys(promedios),
            datasets: [{
                label: 'Promedio de Puntuación',
                data: Object.values(promedios),
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: '#2563eb',
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#2563eb'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 4
                }
            }
        }
    });
}

// Actualizar gráficos de analytics
function actualizarGraficosAnalytics() {
    // Categorías
    const categoriasCtx = document.getElementById('categoriasChart');
    if (charts.categorias) charts.categorias.destroy();
    
    const catCount = {
        'Solo Básicos': tratamientosData.filter(t => t.categorias === 0.5).length,
        'Una Especial': tratamientosData.filter(t => t.categorias === 2).length,
        'Múltiples Especiales': tratamientosData.filter(t => t.categorias === 3).length
    };
    
    charts.categorias = new Chart(categoriasCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(catCount),
            datasets: [{
                data: Object.values(catCount),
                backgroundColor: ['#10b981', '#f59e0b', '#ef4444']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Geografía
    const geografiaCtx = document.getElementById('geografiaChart');
    if (charts.geografia) charts.geografia.destroy();
    
    const geoCount = {
        'Local': tratamientosData.filter(t => t.geografia === 1).length,
        'Nacional': tratamientosData.filter(t => t.geografia === 2).length,
        'Transfronterizo': tratamientosData.filter(t => t.geografia === 3).length
    };
    
    charts.geografia = new Chart(geografiaCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(geoCount),
            datasets: [{
                data: Object.values(geoCount),
                backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Frecuencia y Permanencia (gráficos similares)
    actualizarGraficoFrecuencia();
    actualizarGraficoPermanencia();
}

function actualizarGraficoFrecuencia() {
    const ctx = document.getElementById('frecuenciaChart');
    if (charts.frecuencia) charts.frecuencia.destroy();
    
    const freqCount = {
        'Puntual': tratamientosData.filter(t => t.frecuencia === 0.5).length,
        'Periódica': tratamientosData.filter(t => t.frecuencia === 1).length,
        'Continua': tratamientosData.filter(t => t.frecuencia === 2).length
    };
    
    charts.frecuencia = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(freqCount),
            datasets: [{
                data: Object.values(freqCount),
                backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function actualizarGraficoPermanencia() {
    const ctx = document.getElementById('permanenciaChart');
    if (charts.permanencia) charts.permanencia.destroy();
    
    const permCount = {
        'Ocasional': tratamientosData.filter(t => t.permanencia === 0.5).length,
        'Temporal': tratamientosData.filter(t => t.permanencia === 1).length,
        'Prolongada': tratamientosData.filter(t => t.permanencia === 2).length
    };
    
    charts.permanencia = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(permCount),
            datasets: [{
                data: Object.values(permCount),
                backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Funciones auxiliares de cálculo
function calcularPuntosTitulares(num) {
    if (num <= 1000) return 1;
    if (num <= 10000) return 2;
    if (num <= 100000) return 3;
    return 4;
}

function calcularPuntosVolumen(num) {
    if (num <= 10) return 0.5;
    if (num <= 30) return 1;
    if (num <= 100) return 2;
    return 3;
}

// Continúa en la siguiente parte...
// Actualizar tabla de tratamientos
function actualizarTabla() {
    const tbody = document.getElementById('tratamientosTableBody');
    tbody.innerHTML = '';
    
    tratamientosData.forEach(t => {
        const row = `
            <tr>
                <td>${t.nombre}</td>
                <td>${t.responsable}</td>
                <td>${new Date(t.fecha).toLocaleDateString('es-EC')}</td>
                <td><strong>${t.puntaje}</strong></td>
                <td><span class="badge ${t.clasificacion}">${t.clasificacion === 'gran-escala' ? 'Gran Escala' : 'No Gran Escala'}</span></td>
                <td>${t.titulares.toLocaleString()}</td>
                <td>
                    <button class="btn-action btn-view" onclick="verDetalle(${t.id})">👁️</button>
                    <button class="btn-action btn-edit" onclick="editarTratamiento(${t.id})">✏️</button>
                    <button class="btn-action btn-delete" onclick="eliminarTratamiento(${t.id})">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Filtrar tabla
function filtrarTabla() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const clasificacion = document.getElementById('filterClasificacion').value;
    
    const filtered = tratamientosData.filter(t => {
        const matchSearch = t.nombre.toLowerCase().includes(searchTerm) || 
                          t.responsable.toLowerCase().includes(searchTerm);
        const matchClasif = !clasificacion || t.clasificacion === clasificacion;
        return matchSearch && matchClasif;
    });
    
    // Actualizar tabla con datos filtrados
    const tbody = document.getElementById('tratamientosTableBody');
    tbody.innerHTML = '';
    
    filtered.forEach(t => {
        const row = `
            <tr>
                <td>${t.nombre}</td>
                <td>${t.responsable}</td>
                <td>${new Date(t.fecha).toLocaleDateString('es-EC')}</td>
                <td><strong>${t.puntaje}</strong></td>
                <td><span class="badge ${t.clasificacion}">${t.clasificacion === 'gran-escala' ? 'Gran Escala' : 'No Gran Escala'}</span></td>
                <td>${t.titulares.toLocaleString()}</td>
                <td>
                    <button class="btn-action btn-view" onclick="verDetalle(${t.id})">👁️</button>
                    <button class="btn-action btn-edit" onclick="editarTratamiento(${t.id})">✏️</button>
                    <button class="btn-action btn-delete" onclick="eliminarTratamiento(${t.id})">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Actualizar alertas
function actualizarAlertas() {
    const container = document.getElementById('alertsContainer');
    container.innerHTML = '';
    
    const granEscala = tratamientosData.filter(t => t.clasificacion === 'gran-escala');
    
    if (granEscala.length > 0) {
        container.innerHTML += `
            <div class="alert alert-danger">
                <div class="alert-content">
                    <h4>⚠️ ${granEscala.length} tratamientos de Gran Escala detectados</h4>
                    <p>Requieren medidas especiales de cumplimiento según Art. 12 de la Resolución</p>
                </div>
                <button class="btn-action btn-view" onclick="verGranEscala()">Ver detalles</button>
            </div>
        `;
    }
    
    const promedioAlto = tratamientosData.filter(t => t.puntaje > 9).length;
    if (promedioAlto > 0) {
        container.innerHTML += `
            <div class="alert alert-warning">
                <div class="alert-content">
                    <h4>📊 ${promedioAlto} tratamientos con puntuación alta (>9)</h4>
                    <p>Considere revisión prioritaria de medidas de seguridad</p>
                </div>
            </div>
        `;
    }
    
    container.innerHTML += `
        <div class="alert alert-info">
            <div class="alert-content">
                <h4>📅 Próxima revisión anual obligatoria</h4>
                <p>Según Art. 13, debe actualizar evaluaciones MTGE al menos una vez al año</p>
            </div>
        </div>
    `;
}

// Actualizar cumplimiento
function actualizarCumplimiento() {
    const granEscala = tratamientosData.filter(t => t.clasificacion === 'gran-escala').length;
    
    document.getElementById('obligacionesActivas').textContent = granEscala;
    document.getElementById('eipdRequeridas').textContent = granEscala;
    document.getElementById('dpdRequeridos').textContent = granEscala;
    document.getElementById('ratRequeridos').textContent = granEscala;
    
    // Detalle de obligaciones
    const detalleContainer = document.getElementById('obligacionesDetalle');
    detalleContainer.innerHTML = '';
    
    tratamientosData.filter(t => t.clasificacion === 'gran-escala').forEach(t => {
        detalleContainer.innerHTML += `
            <div class="obligation-item">
                <h4>${t.nombre}</h4>
                <p><strong>Obligaciones:</strong></p>
                <ul>
                    <li>✓ Realizar Evaluación de Impacto (EIPD)</li>
                    <li>✓ Designar Delegado de Protección de Datos</li>
                    <li>✓ Incorporar al Registro de Actividades (RAT)</li>
                    <li>✓ Aplicar medidas reforzadas de responsabilidad</li>
                </ul>
            </div>
        `;
    });
}

// Actualizar riesgos
function actualizarRiesgos() {
    const alto = tratamientosData.filter(t => t.puntaje >= 10).length;
    const medio = tratamientosData.filter(t => t.puntaje >= 6 && t.puntaje < 10).length;
    const bajo = tratamientosData.filter(t => t.puntaje < 6).length;
    
    document.getElementById('riskHigh').textContent = alto;
    document.getElementById('riskMedium').textContent = medio;
    document.getElementById('riskLow').textContent = bajo;
    
    // Gráfico de análisis de riesgo
    const ctx = document.getElementById('riskAnalysisChart');
    if (charts.riskAnalysis) charts.riskAnalysis.destroy();
    
    charts.riskAnalysis = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Riesgo Alto', 'Riesgo Medio', 'Riesgo Bajo'],
            datasets: [{
                label: 'Número de Tratamientos',
                data: [alto, medio, bajo],
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Recomendaciones
    const recsContainer = document.getElementById('recommendationsContainer');
    recsContainer.innerHTML = '';
    
    if (alto > 0) {
        recsContainer.innerHTML += `
            <div class="alert alert-danger">
                <div class="alert-content">
                    <h4>Tratamientos de Alto Riesgo</h4>
                    <p><strong>Recomendaciones:</strong></p>
                    <ul>
                        <li>Realizar EIPD inmediatamente</li>
                        <li>Implementar controles de seguridad reforzados</li>
                        <li>Revisión trimestral obligatoria</li>
                        <li>Documentación exhaustiva de todas las operaciones</li>
                    </ul>
                </div>
            </div>
        `;
    }
}

// Llenar selectores de comparación
function llenarComparadores() {
    const select1 = document.getElementById('compare1');
    const select2 = document.getElementById('compare2');
    
    select1.innerHTML = '<option value="">Seleccionar tratamiento 1</option>';
    select2.innerHTML = '<option value="">Seleccionar tratamiento 2</option>';
    
    tratamientosData.forEach(t => {
        select1.innerHTML += `<option value="${t.id}">${t.nombre}</option>`;
        select2.innerHTML += `<option value="${t.id}">${t.nombre}</option>`;
    });
}

// Actualizar comparación
function actualizarComparacion() {
    const id1 = parseInt(document.getElementById('compare1').value);
    const id2 = parseInt(document.getElementById('compare2').value);
    
    if (!id1 || !id2) {
        document.getElementById('comparisonResult').innerHTML = '<p class="placeholder-text">Selecciona dos tratamientos para compararlos</p>';
        return;
    }
    
    const t1 = tratamientosData.find(t => t.id === id1);
    const t2 = tratamientosData.find(t => t.id === id2);
    
    document.getElementById('comparisonResult').innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <h3>${t1.nombre}</h3>
                <p><strong>Puntuación:</strong> ${t1.puntaje}</p>
                <p><strong>Clasificación:</strong> ${t1.clasificacion === 'gran-escala' ? 'Gran Escala' : 'No Gran Escala'}</p>
                <p><strong>Titulares:</strong> ${t1.titulares.toLocaleString()}</p>
                <p><strong>Volumen datos:</strong> ${t1.volumen}</p>
            </div>
            <div>
                <h3>${t2.nombre}</h3>
                <p><strong>Puntuación:</strong> ${t2.puntaje}</p>
                <p><strong>Clasificación:</strong> ${t2.clasificacion === 'gran-escala' ? 'Gran Escala' : 'No Gran Escala'}</p>
                <p><strong>Titulares:</strong> ${t2.titulares.toLocaleString()}</p>
                <p><strong>Volumen datos:</strong> ${t2.volumen}</p>
            </div>
        </div>
        <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 8px;">
            <h4>Análisis Comparativo:</h4>
            <p><strong>Diferencia de puntuación:</strong> ${Math.abs(t1.puntaje - t2.puntaje).toFixed(1)} puntos</p>
            <p>${t1.puntaje > t2.puntaje ? t1.nombre : t2.nombre} tiene mayor puntuación y representa mayor riesgo.</p>
        </div>
    `;
}

// Ver detalle de tratamiento
function verDetalle(id) {
    const t = tratamientosData.find(tr => tr.id === id);
    if (!t) return;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h2>${t.nombre}</h2>
        <hr style="margin: 15px 0;">
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <h3>Información General</h3>
                <p><strong>Responsable:</strong> ${t.responsable}</p>
                <p><strong>Fecha:</strong> ${new Date(t.fecha).toLocaleDateString('es-EC')}</p>
                <p><strong>Clasificación:</strong> <span class="badge ${t.clasificacion}">${t.clasificacion === 'gran-escala' ? 'Gran Escala' : 'No Gran Escala'}</span></p>
            </div>
            
            <div>
                <h3>Puntuación MTGE</h3>
                <p><strong>Puntuación Total:</strong> ${t.puntaje} puntos</p>
                <p style="color: ${t.puntaje >= 6 ? '#ef4444' : '#10b981'};">
                    ${t.puntaje >= 6 ? '⚠️ Supera el umbral de 6 puntos' : '✅ No supera el umbral'}
                </p>
            </div>
        </div>
        
        <h3 style="margin-top: 20px;">Desglose por Variables</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Variable</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Valor</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Puntos</strong></td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Número de Titulares</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${t.titulares.toLocaleString()}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${calcularPuntosTitulares(t.titulares)}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Volumen de Datos</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${t.volumen} tipos</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${calcularPuntosVolumen(t.volumen)}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Categorías de Datos</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">-</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${t.categorias}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Frecuencia</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">-</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${t.frecuencia}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Permanencia</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">-</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${t.permanencia}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Geografía</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">-</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${t.geografia}</td>
            </tr>
        </table>
        
        ${t.clasificacion === 'gran-escala' ? `
            <div style="margin-top: 20px; padding: 15px; background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 4px;">
                <h4>⚠️ Obligaciones Legales Aplicables</h4>
                <ul>
                    <li>Realizar Evaluación de Impacto en la Protección de Datos (EIPD)</li>
                    <li>Designar Delegado de Protección de Datos (DPD)</li>
                    <li>Incorporar al Registro de Actividades de Tratamiento (RAT)</li>
                    <li>Aplicar medidas reforzadas de responsabilidad proactiva</li>
                    <li>Revisar y actualizar anualmente</li>
                </ul>
            </div>
        ` : ''}
    `;
    
    document.getElementById('detailModal').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('detailModal').style.display = 'none';
}

// Funciones de acción
function editarTratamiento(id) {
    alert('Función de edición en desarrollo. Redirigir a formulario MTGE con datos precargados.');
}

function eliminarTratamiento(id) {
    if (confirm('¿Está seguro de eliminar este tratamiento?')) {
        tratamientosData = tratamientosData.filter(t => t.id !== id);
        cargarDatos();
        alert('Tratamiento eliminado exitosamente');
    }
}

function verGranEscala() {
    document.getElementById('filterClasificacion').value = 'gran-escala';
    cambiarSeccion('treatments');
    filtrarTabla();
}

// Exportar tabla a CSV
function exportarTabla() {
    let csv = 'Tratamiento,Responsable,Fecha,Puntuación,Clasificación,Titulares\n';
    
    tratamientosData.forEach(t => {
        csv += `"${t.nombre}","${t.responsable}","${t.fecha}",${t.puntaje},"${t.clasificacion}",${t.titulares}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tratamientos_mtge_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}

// Filtrar por período
function filtrarPorPeriodo() {
    const periodo = document.getElementById('periodFilter').value;
    // Implementar filtrado por período
    console.log('Filtrar por período:', periodo);
}

// Descargar gráfico
function descargarGrafico(chartId) {
    const canvas = document.getElementById(chartId);
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `grafico_${chartId}_${new Date().toISOString().split('T')[0]}.png`;
    a.click();
}

// Funciones de generación de reportes
function generarReporteEjecutivo() {
    alert('Generando Reporte Ejecutivo en PDF...\n\nEste reporte incluirá:\n- KPIs principales\n- Gráficos de tendencias\n- Resumen de cumplimiento\n- Recomendaciones ejecutivas');
}

function generarReporteCumplimiento() {
    alert('Generando Reporte de Cumplimiento en PDF...\n\nEste reporte incluirá:\n- Estado de obligaciones legales\n- Tratamientos de Gran Escala\n- Acciones requeridas\n- Timeline de cumplimiento');
}

function generarReporteRiesgos() {
    alert('Generando Reporte de Riesgos en PDF...\n\nEste reporte incluirá:\n- Matriz de riesgos\n- Análisis por tratamiento\n- Recomendaciones de mitigación\n- Plan de acción');
}

function generarReporteTendencias() {
    alert('Generando Reporte de Tendencias en PDF...\n\nEste reporte incluirá:\n- Evolución temporal\n- Análisis predictivo\n- Comparativas período a período\n- Proyecciones');
}

function exportarExcel() {
    alert('Exportando base de datos completa a Excel...\n\nEl archivo incluirá:\n- Todos los tratamientos\n- Desglose completo de variables\n- Cálculos MTGE\n- Metadata adicional');
}

function configurarReporteProgramado() {
    alert('Configuración de Reportes Programados\n\nCaracterísticas:\n- Envío automático por email\n- Frecuencia configurable\n- Múltiples destinatarios\n- Personalización de contenido');
}

// Importar datos
function importarDatos() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                tratamientosData = data;
                cargarDatos();
                alert('✅ Datos importados exitosamente');
            } catch (error) {
                alert('❌ Error al importar datos. Verifique el formato del archivo.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// Cerrar modal al hacer click fuera
window.onclick = function(event) {
    const modal = document.getElementById('detailModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

console.log('✅ Dashboard MTGE cargado exitosamente');
