// MTGE - Cálculo y Gestión de Puntuación

// Función para calcular puntuación de titulares
function calculateTitularesScore(numTitulares) {
    if (numTitulares <= 1000) return 1;
    if (numTitulares <= 10000) return 2;
    if (numTitulares <= 100000) return 3;
    return 4;
}

// Función para calcular puntuación de volumen
function calculateVolumenScore(volumen) {
    if (volumen <= 10) return 0.5;
    if (volumen <= 30) return 1;
    if (volumen <= 100) return 2;
    return 3;
}

// Actualizar puntuación en tiempo real
document.getElementById('numTitulares').addEventListener('input', function() {
    const value = parseInt(this.value) || 0;
    const score = calculateTitularesScore(value);
    document.getElementById('scoreTitulares').textContent = score;
});

document.getElementById('volumenDatos').addEventListener('input', function() {
    const value = parseInt(this.value) || 0;
    const score = calculateVolumenScore(value);
    document.getElementById('scoreVolumen').textContent = score;
});

// Actualizar puntuaciones de radio buttons
document.querySelectorAll('input[name="categorias"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('scoreCategorias').textContent = this.value;
    });
});

document.querySelectorAll('input[name="frecuencia"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('scoreFrecuencia').textContent = this.value;
    });
});

document.querySelectorAll('input[name="permanencia"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('scorePermanencia').textContent = this.value;
    });
});

document.querySelectorAll('input[name="geografia"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('scoreGeografia').textContent = this.value;
    });
});

