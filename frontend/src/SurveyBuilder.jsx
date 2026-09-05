import React, { useState } from 'react';
import './App.css'; // Importamos los estilos pastel

const SurveyBuilder = () => {

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Estado inicial del formulario
  const [survey, setSurvey] = useState({
    title: '',
    theme: '', // Nuevo campo para el TEMA
    questions: [ // Arreglo para múltiples consignas
      {
        prompt: '', // La consigna/pregunta
        options: [{ text: '', score: 0 }]
      }
    ]
  });


  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setSurvey({ ...survey, [name]: value });
  };

  const handleQuestionChange = (qIndex, value) => {
    const newQuestions = [...survey.questions];
    newQuestions[qIndex].prompt = value;
    setSurvey({ ...survey, questions: newQuestions });
  };

  const addQuestion = () => {
    setSurvey({
      ...survey,
      questions: [...survey.questions, { prompt: '', options: [{ text: '', score: 0 }] }]
    });
  };

  const removeQuestion = (qIndex) => {
    const newQuestions = survey.questions.filter((_, i) => i !== qIndex);
    setSurvey({ ...survey, questions: newQuestions });
  };


  const handleOptionChange = (qIndex, oIndex, field, value) => {
    const newQuestions = [...survey.questions];
    newQuestions[qIndex].options[oIndex][field] = field === 'score' ? Number(value) : value;
    setSurvey({ ...survey, questions: newQuestions });
  };

  const addOption = (qIndex) => {
    const newQuestions = [...survey.questions];
    newQuestions[qIndex].options.push({ text: '', score: 0 });
    setSurvey({ ...survey, questions: newQuestions });
  };

  const removeOption = (qIndex, oIndex) => {
    const newQuestions = [...survey.questions];
    newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, i) => i !== oIndex);
    setSurvey({ ...survey, questions: newQuestions });
  };

  // Simulación de envío al Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí iría tu llamada fetch/axios real
    console.log("Enviando al Backend:", JSON.stringify(survey, null, 2));

    try {
      // Ejemplo de fetch:
      const response = await fetch(`${API_URL}/health_self/surveys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(survey)
      });
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
          {/* Sección General (Título y TEMA) */}
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
            <label>Tema de la Encuesta</label>
            <input
              type="text"
              name="theme"
              placeholder="Ej: Hidratación, Nutrición Deportiva..."
              value={survey.theme}
              onChange={handleMetaChange}
              required
            />
          </div>

          <hr className="divider" />

          {/* Sección de Múltiples Preguntas */}
          {survey.questions.map((question, qIndex) => (
            <div key={qIndex} className="section" style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: '1.2rem', color: '#2d3748' }}>Pregunta {qIndex + 1}</label>
                {survey.questions.length > 1 && (
                  <button type="button" className="btn-delete" onClick={() => removeQuestion(qIndex)}>
                    ✕ Eliminar Pregunta
                  </button>
                )}
              </div>

              <textarea
                placeholder="Consigna principal. Ej: ¿Cuántos vasos de agua bebes al día?"
                value={question.prompt}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                required
              />

              {/* Opciones de Respuesta para ESTA pregunta */}
              <h4 style={{ marginTop: '15px', marginBottom: '10px' }}>Opciones de Respuesta</h4>
              <div className="options-grid">
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="option-row">
                    <div className="input-group text-group">
                      <input
                        type="text"
                        placeholder={`Opción ${oIndex + 1}`}
                        value={option.text}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, 'text', e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group score-group">
                      <input
                        type="number"
                        placeholder="Pts"
                        value={option.score}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, 'score', e.target.value)}
                      />
                    </div>
                    
                    {question.options.length > 1 && (
                      <button 
                        type="button" 
                        className="btn-delete"
                        onClick={() => removeOption(qIndex, oIndex)}
                        title="Eliminar opción"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button type="button" className="btn-secondary" onClick={() => addOption(qIndex)} style={{ marginTop: '10px' }}>
                + Agregar Otra Opción
              </button>
            </div>
          ))}

          {/* Botón para agregar una nueva pregunta entera */}
          <button type="button" className="btn-primary" onClick={addQuestion} style={{ backgroundColor: '#4a5568', marginBottom: '20px' }}>
            + Agregar Nueva Pregunta
          </button>

          <div className="actions">
            <button type="submit" className="btn-primary">
              Guardar Encuesta Completa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyBuilder;