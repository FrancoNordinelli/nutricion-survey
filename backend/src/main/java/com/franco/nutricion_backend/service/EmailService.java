package com.franco.nutricion_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSurveyResponses(String clientEmail, String surveyTitle, Map<String, String> answers) {
        StringBuilder body = new StringBuilder();
        body.append("¡Nueva respuesta recibida!\n\n");
        body.append("Encuesta: ").append(surveyTitle).append("\n");
        body.append("Cliente: ").append(clientEmail).append("\n\n");
        body.append("Respuestas:\n");

        answers.forEach((pregunta, respuesta) -> {
            body.append("- ").append(pregunta).append(": ").append(respuesta).append("\n");
        });

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("tu_email@gmail.com");
        message.setTo("tu_email@gmail.com"); // O el mail del nutricionista
        message.setSubject("Nueva Encuesta Completada: " + surveyTitle);
        message.setText(body.toString());

        mailSender.send(message);
        System.out.println("Email enviado con éxito.");
    }
}