// Función principal de cálculo
function calculateScore() {
    // Validar formulario
    const form = document.getElementById('mtgeForm');
    if (!form.checkValidity()) {
        alert('⚠️ Por favor, complete todos los campos obligatorios antes de calcular.');
        form.reportValidity();
        return;
    }

    // Obtener valores
    const numTitulares = parseInt(document.getElementById('numTitulares').value) || 0;
    const volumenDatos = parseInt(document.getElementById('volumenDatos').value) || 0;
    const categorias = parseFloat(document.querySelector('input[name="categorias"]:checked')?.value || 0);
    const frecuencia = parseFloat(document.querySelector('input[name="frecuencia"]:checked')?.value || 0);
    const permanencia = parseFloat(document.querySelector('input[name="permanencia"]:checked')?.value || 0);
    const geografia = parseFloat(document.querySelector('input[name="geografia"]:checked')?.value || 0);

    // Calcular puntuaciones
    const scoreTitulares = calculateTitularesScore(numTitulares);
    const scoreVolumen = calculateVolumenScore(volumenDatos);

    // Actualizar desglose
    document.getElementById('finalScoreTitulares').textContent = scoreTitulares;
    document.getElementById('finalScoreVolumen').textContent = scoreVolumen;
    document.getElementById('finalScoreCategorias').textContent = categorias;
    document.getElementById('finalScoreFrecuencia').textContent = frecuencia;
    document.getElementById('finalScorePermanencia').textContent = permanencia;
    document.getElementById('finalScoreGeografia').textContent = geografia;

    // Calcular total
    const totalScore = scoreTitulares + scoreVolumen + categorias + frecuencia + permanencia + geografia;
    document.getElementById('totalScore').textContent = totalScore.toFixed(1);

    // Determinar clasificación
    const classification = document.getElementById('classification');
    const isGranEscala = totalScore >= 6;

    if (isGranEscala) {
        classification.className = 'classification gran-escala';
        classification.innerHTML = `
            <div class="classification-icon">🚨</div>
            <h3>TRATAMIENTO DE GRAN ESCALA</h3>
            <p>El tratamiento supera el umbral de 6 puntos y es considerado de <strong>GRAN ESCALA</strong> según el Art. 10 de la Resolución SPDP-SPD-2026-0005-R.</p>
        `;
        
        // Mostrar obligaciones
        const obligations = document.getElementById('obligations');
        obligations.style.display = 'block';
        const obligationsList = document.getElementById('obligationsList');
        obligationsList.innerHTML = `
            <li><strong>Evaluación de Impacto:</strong> Debe realizar una Evaluación de Impacto en la Protección de Datos (EIPD) antes de iniciar el tratamiento (Art. 12.1).</li>
            <li><strong>Delegado de Protección de Datos:</strong> Designación obligatoria de un Delegado de Protección de Datos (DPD) según los requisitos establecidos (Art. 12.2).</li>
            <li><strong>Registro de Actividades:</strong> Incorporación del tratamiento en el Registro de Actividades de Tratamiento (RAT) con la evidencia del cálculo MTGE (Art. 12.3).</li>
            <li><strong>Responsabilidad Proactiva Reforzada:</strong> Activación de medidas reforzadas de responsabilidad proactiva (accountability) previstas en la normativa (Art. 12.4).</li>
            <li><strong>Revisión Periódica:</strong> Revisar y actualizar los valores del MTGE al menos una vez al año o cuando se produzcan variaciones sustanciales (Art. 13).</li>
            <li><strong>Documentación:</strong> Conservar evidencia documental del cálculo durante al menos 5 años.</li>
        `;
    } else {
        classification.className = 'classification no-gran-escala';
        classification.innerHTML = `
            <div class="classification-icon">✅</div>
            <h3>NO ES TRATAMIENTO DE GRAN ESCALA</h3>
            <p>El tratamiento NO supera el umbral de 6 puntos. Sin embargo, debe cumplir con las obligaciones generales de la LOPDP y mantener el principio de responsabilidad proactiva.</p>
        `;
        
        // Ocultar obligaciones específicas de gran escala
        document.getElementById('obligations').style.display = 'none';
    }

    // Scroll suave al resultado
    classification.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Función para resetear el formulario
function resetForm() {
    if (confirm('¿Está seguro de que desea iniciar una nueva evaluación? Se perderán todos los datos ingresados.')) {
        document.getElementById('mtgeForm').reset();
        
        // Resetear puntuaciones
        document.getElementById('scoreTitulares').textContent = '0';
        document.getElementById('scoreVolumen').textContent = '0';
        document.getElementById('scoreCategorias').textContent = '0';
        document.getElementById('scoreFrecuencia').textContent = '0';
        document.getElementById('scorePermanencia').textContent = '0';
        document.getElementById('scoreGeografia').textContent = '0';
        
        document.getElementById('finalScoreTitulares').textContent = '0';
        document.getElementById('finalScoreVolumen').textContent = '0';
        document.getElementById('finalScoreCategorias').textContent = '0';
        document.getElementById('finalScoreFrecuencia').textContent = '0';
        document.getElementById('finalScorePermanencia').textContent = '0';
        document.getElementById('finalScoreGeografia').textContent = '0';
        document.getElementById('totalScore').textContent = '0';
        
        // Resetear clasificación
        const classification = document.getElementById('classification');
        classification.className = 'classification';
        classification.innerHTML = `
            <div class="classification-icon">⚖️</div>
            <h3 id="classificationTitle">Complete el formulario</h3>
            <p id="classificationDescription">Ingrese todos los datos requeridos para obtener la clasificación</p>
        `;
        
        document.getElementById('obligations').style.display = 'none';
        
        // Scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Función para exportar a PDF
function exportPDF() {
    // Validar que se haya calculado
    const totalScore = document.getElementById('totalScore').textContent;
    if (totalScore === '0') {
        alert('⚠️ Primero debe calcular la puntuación antes de exportar.');
        return;
    }

    // Crear contenido para el PDF
    const nombreTratamiento = document.getElementById('nombreTratamiento').value;
    const responsable = document.getElementById('responsable').value;
    const finalidad = document.getElementById('finalidad').value;
    const fechaEvaluacion = document.getElementById('fechaEvaluacion').value;
    const numTitulares = document.getElementById('numTitulares').value;
    const volumenDatos = document.getElementById('volumenDatos').value;
    
    const scoreTitulares = document.getElementById('finalScoreTitulares').textContent;
    const scoreVolumen = document.getElementById('finalScoreVolumen').textContent;
    const scoreCategorias = document.getElementById('finalScoreCategorias').textContent;
    const scoreFrecuencia = document.getElementById('finalScoreFrecuencia').textContent;
    const scorePermanencia = document.getElementById('finalScorePermanencia').textContent;
    const scoreGeografia = document.getElementById('finalScoreGeografia').textContent;
    
    const isGranEscala = parseFloat(totalScore) >= 6;
    
    // Obtener textos de selección
    const categoriasText = document.querySelector('input[name="categorias"]:checked')?.nextElementSibling?.textContent || '';
    const frecuenciaText = document.querySelector('input[name="frecuencia"]:checked')?.nextElementSibling?.textContent || '';
    const permanenciaText = document.querySelector('input[name="permanencia"]:checked')?.nextElementSibling?.textContent || '';
    const geografiaText = document.querySelector('input[name="geografia"]:checked')?.nextElementSibling?.textContent || '';

    // Crear ventana de impresión con contenido formateado
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Reporte MTGE - ${nombreTratamiento}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    line-height: 1.6;
                    color: #333;
                }
                .header {
                    text-align: center;
                    border-bottom: 3px solid #2563eb;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .header h1 {
                    color: #2563eb;
                    margin-bottom: 10px;
                }
                .section {
                    margin-bottom: 30px;
                }
                .section h2 {
                    color: #2563eb;
                    border-bottom: 2px solid #e5e7eb;
                    padding-bottom: 10px;
                    margin-bottom: 15px;
                }
                .info-row {
                    margin-bottom: 10px;
                }
                .info-row strong {
                    display: inline-block;
                    width: 200px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                table th, table td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                }
                table th {
                    background-color: #2563eb;
                    color: white;
                }
                .result-box {
                    padding: 20px;
                    margin: 20px 0;
                    border: 3px solid ${isGranEscala ? '#ef4444' : '#10b981'};
                    background-color: ${isGranEscala ? '#fee2e2' : '#d1fae5'};
                    text-align: center;
                }
                .result-box h3 {
                    color: ${isGranEscala ? '#ef4444' : '#10b981'};
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .obligations {
                    background-color: #f9fafb;
                    padding: 20px;
                    margin-top: 20px;
                }
                .obligations li {
                    margin-bottom: 10px;
                }
                .footer {
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🛡️ MATRIZ DE TRATAMIENTO A GRAN ESCALA (MTGE)</h1>
                <p>Ley Orgánica de Protección de Datos Personales de Ecuador</p>
                <p>Resolución SPDP-SPD-2026-0005-R</p>
            </div>

            <div class="section">
                <h2>📋 Información General</h2>
                <div class="info-row"><strong>Tratamiento:</strong> ${nombreTratamiento}</div>
                <div class="info-row"><strong>Responsable:</strong> ${responsable}</div>
                <div class="info-row"><strong>Finalidad:</strong> ${finalidad}</div>
                <div class="info-row"><strong>Fecha de Evaluación:</strong> ${fechaEvaluacion}</div>
            </div>

            <div class="section">
                <h2>📊 Evaluación de Variables</h2>
                
                <h3>Variable 1: Número de Titulares</h3>
                <div class="info-row"><strong>Número de titulares (12 meses):</strong> ${numTitulares}</div>
                <div class="info-row"><strong>Puntuación:</strong> ${scoreTitulares} puntos</div>

                <h3>Variable 2: Volumen de Datos</h3>
                <div class="info-row"><strong>Tipos de datos por titular:</strong> ${volumenDatos}</div>
                <div class="info-row"><strong>Puntuación:</strong> ${scoreVolumen} puntos</div>

                <h3>Variable 3: Categorías de Datos</h3>
                <div class="info-row"><strong>Selección:</strong> ${categoriasText}</div>
                <div class="info-row"><strong>Puntuación:</strong> ${scoreCategorias} puntos</div>

                <h3>Variable 4: Frecuencia del Tratamiento</h3>
                <div class="info-row"><strong>Selección:</strong> ${frecuenciaText}</div>
                <div class="info-row"><strong>Puntuación:</strong> ${scoreFrecuencia} puntos</div>

                <h3>Variable 5: Permanencia del Tratamiento</h3>
                <div class="info-row"><strong>Selección:</strong> ${permanenciaText}</div>
                <div class="info-row"><strong>Puntuación:</strong> ${scorePermanencia} puntos</div>

                <h3>Variable 6: Alcance Geográfico</h3>
                <div class="info-row"><strong>Selección:</strong> ${geografiaText}</div>
                <div class="info-row"><strong>Puntuación:</strong> ${scoreGeografia} puntos</div>
            </div>

            <div class="section">
                <h2>🎯 Resultado de la Evaluación</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>Puntuación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Número de Titulares</td><td>${scoreTitulares}</td></tr>
                        <tr><td>Volumen de Datos</td><td>${scoreVolumen}</td></tr>
                        <tr><td>Categorías de Datos</td><td>${scoreCategorias}</td></tr>
                        <tr><td>Frecuencia</td><td>${scoreFrecuencia}</td></tr>
                        <tr><td>Permanencia</td><td>${scorePermanencia}</td></tr>
                        <tr><td>Alcance Geográfico</td><td>${scoreGeografia}</td></tr>
                        <tr style="font-weight: bold; background-color: #f0f9ff;">
                            <td>PUNTUACIÓN TOTAL (P)</td>
                            <td>${totalScore}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="result-box">
                    <h3>${isGranEscala ? '🚨 TRATAMIENTO DE GRAN ESCALA' : '✅ NO ES TRATAMIENTO DE GRAN ESCALA'}</h3>
                    <p>
                        ${isGranEscala 
                            ? 'El tratamiento supera el umbral de 6 puntos y es considerado de GRAN ESCALA según el Art. 10 de la Resolución SPDP-SPD-2026-0005-R.' 
                            : 'El tratamiento NO supera el umbral de 6 puntos. Sin embargo, debe cumplir con las obligaciones generales de la LOPDP.'}
                    </p>
                </div>

                ${isGranEscala ? `
                <div class="obligations">
                    <h3>📋 Obligaciones Derivadas (Art. 12)</h3>
                    <ul>
                        <li><strong>Evaluación de Impacto:</strong> Debe realizar una Evaluación de Impacto en la Protección de Datos (EIPD).</li>
                        <li><strong>Delegado de Protección de Datos:</strong> Designación obligatoria de un DPD.</li>
                        <li><strong>Registro de Actividades:</strong> Incorporación en el RAT con evidencia del cálculo MTGE.</li>
                        <li><strong>Responsabilidad Proactiva Reforzada:</strong> Activación de medidas reforzadas de accountability.</li>
                        <li><strong>Revisión Periódica:</strong> Actualizar el MTGE al menos una vez al año.</li>
                        <li><strong>Documentación:</strong> Conservar evidencia durante al menos 5 años.</li>
                    </ul>
                </div>
                ` : ''}
            </div>

            <div class="footer">
                <p><strong>Base Legal:</strong> Resolución SPDP-SPD-2026-0005-R | Superintendencia de Protección de Datos Personales de Ecuador</p>
                <p>Documento generado el ${new Date().toLocaleDateString('es-EC')} a las ${new Date().toLocaleTimeString('es-EC')}</p>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    // Esperar a que cargue y ejecutar impresión
    printWindow.onload = function() {
        printWindow.print();
    };
}

// Establecer fecha actual por defecto
document.getElementById('fechaEvaluacion').valueAsDate = new Date();

// Mensaje de bienvenida
console.log('🛡️ MTGE - Matriz de Tratamiento a Gran Escala | LOPDP Ecuador');
console.log('Aplicación desarrollada según Resolución SPDP-SPD-2026-0005-R');