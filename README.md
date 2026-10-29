# Portal Corporativo de Recursos, Academy y Archivo Fiduciario
### **Empresas Del Valle S.A. — Desde 1958**

Plataforma corporativa integral desarrollada con arquitectura limpia, escalable y principios SOLID para el consorcio **Empresas Del Valle S.A.** (Holding Del Valle, Inversiones Cerezera, Radio América 95.5 FM, Daleo Construcciones, Advision DOOH y Valle Alto).

---

## 🏛️ Características Principales

1. **Gestión Fiduciaria por Filial y Departamento:**
   - Control de acceso estricto según la empresa a la que pertenece cada colaborador.
   - Vista aislada para usuarios normales: únicamente visualizan recursos y cursos asignados a su filial.
   - Herramienta corporativa principal: **Webmail Oficial de su Empresa** configurado con enlace directo.

2. **Panel Maestro de Super Administrador:**
   - Acceso global a todas las empresas del grupo.
   - Gestión y edición de la estructura corporativa: nombres de filiales, logos, códigos y URLs de Webmail.
   - Catálogo de Estudio (Academy) gestionado 100% en tiempo real: altas y bajas de cursos desde cero sin datos asumidos.
   - Gestión de usuarios corporativos con contraseñas cifradas en `bcrypt`.

3. **Pista de Auditoría en Tiempo Real:**
   - Registro inmutable de eventos fiduciarios en MariaDB (`CREATE_COURSE`, `DELETE_COURSE`, `CREATE_USER`, `DELETE_USER`, `CONFIG_UPDATE`, `UPLOAD`, `DOWNLOAD`, `LOGIN`).

4. **Diseño Visual e Identidad:**
   - Tipografía oficial exclusiva: **Montserrat**.
   - Paleta corporativa institucional: Azul Fiduciario (`#092332`), Azul Marino (`#1F2E54`), Pizarra (`#1A3441`, `#40606E`), Acero (`#B4BCC8`), Arena (`#CFCDBC`) y Blanco Marfil (`#FBFBF5`).

---

## 🗄️ Inicialización de Base de Datos en phpMyAdmin

Por motivos de seguridad y gobernanza corporativa, **ningún usuario administrativo o credencial se almacena en el repositorio de código fuente**. La base de datos debe ser inicializada mediante phpMyAdmin o la consola de MariaDB / MySQL.

### Paso 1: Crear Estructura de Tablas y Catálogos Maestros
Ejecuta en la pestaña **SQL** de tu **phpMyAdmin** el contenido del archivo [`database/init.sql`](database/init.sql). Esto creará la base de datos `edv_resources_db` y las tablas correspondientes con las empresas filiales y departamentos oficiales.

### Paso 2: Crear el Usuario Administrador
Una vez creadas las tablas, crea el usuario administrativo con permisos de Super Administrador mediante una inserción directa en la tabla `users` con su contraseña cifrada en `bcrypt`.


---

## 🚀 Despliegue y Ejecución

El proyecto está preparado para ejecutarse y desplegarse directamente tanto en servidores Node.js locales como en entornos de producción (VPS, cPanel, Cloud).

### 1. Variables de Entorno
Copia el archivo de ejemplo en el backend:
```bash
cp backend/.env.example backend/.env
```
Asegúrate de que los parámetros de `DB_HOST`, `DB_PORT`, `DB_USER` y `DB_PASSWORD` coincidan con tu servidor de base de datos.

### 2. Iniciar el Servidor (Producción)
El frontend ya se encuentra compilado en `frontend/dist/` para servirlo directamente desde Express:
```bash
cd backend
node server.js
```

El portal estará disponible de inmediato en:
👉 **`http://localhost:5000`**

### 3. Desarrollo (Opcional)
Si deseas modificar el frontend en caliente con Vite:
```bash
# Terminal 1: Backend API
cd backend
node server.js

# Terminal 2: Frontend Vite
cd frontend
pnpm run dev
```

---

## 📁 Estructura del Proyecto

```text
├── backend/
│   ├── config/             # Conexión MySQL/MariaDB y creación de tablas
│   ├── data/               # Semillas de respaldo resiliente
│   ├── uploads/            # Archivos y documentos fiduciarios
│   ├── server.js           # API REST Express consolidada
│   └── package.json        # Dependencias del backend
├── frontend/
│   ├── dist/               # Compilación lista para producción
│   ├── src/                # Código fuente React + Tailwind CSS
│   │   ├── components/     # Modales, vistas, barras y secciones
│   │   ├── constants/      # Paleta ACOMPAÑAMIENTO
│   │   └── services/       # Clientes de API y autenticación
│   └── package.json        # Dependencias del frontend
├── database/
│   └── init.sql            # Script de tablas y datos maestros iniciales
├── .gitignore              # Exclusiones de dependencias y secretos
├── package.json            # Scripts generales de arranque
└── README.md               # Documentación fiduciaria
```
