-- 1. Criar o Banco de Dados
CREATE DATABASE IF NOT EXISTS safehash_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE safehash_db;

-- 2. Tabela de Usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Tabela de Evidências (Onde o registro do Hash fica salvo)
CREATE TABLE evidences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_hash CHAR(64) NOT NULL,      
    file_size BIGINT NOT NULL,         
    mime_type VARCHAR(100),            
    description TEXT,                  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user_evidence FOREIGN KEY (user_id) 
        REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Tabela de Logs de Verificação (Trilha de auditoria)
CREATE TABLE verification_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evidence_id INT NOT NULL,
    verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_valid BOOLEAN NOT NULL,         
    ip_address VARCHAR(45),            
    
    CONSTRAINT fk_evidence_log FOREIGN KEY (evidence_id) 
        REFERENCES evidences(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Tabela de Sessões (Controle de Login)
CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token_id VARCHAR(255) NOT NULL,    
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user_session FOREIGN KEY (user_id) 
        REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;