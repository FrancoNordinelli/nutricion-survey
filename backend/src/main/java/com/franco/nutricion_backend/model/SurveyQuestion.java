package com.franco.nutricion_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class SurveyQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String prompt; // La consigna o pregunta principal

    // Cada pregunta tiene su propia lista de opciones de respuesta
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "question_id") // Relaciona las opciones con ESTA pregunta
    private List<SurveyOption> options;
}