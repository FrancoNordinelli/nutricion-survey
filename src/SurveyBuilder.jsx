import React, { useState } from 'react';
import './App.css'; // Importamos los estilos pastel

const SurveyBuilder = () => {
  // Estado inicial del formulario
  const [survey, setSurvey] = useState({
    title: '',
    description: '',
    options: [{ text: '', score: 0 }] // Iniciamos con una opción vacía
  });

  // Manejo de cambios en campos generales
  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setSurvey({ ...survey, [name]: value });
  };

  // Manejo de cambios en las opciones (Array dinámico)
  const handleOptionChange = (index, field, value) => {
    const newOptions = [...survey.options];
    newOptions[index][field] = field === 'score' ? Number(value) : value;
    setSurvey({ ...survey, options: newOptions });
  };

  // Agregar nueva opción
  const addOption = () => {
    setSurvey({
      ...survey,
      options: [...survey.options, { text: '', score: 0 }]
    });
  };

  // Eliminar opción
  const removeOption = (index) => {
    const newOptions = survey.options.filter((_, i) => i !== index);
    setSurvey({ ...survey, options: newOptions });
  };

  // Simulación de envío al Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Aquí iría tu llamada fetch/axios real
    console.log("Enviando al Backend:", JSON.stringify(survey, null, 2));
    
    try {
        // Ejemplo de fetch:
        // const response = await fetch('https://api.tudominio.com/surveys', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(survey)
        // });
        alert("¡Encuesta de nutrición creada con éxito! (Mira la consola)");
    } catch (error) {
        console.error("Error al guardar", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <header className="header">
          <h1>🍏 Constructor de Encuestas</h1>
          <p>Crea evaluaciones nutricionales personalizadas</p>
        </header>

        <form onSubmit={handleSubmit}>
          {/* Sección General */}
          <div className="section">
            <label>Nombre de la Encuesta</label>
            <input
              type="text"
              name="title"
              placeholder="Ej: Hábitos de Hidratación"
              value={survey.title}
              onChange={handleMetaChange}
              required
            />
          </div>

          <div className="section">
            <label>Consigna / Pregunta Principal</label>
            <textarea
              name="description"
              placeholder="Ej: ¿Cuántos vasos de agua bebes al día?"
              value={survey.description}
              onChange={handleMetaChange}
              required
            />
          </div>

          <hr className="divider" />

          {/* Sección de Opciones Dinámicas */}
          <h3>Opciones de Respuesta</h3>
          <div className="options-grid">
            {survey.options.map((option, index) => (
              <div key={index} className="option-row">
                <div className="input-group text-group">
                  <label>Opción {index + 1}</label>
                  <input
                    type="text"
                    placeholder="Descripción de la respuesta"
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                    required
                  />
                </div>
                <div className="input-group score-group">
                  <label>Puntaje</label>
                  <input
                    type="number"
                    value={option.score}
                    onChange={(e) => handleOptionChange(index, 'score', e.target.value)}
                  />
                </div>
                
                {survey.options.length > 1 && (
                  <button 
                    type="button" 
                    className="btn-delete"
                    onClick={() => removeOption(index)}
                    title="Eliminar opción"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <button type="button" className="btn-secondary" onClick={addOption}>
            + Agregar Otra Opción
          </button>

          <div className="actions">
            <button type="submit" className="btn-primary">
              Guardar Encuesta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyBuilder;