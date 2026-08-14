import React, { useState, useEffect } from 'react';

const AnalyticsDashboard = () => {
  const [metricas, setMetricas] = useState([]);

  useEffect(() => {
    // Función para llamar al backend de Spring Boot
    const fetchMetricas = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/analytics/promedios');
        const data = await response.json();
        
        // Spark devuelve un arreglo de Strings (JSON). Necesitamos parsearlos a objetos Javascript
        const datosParseados = data.map(fila => JSON.parse(fila));
        setMetricas(datosParseados);
        
      } catch (error) {
        console.error("Error trayendo analíticas de Spark:", error);
      }
    };

    fetchMetricas();
  }, []); // El array vacío significa que se ejecuta una sola vez al cargar la página

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
      <h2>📊 Panel Analítico de Nutrición (Impulsado por Spark)</h2>
      
      {metricas.length === 0 ? (
        <p>Calculando métricas o no hay datos suficientes...</p>
      ) : (
        <ul>
          {metricas.map((metrica, index) => (
            <li key={index}>
              <strong>Encuesta ID #{metrica.survey_id}:</strong> Promedio poblacional de {metrica.promedioPuntaje} puntos.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnalyticsDashboard;