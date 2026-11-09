import React, { useState } from 'react';
import {
  Home,
  GraduationCap,
  FolderGit2,
  Users2,
  MapPin,
  Award,
  Settings,
  UserCheck,
  PlusCircle,
  Cpu,
  HelpCircle,
  LogOut,
  ChevronDown,
  Building2,
  ShieldCheck,
  Check,
  FolderTree
} from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { PALETTE } from '../../constants/theme.js';

export default function Sidebar({
  activeTab,
  onTabChange,
  currentUser,
  onLogout,
  selectedDivision = 'corp',
  onSelectDivision,
  divisions = [],
  onOpenUpload,
  onOpenAudit,
  onOpenHelp,
  onOpenStructure
}) {
  const [showDivisionMenu, setShowDivisionMenu] = useState(false);
  const isSuperAdmin = currentUser?.role === 'Super Administrador';

  const companyLogos = {
    all: '/logo-holding.png',
    corp: '/logo-holding.png',
    cerezera: '/logo-cerezera.png',
    america: '/logo-america.png',
    daleo: '/logo-daleo.png',
    advision: '/logo-advision.png',
    vallealto: '/logo-vallealto.png'
  };

  const businessUnits = divisions.length > 0 ? divisions : [
    { id: 'corp', shortName: 'Holding Del Valle', name: 'Empresas Del Valle (Holding)', color: '#1F2E54', logoPath: '/logo-holding.png' },
    { id: 'cerezera', shortName: 'Inversiones Cerezera', name: 'Cerezera Capital', color: '#10B981', logoPath: '/logo-cerezera.png' },
    { id: 'america', shortName: 'Radio América 95.5 FM', name: 'Radio América 95.5 FM', color: '#F59E0B', logoPath: '/logo-america.png' },
    { id: 'daleo', shortName: 'Daleo Construcciones', name: 'Daleo Desarrollos Inmobiliarios', color: '#3B82F6', logoPath: '/logo-daleo.png' },
    { id: 'advision', shortName: 'Advision DOOH', name: 'Advision Publicidad y Medios', color: '#EC4899', logoPath: '/logo-advision.png' },
    { id: 'vallealto', shortName: 'Valle Alto', name: 'Desarrollos Valle Alto', color: '#1F2E54', logoPath: '/logo-vallealto.png' },
  ];

  const effectiveDivision = isSuperAdmin ? selectedDivision : (currentUser?.division || 'corp');
  const currentUnit = businessUnits.find(u => u.id === effectiveDivision) || businessUnits[0];
  const activeLogo = companyLogos[currentUnit.id] || currentUnit.logoPath || '/logo-holding.png';

  return (
    <aside className="w-64 xl:w-72 bg-[#07151D] text-white flex flex-col justify-between p-4 min-h-screen border-r border-[#142C3B] select-none font-montserrat sticky top-0 h-screen overflow-y-auto">
      {/* 1. Encabezado: macOS Traffic Lights + Logo y Selector de Empresa */}
      <div>
        {/* Controles de Ventana macOS (Traffic Lights) */}
        <div className="flex items-center justify-between mb-4 px-1 pt-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-2xs hover:opacity-80 transition-opacity"></span>
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-2xs hover:opacity-80 transition-opacity"></span>
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-2xs hover:opacity-80 transition-opacity"></span>
          </div>
          <span className="text-[10px] bg-white/5 text-[#CFCDBC] px-2 py-0.5 rounded-md font-semibold border border-white/10">
            v2.1
          </span>
        </div>

        {/* Logo Institucional */}
        <div className="flex items-center gap-2.5 mb-4 px-1">
          <Logo className="h-7 w-auto brightness-0 invert opacity-95" showText={false} />
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-white tracking-wider uppercase leading-none">
              EMPRESAS DEL VALLE
            </span>
            <span className="text-[9px] text-[#B4BCC8] tracking-widest uppercase mt-0.5">
              Desde 1958
            </span>
          </div>
        </div>

        {/* Pop-up Button: Selector de Empresa (macOS Menu Button) */}
        <div className="relative mb-5">
          <button
            onClick={() => isSuperAdmin && setShowDivisionMenu(!showDivisionMenu)}
            disabled={!isSuperAdmin}
            className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#0D2535] border border-[#1F3C4D] text-left transition-all shadow-xs ${
              isSuperAdmin ? 'hover:bg-[#122F43] cursor-pointer group' : 'cursor-default'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded bg-white p-0.5 flex items-center justify-center shrink-0 border border-white/20">
                <img src={activeLogo} alt={currentUnit.shortName} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-bold text-white truncate group-hover:text-[#CFCDBC] transition-colors leading-tight">
                  {currentUnit.shortName || currentUnit.name}
                </span>
                <span className="text-[9px] text-[#8C9BA5] leading-none">
                  {isSuperAdmin ? 'Filial Activa (Cambiar)' : 'Tu Empresa'}
                </span>
              </div>
            </div>
            {isSuperAdmin && (
              <ChevronDown className={`w-3.5 h-3.5 text-[#B4BCC8] shrink-0 transition-transform ${showDivisionMenu ? 'rotate-180' : ''}`} />
            )}
          </button>

          {/* Menú Desplegable con Logos Reales */}
          {showDivisionMenu && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#092332] rounded-xl shadow-2xl border border-[#1F3C4D] p-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="text-[9px] font-bold text-[#8C9BA5] uppercase tracking-wider px-2 py-1 mb-1">
                Filiales del Grupo
              </div>
              <div className="space-y-0.5 max-h-56 overflow-y-auto">
                {businessUnits.map((unit) => {
                  const isSelected = unit.id === selectedDivision;
                  const itemLogo = companyLogos[unit.id] || unit.logoPath || '/logo-holding.png';
                  return (
                    <button
                      key={unit.id}
                      onClick={() => {
                        if (onSelectDivision) onSelectDivision(unit.id);
                        setShowDivisionMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                        isSelected
                          ? 'bg-[#1F2E54] text-white font-bold'
                          : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div className="w-5 h-5 rounded bg-white p-0.5 flex items-center justify-center shrink-0">
                          <img src={itemLogo} alt={unit.shortName} className="max-h-full max-w-full object-contain" />
                        </div>
                        <span className="truncate text-[12px]">{unit.shortName || unit.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 2. Menú Principal estilo macOS Source List */}
        <div>
          <div className="text-[10px] font-semibold text-[#8C9BA5] uppercase tracking-wider px-3 mb-1.5">
            Principal
          </div>
          <nav className="space-y-0.5">
            {/* Inicio */}
            <button
              onClick={() => onTabChange('inicio')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                activeTab === 'inicio' || activeTab === 'dashboard'
                  ? 'bg-[#1F2E54] text-white font-semibold shadow-xs border border-white/10'
                  : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-4 h-4 shrink-0" />
              <span>Inicio</span>
            </button>

            {/* Academy & Cursos */}
            <button
              onClick={() => onTabChange('cursos')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                activeTab === 'cursos'
                  ? 'bg-[#1F2E54] text-white font-semibold shadow-xs border border-white/10'
                  : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
              }`}
            >
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span>Academy & Cursos</span>
            </button>

            {/* Recursos & Documentos */}
            <button
              onClick={() => onTabChange('recursos')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                activeTab === 'recursos'
                  ? 'bg-[#1F2E54] text-white font-semibold shadow-xs border border-white/10'
                  : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
              }`}
            >
              <FolderGit2 className="w-4 h-4 shrink-0" />
              <span>Bóveda de Recursos</span>
            </button>

            {/* Herramientas & Webmails */}
            <button
              onClick={() => onTabChange('herramientas')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                activeTab === 'herramientas'
                  ? 'bg-[#1F2E54] text-white font-semibold shadow-xs border border-white/10'
                  : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-4 h-4 shrink-0" />
              <span>Herramientas & Webmail</span>
            </button>
          </nav>
        </div>

        {/* 3. Sección: RECONOCIMIENTOS */}
        <div className="mt-5 pt-3 border-t border-[#142C3B]">
          <div className="text-[10px] font-semibold text-[#8C9BA5] uppercase tracking-wider px-3 mb-1.5">
            Acreditaciones
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onTabChange('certificados')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-[#B4BCC8] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 shrink-0 text-[#CFCDBC]" />
              <span>Certificados ISO 27001</span>
            </button>

            <button
              onClick={onOpenHelp}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-[#B4BCC8] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 shrink-0 text-blue-400" />
              <span>Mesa de Ayuda TI</span>
            </button>
          </div>
        </div>

        {/* 4. Sección: ADMINISTRACIÓN (Solo Super Administrador) */}
        {isSuperAdmin && (
          <div className="mt-5 pt-3 border-t border-[#142C3B]">
            <div className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider px-3 mb-1.5 flex items-center justify-between">
              <span>Administración</span>
              <span className="text-[9px] bg-[#1F2E54] text-amber-300 px-1.5 py-0.2 rounded font-bold">
                MASTER
              </span>
            </div>

            <div className="space-y-0.5">
              {/* Gestión de Usuarios */}
              <button
                onClick={() => onTabChange('usuarios')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                  activeTab === 'usuarios'
                    ? 'bg-[#1F2E54] text-white font-semibold shadow-xs border border-white/10'
                    : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
                }`}
              >
                <UserCheck className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Gestión de Usuarios</span>
              </button>

              {/* Subir y Crear Recursos */}
              <button
                onClick={onOpenUpload}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-[#CFCDBC] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>+ Crear / Subir Recurso</span>
              </button>

              {/* Estructura & Departamentos */}
              <button
                onClick={onOpenStructure}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-[#CFCDBC] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <FolderTree className="w-4 h-4 shrink-0 text-amber-300" />
                <span>Estructura & Deptos</span>
              </button>

              {/* Auditoría Fiduciaria */}
              <button
                onClick={onOpenAudit}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-[#B4BCC8] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>Auditoría Fiduciaria</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. Pie de Barra Lateral: Cuenta de Usuario macOS */}
      <div className="pt-3 border-t border-[#142C3B] space-y-1.5">
        <div
          onClick={() => onTabChange('perfil')}
          className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0D2535] hover:bg-[#122F43] border border-[#1F3C4D] transition-colors cursor-pointer group"
          title="Ver perfil del colaborador"
        >
          <div className="w-7 h-7 rounded-full bg-[#1F2E54] border border-white/20 text-white flex items-center justify-center font-bold text-xs shrink-0">
            {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[12px] font-semibold text-white truncate group-hover:text-[#CFCDBC] leading-tight">
              {currentUser?.name || 'Colaborador'}
            </span>
            <span className="text-[10px] text-[#8C9BA5] truncate leading-tight">
              {currentUser?.role || 'Colaborador Fiduciario'}
            </span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-rose-300 hover:text-white hover:bg-rose-500/15 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
