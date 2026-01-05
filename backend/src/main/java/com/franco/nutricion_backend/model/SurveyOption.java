package com.franco.nutricion_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SurveyOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;
    private Integer score;
}