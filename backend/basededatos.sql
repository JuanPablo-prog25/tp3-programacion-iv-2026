CREATE DATABASE IF NOT EXISTS tp3_vehiculos;
USE tp3_vehiculos;

-- Tabla Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Tabla Vehiculos
CREATE TABLE vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    patente VARCHAR(20) NOT NULL UNIQUE,
    anio INT NOT NULL,
    capacidad_carga DECIMAL(10,2) NOT NULL
);

-- Tabla Conductores
CREATE TABLE conductores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    numero_licencia VARCHAR(30) NOT NULL UNIQUE,
    fecha_alta_licencia DATE NOT NULL,
    fecha_vencimiento_licencia DATE NOT NULL
);

-- Tabla Viajes
CREATE TABLE viajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehiculo_id INT NOT NULL,
    conductor_id INT NOT NULL,
    fecha_salida DATETIME NOT NULL,
    fecha_llegada DATETIME NOT NULL,
    origen VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    kilometros DECIMAL(10,2) NOT NULL,
    observaciones TEXT,

    CONSTRAINT fk_viaje_vehiculo
        FOREIGN KEY (vehiculo_id)
        REFERENCES vehiculos(id),

    CONSTRAINT fk_viaje_conductor
        FOREIGN KEY (conductor_id)
        REFERENCES conductores(id)
);