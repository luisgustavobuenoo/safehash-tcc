-- =============================================================================
-- SAFEHASH - SCRIPT DE INICIALIZAÇÃO OFICIAL 
-- Este arquivo define a estrutura do banco de dados para a Cadeia de Custódia.
-- =============================================================================

-- 1. Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS safehash_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE safehash_db;

-- Desabilita checagem de chaves estrangeiras para garantir a limpeza inicial
SET FOREIGN_KEY_CHECKS = 0;

-- 2. Limpeza de tabelas existentes (para garantir um ambiente limpo)
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS verification_logs;
DROP TABLE IF EXISTS evidences;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

-- 3. Tabela de Usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    professional_type VARCHAR(50) DEFAULT 'Perito',
    professional_id VARCHAR(50), -- Matrícula ou OAB
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Tabela de Evidências (Cadeia de Custódia Digital)
CREATE TABLE evidences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_hash CHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    description TEXT,
    exif_metadata JSON,                -- Metadados EXIF da imagem
    timestamp_signature VARCHAR(255),  -- Assinatura do Carimbo do Tempo
    gps_location VARCHAR(255),         -- Localização da captura
    iso_compliance BOOLEAN DEFAULT 1,  -- Status de conformidade ISO 27037
    client_name VARCHAR(255),          -- Nome do cliente atendido
    professional_title VARCHAR(50),    -- Título usado no laudo
    professional_registry VARCHAR(50), -- Registro profissional
    professional_id VARCHAR(50),       -- ID profissional (rastreabilidade)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user_evidence FOREIGN KEY (user_id) 
        REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Tabela de Logs de Verificação (Trilha de Auditoria)
CREATE TABLE verification_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evidence_id INT NOT NULL,
    is_valid BOOLEAN NOT NULL,
    ip_address VARCHAR(45),
    verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_evidence_log FOREIGN KEY (evidence_id) 
        REFERENCES evidences(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Tabela de Sessões
CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token_id VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user_session FOREIGN KEY (user_id) 
        REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;
