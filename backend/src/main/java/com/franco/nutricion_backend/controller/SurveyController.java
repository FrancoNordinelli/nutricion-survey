package com.franco.nutricion_backend.controller;

import com.franco.nutricion_backend.model.Survey;
import com.franco.nutricion_backend.repository.SurveyRepository;
import com.franco.nutricion_backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/health_self/surveys")
@CrossOrigin(origins = "*") // Permite peticiones desde cualquier lugar (Vercel)
//SUrveyControlle es el controlador que maneja las rutas relacionadas con encuestas de salud. 
//Permite crear encuestas, obtener encuestas por ID y recibir respuestas de encuestas, 
//enviando un correo electrónico con las respuestas recibidas.
//Este controller es para usuarios administradores, no para usuarios finales. 
//Los usuarios finales solo pueden enviar respuestas a encuestas existentes.
//TODO: Agregar seguridad y autenticación para que solo los administradores puedan acceder a estas rutas.
public class SurveyController {

    @Autowired
    private SurveyRepository repository;

    @Autowired
    private EmailService emailService;

    // 1. Crear nueva encuesta
    @PostMapping
    public Survey createSurvey(@RequestBody Survey survey) {
        return repository.save(survey);
    }

    // 2. Obtener encuesta por ID (para mostrarla al cliente)
    @GetMapping("/{id}")
    public Survey getSurvey(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Encuesta no encontrada"));
    }

    // 3. Recibir respuestas y mandar email
    @PostMapping("/{id}/submit")
    public String submitSurvey(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        Survey survey = repository.findById(id).orElseThrow();

        // Extraemos datos del JSON que envía el front
        String clientEmail = (String) payload.get("email");
        Map<String, String> answers = (Map<String, String>) payload.get("answers");

        // Disparamos el email
        emailService.sendSurveyResponses(clientEmail, survey.getTitle(), answers);

        return "Respuestas recibidas y enviadas por correo.";
    }
}