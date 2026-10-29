export const seedDivisions = [
  {
    id: "corp",
    name: "Corporativo General – Casa Matriz",
    shortName: "Holding Del Valle",
    code: "EDV-HOLDING",
    description: "Gobernanza corporativa, finanzas fiduciarias y dirección estratégica.",
    color: "#092332",
    icon: "domain",
    resourceCount: 0
  },
  {
    id: "cerezera",
    name: "Inversiones Cerezera S.A.",
    shortName: "Inversiones Cerezera",
    code: "EDV-CEREZERA",
    description: "Gestión de portafolios, banca fiduciaria y colocación de capitales.",
    color: "#1e3a5f",
    icon: "account_balance",
    resourceCount: 0
  },
  {
    id: "america",
    name: "Radio América Multimedios",
    shortName: "Radio América",
    code: "EDV-AMERICA",
    description: "Radiodifusión de amplitud modulada y digital, comunicación e información masiva.",
    color: "#2a4d69",
    icon: "broadcast_on_personal",
    resourceCount: 0
  },
  {
    id: "daleo",
    name: "Daleo Desarrollos Inmobiliarios",
    shortName: "Daleo Inmobiliaria",
    code: "EDV-DALEO",
    description: "Desarrollo urbano, ingeniería civil y gestión de activos inmobiliarios.",
    color: "#34495e",
    icon: "apartment",
    resourceCount: 0
  },
  {
    id: "advision",
    name: "Advision Publicidad y Medios",
    shortName: "Advision Medios",
    code: "EDV-ADVISION",
    description: "Publicidad exterior masiva (OOH/DOOH), vallas e impacto visual urbano.",
    color: "#204051",
    icon: "campaign",
    resourceCount: 0
  }
];

// CERO recursos inventados: Solo existirán los creados por el Super Usuario en MariaDB
export const seedResources = [];

export const seedAuditLogs = [
  {
    id: "log-init-001",
    timestamp: new Date().toISOString(),
    userName: "Super Administrador",
    userRole: "Super Administrador",
    action: "SYSTEM_INIT",
    resourceTitle: "Inicio Seguro del Sistema Fiduciario",
    division: "Holding Del Valle",
    status: "Activo"
  }
];
