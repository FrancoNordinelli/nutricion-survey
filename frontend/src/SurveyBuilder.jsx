import React, { useState } from 'react';
import './App.css'; // Importamos los estilos pastel

/**
 *  SurveyBuilder.jsx
 * 
 * Este componente es el constructor de encuestas para el administrador.
 * Permite crear una encuesta con un título, una descripción y múltiples opciones de respuesta.
 * Cada opción tiene un texto descriptivo y un puntaje asociado.
 * El formulario es dinámico, permitiendo agregar o eliminar opciones según sea necesario.
 * Survey es la variable actual, como un DTO de Java, que se enviará al backend para su almacenamiento.
 * setSurvey es la función que actualiza el estado de la encuesta a medida que el administrador ingresa datos.
 * useStaate es el hook de React que nos permite manejar el estado local del componente.
 * @returns 
 */
const SurveyBuilder = () => {

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Estado inicial del formulario
  const [survey, setSurvey] = useState({
    title: '',
    description: '',
    options: [{ text: '', score: 0 }] // Iniciamos con una opción vacía
  });

  /**
   * Esta función maneja los cambios en los campos de título y descripción.
   * Actualiza el estado de la encuesta con los nuevos valores ingresados por el administrador.
   * e es el evento que se dispara al cambiar el valor de un input, y se extraen el nombre del campo y su valor para actualizar el estado.
   * const { name, value } = e.target; es una forma de desestructurar el evento para obtener el nombre del campo (name) y su valor (value) de manera más limpia.
   * [name]: value es una sintaxis de ES6 que permite actualizar dinámicamente la propiedad del objeto survey que corresponde al nombre del campo que se está editando.
   * setSurvey({ ...survey, [name]: value }); crea un nuevo objeto survey con los valores actuales y actualiza solo la propiedad que ha cambiado.
   * ...survey mantiene las demás propiedades del objeto survey sin cambios.
   * @param {*} e 
   */
  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setSurvey({ ...survey, [name]: value });
  };

  /**
   * Esta función maneja los cambios en las opciones de respuesta.
   * newOptions es una copia del array de opciones actual, que se modifica según el índice y el campo que se está editando.
   * Luego, se actualiza el estado de la encuesta con las nuevas opciones.
   * index es el índice de la opción que se está editando, field es el campo (texto o puntaje) que se está modificando, y value es el nuevo valor ingresado por el administrador.
   * Si el campo que se está editando es 'score', se convierte el valor a número antes de actualizar el estado, para asegurarnos de que los puntajes sean numéricos.
  
   */
  const handleOptionChange = (index, field, value) => {
    const newOptions = [...survey.options];
    newOptions[index][field] = field === 'score' ? Number(value) : value;
    setSurvey({ ...survey, options: newOptions });
  };

  // Agregar nueva opción
  // ...survey mantiene las demás propiedades del objeto survey sin cambios.
  //options: [...survey.options, { text: '', score: 0 }] agrega una nueva opción vacía al final del array de opciones existente.
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
          {/* Sección General */}
          <div className="section">
            <label>Nombre de la Encuesta</label>
            <input
              type="text"
              name="title"
              placeholder="Ej: Hábitos de Hidratación"
              value={survey.title}
              onChange={handleMetaChange} // onChange llama a la función handleMetaChange cuando el valor del input cambia
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