# 🥗 Nutrition Survey App

Plataforma Fullstack para la creación, distribución y análisis de encuestas nutricionales.

## 🏗️ Arquitectura y Tecnologías
* **Frontend:** Construido con React y Vite. Utiliza una paleta de colores "Pastel Nutrición".
* **Backend:** Desarrollado en Java 21 utilizando el framework Spring Boot y gestionado con Maven.
* **Base de Datos:** H2 Database en memoria, ideal para un desarrollo iterativo rápido.
* **Analítica de Datos:** Apache Spark integrado para el procesamiento y agregación de métricas de las encuestas.
* **Infraestructura:** Estructura de Monorepo (Frontend y Backend en el mismo repositorio Git). Despliegue automático del Frontend en Vercel.

---

## 📂 Estructura del Proyecto (Monorepo)

El repositorio centraliza ambas aplicaciones para facilitar el control de versiones:

* `/frontend`: Contiene el proyecto de Frontend (React/Vite).
* `/backend`: Contiene todo el código fuente del servidor Spring Boot y Apache Spark.

---

## ⚙️ Cómo levantar el Backend (Spring Boot + Spark)

El backend maneja la persistencia, el envío de emails y el análisis de datos. 

1. Abre una terminal y navega a la carpeta del backend:
   `cd backend/nutricion-backend`
2. Compila el proyecto saltando los tests:
   `mvn clean install -DskipTests`
3. Ejecuta la aplicación desde IntelliJ IDEA o mediante Maven.
4. El servidor se levantará en el puerto **8080**.

### 🗄️ Acceso a la Base de Datos (H2 Console)
Como usamos una base de datos en memoria, los datos se reinician cada vez que apagas el servidor.
* **URL:** `http://localhost:8080/h2-console`
* **Driver Class:** `org.h2.Driver`
* **JDBC URL:** `jdbc:h2:mem:testdb`
* **User:** `*********`
* **Password:** `*******`

### 📡 Endpoints Principales
* `POST /api/surveys`: Guarda una nueva encuesta.
* `GET /api/surveys/{id}`: Recupera una encuesta específica.
* `POST /api/surveys/{id}/submit`: Recibe las respuestas y dispara el envío del correo.
* `GET /api/analytics/promedios`: Invoca a Apache Spark para calcular los promedios.

---

## 🎨 Cómo levantar el Frontend (React)

1. Abre una terminal en la raíz del proyecto (`nutricion-survey`).
2. Inicia el servidor de desarrollo de Vite:
   `npm run dev`
3. Abre el enlace local en tu navegador (usualmente `http://localhost:5173/`).

---

## 🗺️ Diagrama de Flujo de Datos

```mermaid
flowchart TD
    subgraph Frontend["Frontend (Vercel / React)"]
        FE["SurveyViewer y SurveyBuilder"]
    end

    subgraph Backend["Backend (Spring Boot)"]
        API["SurveyController"]
        Repo["SurveyRepository"]
        Email["EmailService"]
    end

    subgraph Storage["Persistencia"]
        DB[("H2 In-Memory")]
    end

    subgraph Analytics["Capa de Analítica (Spark)"]
        SparkApp["Spark Processing App"]
    end

    FE -->|"HTTP REST"| API
    API --> Repo
    Repo --> DB
    DB -->|"Lectura Batch"| SparkApp
    SparkApp -->|"Agregaciones"| DB
    API -->|"Consulta KPIs"| DB
    SparkApp -->|"Dispara alertas"| Email
   ``` 
---

## 🚀 Próximos Pasos y Tareas Pendientes
- [ ] **Fix Vercell**: Cirregir el deploy
- [ ] **Dashboard Analítico Visual:** Conectar el endpoint de Apache Spark con el Frontend y utilizar librerías como Recharts para visualizar los promedios de nutrición en gráficos interactivos.
- [ ] **Configuración Dinámica de Emails:** Mejorar la integración de `JavaMailSender` para permitir plantillas HTML dinámicas y configuración de destinatarios desde la interfaz.
- [ ] **Migración a Producción:** Reemplazar la base de datos H2 (en memoria) por PostgreSQL o MySQL para persistencia de datos permanente.
- [ ] **Autenticación y Seguridad:** Proteger la creación de encuestas y el panel de analíticas para que solo los nutricionistas (administradores) tengan acceso.
- [ ] **Integración con Redes:** Finalizar el generador de Links cortos para publicar fácilmente en historias de Instagram.
