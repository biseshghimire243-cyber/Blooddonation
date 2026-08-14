CREATE DATABASE IF NOT EXISTS blood_donation_db;

USE blood_donation_db;

-- =========================
-- USERS TABLE
-- =========================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- DONORS TABLE
-- =========================

CREATE TABLE IF NOT EXISTS donors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    blood_group VARCHAR(10) NOT NULL,
    address VARCHAR(255) NOT NULL,
    availability ENUM('available', 'unavailable') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_donor_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE blood_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,

    patient_name VARCHAR(100) NOT NULL,

    blood_group VARCHAR(5) NOT NULL,

    units INT NOT NULL,

    hospital VARCHAR(150) NOT NULL,

    location VARCHAR(150) NOT NULL,

    contact_name VARCHAR(100) NOT NULL,

    phone VARCHAR(20) NOT NULL,

    urgency ENUM(
        'normal',
        'urgent',
        'emergency'
    ) NOT NULL DEFAULT 'normal',

    message TEXT,

    status ENUM(
        'pending',
        'fulfilled',
        'cancelled'
    ) NOT NULL DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);