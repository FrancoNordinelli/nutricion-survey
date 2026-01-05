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