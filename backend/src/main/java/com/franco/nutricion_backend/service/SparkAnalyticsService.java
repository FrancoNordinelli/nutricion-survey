package com.franco.nutricion_backend.service;

import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class SparkAnalyticsService {


    private SparkSession getSparkSession() {
        return SparkSession.builder()
                .appName("NutritionAnalytics")
                .master("local[*]")
                .getOrCreate();
    }

    public void analizarPuntajesMedios() {
        // Configurar conexión JDBC hacia tu base de datos
        SparkSession spark = getSparkSession();
        String jdbcUrl = "jdbc:h2:mem:testdb"; // O tu cadena de conexión PostgreSQL/MySQL
        Properties connectionProperties = new Properties();
        connectionProperties.put("user", "sa");
        connectionProperties.put("password", "password");
        connectionProperties.put("driver", "org.h2.Driver");

        // 1. Leer tabla de respuestas directamente como DataFrame de Spark
        Dataset<Row> respuestasDF = spark.read()
                .jdbc(jdbcUrl, "SURVEY_RESPONSE", connectionProperties);

        // 2. Hacer trasformaciones / Agregaciones de datos
        Dataset<Row> metricas = respuestasDF
                .groupBy("survey_id")
                .avg("total_score")
                .withColumnRenamed("avg(total_score)", "promedioPuntaje");

        // 3. Mostrar resultado en consola de servidor
        metricas.show();
    }
}