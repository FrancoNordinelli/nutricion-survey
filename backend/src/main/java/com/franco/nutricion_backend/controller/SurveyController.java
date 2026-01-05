package com.franco.nutricion_backend.controller;

import com.franco.nutricion_backend.model.Survey;
import com.franco.nutricion_backend.repository.SurveyRepository;
import com.franco.nutricion_backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/surveys")
@CrossOrigin(origins = "*") // Permite peticiones desde cualquier lugar (Vercel)
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