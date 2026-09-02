import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css'; 

const SurveyViewer = () => {
  const { id } = useParams(); // Captura el ID de la URL (ej: 123)
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // 1. Simulación: Cargar la encuesta desde el Backend
  useEffect(() => {
    // AQUÍ harías: fetch(`https://tu-api-java.com/surveys/${id}`)

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

  // 2. Manejar las respuestas del cliente
  const handleInputChange = (index, value) => {
    setAnswers({
      ...answers,
      [index]: value
    });
  };

  // 3. Enviar al backend para que mande el Email
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        surveyId: id,
        clientAnswers: answers
    };
    
    console.log("Enviando respuestas al Backend Java:", payload);
    alert("¡Gracias! Tus respuestas han sido enviadas a tu nutricionista 📧");
    
    // Aquí iría tu fetch POST al endpoint de Spring Boot que envía el mail
  };

  if (loading) return <div className="card">Cargando encuesta... 🥑</div>;

  return (
    <div className="container">
      <div className="card">
        <header className="header">
          <h1>{survey.title}</h1>
          <p>{survey.description}</p>
        </header>

        <form onSubmit={handleSubmit}>
          {survey.options.map((opt, index) => (
            <div key={index} className="section">
              <label>{opt.text}</label>
              <input 
                type="text" 
                placeholder="Escribe tu respuesta..." 
                onChange={(e) => handleInputChange(index, e.target.value)}
                required
              />
            </div>
          ))}

          <button type="submit" className="btn-primary">
            Enviar Respuestas
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyViewer;