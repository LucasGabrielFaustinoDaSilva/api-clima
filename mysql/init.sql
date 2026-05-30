CREATE DATABASE IF NOT EXISTS weatherdb;

USE weatherdb;

CREATE TABLE weather_data (
    id INT AUTO_INCREMENT PRIMARY KEY,

    city VARCHAR(100),
    country VARCHAR(10),

    temperature FLOAT,
    feels_like FLOAT,

    humidity INT,
    pressure INT,

    wind_speed FLOAT,

    weather_main VARCHAR(100),
    weather_description VARCHAR(255),

    cloudiness INT,

    api_timestamp BIGINT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);