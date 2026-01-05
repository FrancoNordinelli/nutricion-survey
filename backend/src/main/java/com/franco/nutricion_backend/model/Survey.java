package com.franco.nutricion_backend.model;

import jakarta.persistence.*;
import lombok.Data; // Si no usas Lombok, genera Getters/Setters manualmente
import java.util.List;

@Entity
@Data
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000) // Permitir descripciones largas
    private String description;

    // Una encuesta tiene muchas opciones
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "survey_id")
    private List<SurveyOption> options;
}