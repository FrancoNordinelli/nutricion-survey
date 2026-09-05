package com.franco.nutricion_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    private String theme; // Nuevo campo para el TEMA

    // Ahora la encuesta ya no tiene opciones directas, tiene múltiples PREGUNTAS
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "survey_id")
    private List<SurveyQuestion> questions;
}