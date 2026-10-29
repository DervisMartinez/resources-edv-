-- ==================================================================================
-- EMPRESAS DEL VALLE S.A. - DESDE 1958
-- PORTAL DE RECURSOS CORPORATIVOS, ACADEMY Y ARCHIVO FIDUCIARIO
-- SCRIPT DE INICIALIZACIÓN COMPLETA PARA phpMyAdmin / MySQL / MariaDB
-- ==================================================================================

CREATE DATABASE IF NOT EXISTS `edv_resources_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `edv_resources_db`;

-- -------------------------------------------------------------
-- 1. TABLA: users (Usuarios Corporativos y Super Administrador)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(100) NOT NULL DEFAULT 'Colaborador Fiduciario',
  `division` VARCHAR(50) NOT NULL DEFAULT 'corp',
  `department` VARCHAR(100) NOT NULL DEFAULT 'Gobernanza General',
  `phone` VARCHAR(50) NULL,
  `security_level` VARCHAR(100) DEFAULT 'TLS 1.3 - ISO 27001 Fiduciario',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 2. TABLA: companies (Empresas / Filiales del Grupo)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `companies` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `short_name` VARCHAR(255) NOT NULL,
  `code` VARCHAR(50) NOT NULL,
  `description` TEXT NULL,
  `color` VARCHAR(50) DEFAULT '#092332',
  `logo_path` VARCHAR(255) DEFAULT '/logo-holding.png',
  `webmail_url` VARCHAR(255) DEFAULT 'https://webmail.empresasdelvalle.com.ve',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 3. TABLA: departments (Departamentos por Empresa)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `departments` (
  `id` VARCHAR(64) PRIMARY KEY,
  `company_id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 4. TABLA: categories (Categorías Documentales)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `icon` VARCHAR(50) DEFAULT 'folder',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 5. TABLA: courses (Catálogo de Estudio - Academy)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `courses` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `division` VARCHAR(50) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `level` VARCHAR(50) DEFAULT 'Básico',
  `duration` VARCHAR(50) DEFAULT '1h 30m',
  `modules_count` VARCHAR(50) DEFAULT '5 Módulos',
  `badge` VARCHAR(50) DEFAULT 'Curso Corporativo',
  `description` TEXT NULL,
  `instructor` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 6. TABLA: resources (Bóveda Documental Fiduciaria)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `resources` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `division` VARCHAR(50) NOT NULL,
  `department` VARCHAR(100) NOT NULL DEFAULT 'Gobernanza & Legal',
  `category` VARCHAR(50) NOT NULL,
  `file_type` VARCHAR(20) NOT NULL,
  `file_name` VARCHAR(255) NOT NULL,
  `file_size` VARCHAR(50) NOT NULL,
  `version` VARCHAR(20) NOT NULL DEFAULT 'v1.0',
  `confidentiality` VARCHAR(50) NOT NULL DEFAULT 'Uso Interno',
  `description` TEXT NULL,
  `author` VARCHAR(255) NULL,
  `updated_at` DATE NULL,
  `downloads_count` INT DEFAULT 0,
  `is_favorite` TINYINT(1) DEFAULT 0,
  `tags` TEXT NULL,
  `file_path` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 7. TABLA: audit_logs (Trazabilidad y Auditoría en Tiempo Real)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` VARCHAR(64) PRIMARY KEY,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `user_name` VARCHAR(255) NULL,
  `user_role` VARCHAR(100) NULL,
  `action` VARCHAR(50) NULL,
  `resource_title` VARCHAR(255) NULL,
  `division` VARCHAR(100) NULL,
  `status` VARCHAR(100) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- DATOS INICIALES: EMPRESAS DEL VALLE
-- =============================================================
INSERT INTO `companies` (`id`, `name`, `short_name`, `code`, `description`, `color`, `logo_path`, `webmail_url`) VALUES
('corp', 'Corporativo General – Casa Matriz', 'Holding Del Valle', 'EDV-HOLDING', 'Gobernanza corporativa, finanzas fiduciarias y dirección estratégica.', '#092332', '/logo-holding.png', 'https://webmail.empresasdelvalle.com.ve'),
('cerezera', 'Inversiones Cerezera S.A.', 'Inversiones Cerezera', 'EDV-CEREZERA', 'Gestión de portafolios, banca fiduciaria y colocación de capitales.', '#1e3a5f', '/logo-cerezera.png', 'https://webmail.cerezera.com.ve'),
('america', 'Radio América Multimedios', 'Radio América 95.5 FM', 'EDV-AMERICA', 'Radiodifusión de amplitud modulada y digital, comunicación e información masiva.', '#2a4d69', '/logo-america.png', 'https://mail.radioamerica.com.ve'),
('daleo', 'Daleo Desarrollos Inmobiliarios', 'Daleo Construcciones', 'EDV-DALEO', 'Desarrollo urbano, ingeniería civil y gestión de activos inmobiliarios.', '#34495e', '/logo-daleo.png', 'https://mail.daleo.com.ve'),
('advision', 'Advision Publicidad y Medios', 'Advision DOOH', 'EDV-ADVISION', 'Publicidad exterior masiva (OOH/DOOH), vallas e impacto visual urbano.', '#204051', '/logo-advision.png', 'https://webmail.advision.com.ve'),
('vallealto', 'Desarrollos Valle Alto', 'Valle Alto', 'EDV-VALLEALTO', 'Desarrollos urbanos residenciales sostenibles.', '#1F2E54', '/logo-vallealto.png', 'https://webmail.vallealto.com.ve')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `webmail_url` = VALUES(`webmail_url`);

-- =============================================================
-- DATOS INICIALES: DEPARTAMENTOS POR EMPRESA
-- =============================================================
INSERT INTO `departments` (`id`, `company_id`, `name`) VALUES
('dept-corp-1', 'corp', 'Dirección General & Presidencia'),
('dept-corp-2', 'corp', 'Gobernanza, Legal & Cumplimiento'),
('dept-corp-3', 'corp', 'Auditoría Fiduciaria ISO 27001'),
('dept-corp-4', 'corp', 'Finanzas & Tesorería Central'),
('dept-corp-5', 'corp', 'Talento Humano & Beneficios'),
('dept-corp-6', 'corp', 'Tecnología e Infraestructura TI'),
('dept-cer-1', 'cerezera', 'Mesa de Dinero & Inversiones'),
('dept-cer-2', 'cerezera', 'Análisis de Riesgos Cuantitativos'),
('dept-cer-3', 'cerezera', 'Gestión de Portafolios de Capital'),
('dept-cer-4', 'cerezera', 'Contabilidad & Liquidación Bursátil'),
('dept-ame-1', 'america', 'Dirección Editorial & Noticias'),
('dept-ame-2', 'america', 'Cabina Master & Transmisión'),
('dept-ame-3', 'america', 'Producción & Contenidos Multimedia'),
('dept-ame-4', 'america', 'Comercialización & Pautas Radiales'),
('dept-dal-1', 'daleo', 'Ingeniería Civil & Proyectos Urbanos'),
('dept-dal-2', 'daleo', 'Seguridad y Salud Laboral en Obras'),
('dept-dal-3', 'daleo', 'Costos, Presupuestos & APU'),
('dept-dal-4', 'daleo', 'Arquitectura & Diseño Sostenible'),
('dept-adv-1', 'advision', 'Operaciones & Mantenimiento DOOH'),
('dept-adv-2', 'advision', 'Planificación de Medios Exteriores'),
('dept-adv-3', 'advision', 'Comercialización & Cuentas Clave'),
('dept-adv-4', 'advision', 'Tráfico & Pautas de Pantallas LED'),
('dept-val-1', 'vallealto', 'Desarrollo Urbanístico & Terrenos'),
('dept-val-2', 'vallealto', 'Ventas & Comercialización Residencial'),
('dept-val-3', 'vallealto', 'Atención a Propietarios')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- =============================================================
-- DATOS INICIALES: CATEGORÍAS DOCUMENTALES
-- =============================================================
INSERT INTO `categories` (`id`, `name`, `description`, `icon`) VALUES
('governance', 'Políticas & Gobernanza', 'Normativas, políticas fiduciarias y reglamentos corporativos.', 'shield'),
('hr', 'Talento Humano & Beneficios', 'Nómina, beneficios, salud ocupacional y permisos laborales.', 'users'),
('brand', 'Identidad de Marca & Medios', 'Manuales gráficos, logotipos, tipografías y pautas de marca.', 'palette'),
('templates', 'Plantillas & Formularios', 'Formatos editables en Excel, Word y minutas legales.', 'file-text'),
('tools', 'Herramientas & Accesos TI', 'Manuales de sistemas internos, accesos SAP y guías técnicas.', 'cpu')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);
