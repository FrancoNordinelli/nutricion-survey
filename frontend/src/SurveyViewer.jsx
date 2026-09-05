import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css'; 

const SurveyViewer = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState(''); // Estado para el correo del cliente
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

  // 1. Cargar la encuesta estructurada (con questions) desde el Backend
  useEffect(() => {
    fetch(`${API_URL}/health_self/surveys/${id}`)
      .then(response => response.json())
      .then(data => {
        setSurvey(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar la encuesta:", error);
        setLoading(false);
      }); 
  }, [id]);

  // 2. Mapear la respuesta a la consigna específica de la pregunta
  const handleInputChange = (questionPrompt, value) => {
    setAnswers({
      ...answers,
      [questionPrompt]: value
    });
  };

  // 3. Enviar al backend para guardar y disparar el Email
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Armamos el JSON exactamente como lo probaste en Postman y como lo espera tu Controller
    const payload = {
        email: email,
        answers: answers
    };
    
    try {
        const response = await fetch(`${API_URL}/health_self/surveys/${id}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("¡Gracias! Tus respuestas han sido enviadas a tu nutricionista 📧");
        } else {
            alert("Ocurrió un error al enviar tus respuestas.");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
  };

  if (loading) return <div className="card">Cargando encuesta... 🥑</div>;
  if (!survey) return <div className="card">Encuesta no encontrada.</div>;

  return (
    <div className="container">
      <div className="card">
        <header className="header">
          <h1>{survey.title}</h1>
          {survey.theme && <p style={{ fontWeight: 'bold', color: '#4a5568' }}>Tema: {survey.theme}</p>}
        </header>

        <form onSubmit={handleSubmit}>
          {/* Email obligatorio para que el EmailService de Java funcione */}
          <div className="section">
            <label>Tu Email</label>
            <input 
              type="email" 
              placeholder="cliente@ejemplo.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <hr className="divider" style={{ margin: '20px 0' }} />

          {/* Iteramos sobre la nueva matriz de Preguntas */}
          {survey.questions?.map((q, qIndex) => (
            <div key={qIndex} className="section" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '1.1rem' }}>
                {qIndex + 1}. {q.prompt}
              </label>
              
              {/* Iteramos sobre las opciones específicas de ESTA pregunta usando Radio Buttons */}
              <div className="options-group">
                {q.options.map((opt, oIndex) => (
                  <label key={oIndex} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name={`question-${qIndex}`} // Agrupa los radios por pregunta
                      value={opt.text}
                      onChange={(e) => handleInputChange(q.prompt, e.target.value)}
                      required
                    />
                    <span>{opt.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="actions">
            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
              Enviar Respuestas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyViewer;