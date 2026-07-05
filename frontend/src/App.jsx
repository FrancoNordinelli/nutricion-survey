/**
 * App.jsx
 * 
 * Este es el componente principal de la aplicación. 
 * Aquí se configuran las rutas para el constructor de encuestas (SurveyBuilder) 
 * y el visor de encuestas (SurveyViewer).
 * Rutas:
 * - "/" : Ruta para que el administrador cree la encuesta.
 * - "/responder/:id" : Ruta para que el cliente responda la encuesta, 
 * donde ":id" es el identificador único de la encuesta.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import SurveyBuilder from './SurveyBuilder';
import SurveyViewer from './SurveyViewer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Ruta para que TU (Admin) crees la encuesta */}
          <Route path="/" element={<SurveyBuilder />} />
          
          {/* Ruta para que el CLIENTE responda (Ej: tusitio.com/responder/123) */}
          <Route path="/responder/:id" element={<SurveyViewer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;