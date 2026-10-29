import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'edv_resources_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool = null;
let isConnected = false;

export async function initDatabase() {
  try {
    // 1. Conexión inicial sin base de datos
    const initConnection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
    });

    console.log(`[Database] Conectado a MariaDB/MySQL en ${dbConfig.host}:${dbConfig.port}`);

    // 2. Crear la base de datos si no existe
    await initConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await initConnection.end();

    // 3. Crear pool apuntando a la base de datos
    pool = mysql.createPool(dbConfig);

    // 4. Crear tabla 'users'
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` VARCHAR(64) PRIMARY KEY,
        \`name\` VARCHAR(255) NOT NULL,
        \`email\` VARCHAR(255) NOT NULL UNIQUE,
        \`password\` VARCHAR(255) NOT NULL,
        \`role\` VARCHAR(100) NOT NULL DEFAULT 'Colaborador Fiduciario',
        \`division\` VARCHAR(50) NOT NULL DEFAULT 'corp',
        \`department\` VARCHAR(100) NOT NULL DEFAULT 'Gobernanza General',
        \`phone\` VARCHAR(50) NULL,
        \`security_level\` VARCHAR(100) DEFAULT 'TLS 1.3 - ISO 27001 Fiduciario',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    try {
      await pool.query(`ALTER TABLE \`users\` ADD COLUMN \`department\` VARCHAR(100) NOT NULL DEFAULT 'Gobernanza General'`);
    } catch (e) {}

    // 5. Crear tabla 'resources'
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`resources\` (
        \`id\` VARCHAR(64) PRIMARY KEY,
        \`title\` VARCHAR(255) NOT NULL,
        \`division\` VARCHAR(50) NOT NULL,
        \`department\` VARCHAR(100) NOT NULL DEFAULT 'Gobernanza & Legal',
        \`category\` VARCHAR(50) NOT NULL,
        \`file_type\` VARCHAR(20) NOT NULL,
        \`file_name\` VARCHAR(255) NOT NULL,
        \`file_size\` VARCHAR(50) NOT NULL,
        \`version\` VARCHAR(20) NOT NULL DEFAULT 'v1.0',
        \`confidentiality\` VARCHAR(50) NOT NULL DEFAULT 'Uso Interno',
        \`description\` TEXT NULL,
        \`author\` VARCHAR(255) NULL,
        \`updated_at\` DATE NULL,
        \`downloads_count\` INT DEFAULT 0,
        \`is_favorite\` TINYINT(1) DEFAULT 0,
        \`tags\` TEXT NULL,
        \`file_path\` TEXT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    try {
      await pool.query(`ALTER TABLE \`resources\` ADD COLUMN \`department\` VARCHAR(100) NOT NULL DEFAULT 'Gobernanza & Legal'`);
    } catch (e) {}

    // 6. Crear tabla 'audit_logs'
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`audit_logs\` (
        \`id\` VARCHAR(64) PRIMARY KEY,
        \`timestamp\` DATETIME DEFAULT CURRENT_TIMESTAMP,
        \`user_name\` VARCHAR(255) NULL,
        \`user_role\` VARCHAR(100) NULL,
        \`action\` VARCHAR(50) NULL,
        \`resource_title\` VARCHAR(255) NULL,
        \`division\` VARCHAR(100) NULL,
        \`status\` VARCHAR(100) NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 7. Crear tabla 'companies' (Editable por el Super Usuario)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`companies\` (
        \`id\` VARCHAR(64) PRIMARY KEY,
        \`name\` VARCHAR(255) NOT NULL,
        \`short_name\` VARCHAR(255) NOT NULL,
        \`code\` VARCHAR(50) NOT NULL,
        \`description\` TEXT NULL,
        \`color\` VARCHAR(50) DEFAULT '#092332',
        \`logo_path\` VARCHAR(255) DEFAULT '/logo-holding.png',
        \`webmail_url\` VARCHAR(255) DEFAULT 'https://webmail.empresasdelvalle.com.ve',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    try {
      await pool.query(`ALTER TABLE \`companies\` ADD COLUMN \`webmail_url\` VARCHAR(255) DEFAULT 'https://webmail.empresasdelvalle.com.ve'`);
    } catch (e) {}

    // 8. Crear tabla 'departments' (Editable por el Super Usuario)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`departments\` (
        \`id\` VARCHAR(64) PRIMARY KEY,
        \`company_id\` VARCHAR(64) NOT NULL,
        \`name\` VARCHAR(255) NOT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 9. Crear tabla 'categories' (Editable por el Super Usuario)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`categories\` (
        \`id\` VARCHAR(64) PRIMARY KEY,
        \`name\` VARCHAR(255) NOT NULL,
        \`description\` TEXT NULL,
        \`icon\` VARCHAR(50) DEFAULT 'folder',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 10. Crear tabla 'courses' (Catálogo de Estudio - Gestionado por el Super Usuario)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`courses\` (
        \`id\` VARCHAR(64) PRIMARY KEY,
        \`title\` VARCHAR(255) NOT NULL,
        \`division\` VARCHAR(50) NOT NULL,
        \`department\` VARCHAR(100) NOT NULL,
        \`level\` VARCHAR(50) DEFAULT 'Básico',
        \`duration\` VARCHAR(50) DEFAULT '1h 30m',
        \`modules_count\` VARCHAR(50) DEFAULT '5 Módulos',
        \`badge\` VARCHAR(50) DEFAULT 'Curso Corporativo',
        \`description\` TEXT NULL,
        \`instructor\` VARCHAR(255) NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 10. Sembrar Empresas iniciales con sus logos reales si la tabla está vacía
    const [existingCompanies] = await pool.query(`SELECT COUNT(*) as count FROM \`companies\``);
    if (existingCompanies[0].count === 0) {
      const initialCompanies = [
        ['corp', 'Corporativo General – Casa Matriz', 'Holding Del Valle', 'EDV-HOLDING', 'Gobernanza corporativa, finanzas fiduciarias y dirección estratégica.', '#092332', '/logo-holding.png'],
        ['cerezera', 'Inversiones Cerezera S.A.', 'Inversiones Cerezera', 'EDV-CEREZERA', 'Gestión de portafolios, banca fiduciaria y colocación de capitales.', '#1e3a5f', '/logo-cerezera.png'],
        ['america', 'Radio América Multimedios', 'Radio América 95.5 FM', 'EDV-AMERICA', 'Radiodifusión de amplitud modulada y digital, comunicación e información masiva.', '#2a4d69', '/logo-america.png'],
        ['daleo', 'Daleo Desarrollos Inmobiliarios', 'Daleo Construcciones', 'EDV-DALEO', 'Desarrollo urbano, ingeniería civil y gestión de activos inmobiliarios.', '#34495e', '/logo-daleo.png'],
        ['advision', 'Advision Publicidad y Medios', 'Advision DOOH', 'EDV-ADVISION', 'Publicidad exterior masiva (OOH/DOOH), vallas e impacto visual urbano.', '#204051', '/logo-advision.png'],
        ['vallealto', 'Desarrollos Valle Alto', 'Valle Alto', 'EDV-VALLEALTO', 'Desarrollos urbanos residenciales sostenibles.', '#1F2E54', '/logo-vallealto.png']
      ];

      for (const c of initialCompanies) {
        await pool.query(
          `INSERT INTO \`companies\` (\`id\`, \`name\`, \`short_name\`, \`code\`, \`description\`, \`color\`, \`logo_path\`) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          c
        );
      }
      console.log(`[Database] Empresas iniciales registradas en MariaDB.`);
    }

    // 11. Sembrar Departamentos iniciales si la tabla está vacía
    const [existingDepts] = await pool.query(`SELECT COUNT(*) as count FROM \`departments\``);
    if (existingDepts[0].count === 0) {
      const initialDepts = [
        // Holding
        ['dept-corp-1', 'corp', 'Dirección General & Presidencia'],
        ['dept-corp-2', 'corp', 'Gobernanza, Legal & Cumplimiento'],
        ['dept-corp-3', 'corp', 'Auditoría Fiduciaria ISO 27001'],
        ['dept-corp-4', 'corp', 'Finanzas & Tesorería Central'],
        ['dept-corp-5', 'corp', 'Talento Humano & Beneficios'],
        ['dept-corp-6', 'corp', 'Tecnología e Infraestructura TI'],
        // Cerezera
        ['dept-cer-1', 'cerezera', 'Mesa de Dinero & Inversiones'],
        ['dept-cer-2', 'cerezera', 'Análisis de Riesgos Cuantitativos'],
        ['dept-cer-3', 'cerezera', 'Gestión de Portafolios de Capital'],
        ['dept-cer-4', 'cerezera', 'Contabilidad & Liquidación Bursátil'],
        // Radio América
        ['dept-ame-1', 'america', 'Dirección Editorial & Noticias'],
        ['dept-ame-2', 'america', 'Cabina Master & Transmisión'],
        ['dept-ame-3', 'america', 'Producción & Contenidos Multimedia'],
        ['dept-ame-4', 'america', 'Comercialización & Pautas Radiales'],
        // Daleo
        ['dept-dal-1', 'daleo', 'Ingeniería Civil & Proyectos Urbanos'],
        ['dept-dal-2', 'daleo', 'Seguridad y Salud Laboral en Obras'],
        ['dept-dal-3', 'daleo', 'Costos, Presupuestos & APU'],
        ['dept-dal-4', 'daleo', 'Arquitectura & Diseño Sostenible'],
        // Advision
        ['dept-adv-1', 'advision', 'Operaciones & Mantenimiento DOOH'],
        ['dept-adv-2', 'advision', 'Planificación de Medios Exteriores'],
        ['dept-adv-3', 'advision', 'Comercialización & Cuentas Clave'],
        ['dept-adv-4', 'advision', 'Tráfico & Pautas de Pantallas LED'],
        // Valle Alto
        ['dept-val-1', 'vallealto', 'Desarrollo Urbanístico & Terrenos'],
        ['dept-val-2', 'vallealto', 'Ventas & Comercialización Residencial'],
        ['dept-val-3', 'vallealto', 'Atención a Propietarios']
      ];

      for (const d of initialDepts) {
        await pool.query(
          `INSERT INTO \`departments\` (\`id\`, \`company_id\`, \`name\`) VALUES (?, ?, ?)`,
          d
        );
      }
      console.log(`[Database] Departamentos iniciales registrados en MariaDB.`);
    }

    // 12. Sembrar Categorías iniciales si la tabla está vacía
    const [existingCategories] = await pool.query(`SELECT COUNT(*) as count FROM \`categories\``);
    if (existingCategories[0].count === 0) {
      const initialCategories = [
        ['governance', 'Políticas & Gobernanza', 'Normativas, políticas fiduciarias y reglamentos corporativos.', 'shield'],
        ['hr', 'Talento Humano & Beneficios', 'Nómina, beneficios, salud ocupacional y permisos laborales.', 'users'],
        ['brand', 'Identidad de Marca & Medios', 'Manuales gráficos, logotipos, tipografías y pautas de marca.', 'palette'],
        ['templates', 'Plantillas & Formularios', 'Formatos editables en Excel, Word y minutas legales.', 'file-text'],
        ['tools', 'Herramientas & Accesos TI', 'Manuales de sistemas internos, accesos SAP y guías técnicas.', 'cpu']
      ];

      for (const cat of initialCategories) {
        await pool.query(
          `INSERT INTO \`categories\` (\`id\`, \`name\`, \`description\`, \`icon\`) VALUES (?, ?, ?, ?)`,
          cat
        );
      }
      console.log(`[Database] Categorías iniciales registradas en MariaDB.`);
    }

    isConnected = true;
    return pool;
  } catch (error) {
    console.error('[Database] Advertencia al conectar con MySQL/MariaDB:', error.message);
    isConnected = false;
    return null;
  }
}

export function getPool() {
  return pool;
}

export function isDbConnected() {
  return isConnected;
}
