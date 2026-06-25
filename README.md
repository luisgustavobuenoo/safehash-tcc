# 🔒 SafeHash: Custódia Digital Forense

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue )](https://www.typescriptlang.org/ )
[![Node.js](https://img.shields.io/badge/Node.js-20_LTS-green )](https://nodejs.org/ )
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange )](https://www.mysql.com/ )

O **SafeHash** é uma plataforma de nível profissional para registro e verificação de integridade de arquivos digitais. Focado no mercado de **Perícia Forense Digital**, o sistema garante a imutabilidade e a rastreabilidade de evidências através de algoritmos criptográficos avançados, em conformidade com os princípios da **ISO 27037**.

---

## 🚀 Diferenciais de Nível Sênior

O projeto segue as melhores práticas de engenharia de software e segurança:

*   **Cálculo de Hash no Client-side:** O SHA-256 é calculado diretamente no navegador. O arquivo original **nunca** trafega pela rede, garantindo privacidade total.
*   **Validação Robusta com Zod:** Todos os inputs da API são validados por esquemas rígidos, prevenindo injeções de dados malformados.
*   **Rate Limit Customizado:** Implementação de um middleware de proteção contra ataques de força bruta no login, limitando tentativas por IP.
*   **Tipagem Estática Total:** Uso rigoroso de TypeScript no Frontend e Backend para eliminar erros em tempo de execução.
*   **Trilha de Auditoria (Auditing):** Cada verificação de integridade gera um log imutável contendo IP, timestamp e resultado.

---

## 🏗️ Arquitetura do Sistema

O sistema adota o padrão **Monolito Modular**, priorizando a facilidade de deploy e a coesão dos domínios.

### Componentes:
- **Frontend:** React + Vite + TailwindCSS + Radix UI (Shadcn/UI).
- **Backend:** Node.js + Express + TypeScript.
- **Database:** MySQL 8.0 (Relacional).
- **Security:** JWT (Stateless Auth) + Bcrypt (Password Hashing).

---

## 📊 Modelo de Dados (DER)

A estrutura do banco de dados garante a integridade referencial e a rastreabilidade total:

```mermaid
erDiagram
    USERS ||--o{ EVIDENCES : "registra"
    USERS ||--o{ SESSIONS : "possui"
    EVIDENCES ||--o{ VERIFICATION_LOGS : "gera"

    USERS {
        int id PK
        string full_name
        string email UK
        string cpf UK
        string password_hash
        string professional_type
        string professional_id
    }

    EVIDENCES {
        int id PK
        int user_id FK
        string file_name
        char file_hash
        bigint file_size
        string mime_type
        json exif_metadata
        string timestamp_signature
        string gps_location
        boolean iso_compliance
    }

    VERIFICATION_LOGS {
        int id PK
        int evidence_id FK
        boolean is_valid
        string ip_address
        timestamp verified_at
    }
