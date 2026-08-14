package com.franco.nutricion_backend.controller;

import com.franco.nutricion_backend.service.SparkAnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/health_self/analytics")
@CrossOrigin(origins = "*") // Permite que tu Frontend en Vercel/Vite pueda hacerle peticiones sin bloqueos de seguridad
//TODO: Controller para administradores, agregar seguridad y autenticación para que solo los administradores puedan acceder a estas rutas.
public class AnalyticsController {

    private final SparkAnalyticsService sparkService;

    // Inyectamos tu servicio de Spark
    public AnalyticsController(SparkAnalyticsService sparkService) {
        this.sparkService = sparkService;
    }

    @GetMapping("/promedios")
    public ResponseEntity<List<String>> obtenerPromedios() {
        // Ejecuta Spark y devuelve el HTTP 200 OK con los datos
        return ResponseEntity.ok(sparkService.analizarPuntajesMedios());
    }
}