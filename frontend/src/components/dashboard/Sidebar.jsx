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
    <aside className="w-64 xl:w-72 bg-[#061219] text-white flex flex-col justify-between p-4 min-h-screen border-r border-[#142C3B] select-none font-montserrat sticky top-0 h-screen overflow-y-auto">
      {/* 1. Encabezado: Logo y Selector de Empresa */}
      <div>
        {/* Logo Institucional */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-auto brightness-0 invert opacity-95" showText={false} />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-white tracking-wider uppercase">
                DEL VALLE
              </span>
              <span className="text-[9px] text-[#B4BCC8] tracking-widest uppercase">
                Desde 1958
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-[#1A3441] text-[#CFCDBC] px-2 py-0.5 rounded-full font-bold border border-[#40606E]/40">
            v2.1
          </span>
        </div>

        {/* Píldora Selector de Empresa con Logo Real */}
        <div className="relative mb-5">
          <button
            onClick={() => isSuperAdmin && setShowDivisionMenu(!showDivisionMenu)}
            disabled={!isSuperAdmin}
            className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#0D2535] border border-[#1F3C4D] text-left transition-all shadow-sm ${
              isSuperAdmin ? 'hover:bg-[#122F43] cursor-pointer group' : 'cursor-default'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg p-0.5 bg-white flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
                <img src={activeLogo} alt={currentUnit.shortName} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate group-hover:text-[#CFCDBC] transition-colors">
                  {currentUnit.shortName || currentUnit.name}
                </span>
                <span className="text-[10px] text-[#B4BCC8] leading-none">
                  {isSuperAdmin ? 'Filial Activa (Cambiar)' : 'Tu Empresa Asignada'}
                </span>
              </div>
            </div>
            {isSuperAdmin && (
              <ChevronDown className={`w-4 h-4 text-[#B4BCC8] shrink-0 transition-transform ${showDivisionMenu ? 'rotate-180' : ''}`} />
            )}
          </button>

          {/* Menú Desplegable con Logos Reales */}
          {showDivisionMenu && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#092332] rounded-xl shadow-2xl border border-[#1F3C4D] p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="text-[10px] font-bold text-[#B4BCC8] uppercase tracking-wider px-2 py-1 mb-1">
                Seleccionar Empresa
              </div>
              <div className="space-y-1 max-h-56 overflow-y-auto">
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
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                        isSelected
                          ? 'bg-[#1F2E54] text-white font-bold'
                          : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-5 h-5 rounded bg-white p-0.5 flex items-center justify-center shrink-0 shadow-xs">
                          <img src={itemLogo} alt={unit.shortName} className="max-h-full max-w-full object-contain" />
                        </div>
                        <span className="truncate">{unit.shortName || unit.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 2. Menú Principal */}
        <nav className="space-y-1">
          {/* Inicio (Dashboard) */}
          <button
            onClick={() => onTabChange('inicio')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
              activeTab === 'inicio' || activeTab === 'dashboard'
                ? 'bg-[#0D2535] text-white border border-[#1F3C4D] shadow-sm'
                : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className={`w-4 h-4 ${activeTab === 'inicio' || activeTab === 'dashboard' ? 'text-emerald-400' : 'text-[#B4BCC8]'}`} />
            <span>Inicio</span>
          </button>

          {/* Academy & Cursos */}
          <button
            onClick={() => onTabChange('cursos')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
              activeTab === 'cursos'
                ? 'bg-[#0D2535] text-white border border-[#1F3C4D] shadow-sm'
                : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${activeTab === 'cursos' ? 'text-emerald-400' : 'text-[#B4BCC8]'}`} />
            <span>Academy & Cursos</span>
          </button>

          {/* Recursos & Documentos */}
          <button
            onClick={() => onTabChange('recursos')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
              activeTab === 'recursos'
                ? 'bg-[#0D2535] text-white border border-[#1F3C4D] shadow-sm'
                : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
            }`}
          >
            <FolderGit2 className={`w-4 h-4 ${activeTab === 'recursos' ? 'text-emerald-400' : 'text-[#B4BCC8]'}`} />
            <span>Recursos & Documentos</span>
          </button>

          {/* Comunidad */}
          <button
            onClick={() => onTabChange('comunidad')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
              activeTab === 'comunidad'
                ? 'bg-[#0D2535] text-white border border-[#1F3C4D] shadow-sm'
                : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users2 className={`w-4 h-4 ${activeTab === 'comunidad' ? 'text-emerald-400' : 'text-[#B4BCC8]'}`} />
              <span>Comunidad</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/90 text-white font-extrabold text-[10px] shadow-sm">
              12
            </span>
          </button>
        </nav>

        {/* 3. Sección: TU PROGRESO */}
        <div className="mt-6 pt-4 border-t border-[#142C3B]/80">
          <div className="text-[10px] font-bold text-[#8C9BA5] uppercase tracking-wider px-3 mb-2">
            Tu progreso
          </div>
          <div className="space-y-1">
            <button
              onClick={() => onTabChange('rutas')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                activeTab === 'rutas'
                  ? 'bg-[#0D2535] text-white border border-[#1F3C4D]'
                  : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
              }`}
            >
              <MapPin className={`w-4 h-4 ${activeTab === 'rutas' ? 'text-emerald-400' : 'text-[#B4BCC8]'}`} />
              <span>Rutas Departamentales</span>
            </button>

            <button
              onClick={() => onTabChange('certificados')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                activeTab === 'certificados'
                  ? 'bg-[#0D2535] text-white border border-[#1F3C4D]'
                  : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className={`w-4 h-4 ${activeTab === 'certificados' ? 'text-emerald-400' : 'text-[#B4BCC8]'}`} />
              <span>Certificados ISO 27001</span>
            </button>
          </div>
        </div>

        {/* 4. Sección: ADMINISTRACIÓN o HERRAMIENTAS */}
        <div className="mt-6 pt-4 border-t border-[#142C3B]/80">
          <div className="text-[10px] font-bold text-[#8C9BA5] uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
            <span>{isSuperAdmin ? 'Administración' : 'Herramientas'}</span>
            {isSuperAdmin && (
              <span className="text-[9px] bg-[#1F2E54] text-amber-300 px-1.5 py-0.2 rounded font-black">
                MASTER
              </span>
            )}
          </div>

          <div className="space-y-1">
            {isSuperAdmin ? (
              <>
                {/* Gestión de Usuarios */}
                <button
                  onClick={() => onTabChange('usuarios')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                    activeTab === 'usuarios'
                      ? 'bg-[#0D2535] text-white border border-[#1F3C4D] shadow-sm'
                      : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <UserCheck className={`w-4 h-4 ${activeTab === 'usuarios' ? 'text-amber-400' : 'text-[#B4BCC8]'}`} />
                  <span>Gestión de Usuarios</span>
                </button>

                {/* Subir y Crear Recursos */}
                <button
                  onClick={onOpenUpload}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold text-[#CFCDBC] hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-400" />
                  <span>Crear / Subir Recurso</span>
                </button>

                {/* Estructura & Departamentos (EDITAR EMPRESAS, DEPARTAMENTOS Y CATEGORÍAS) */}
                <button
                  onClick={onOpenStructure}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold text-[#CFCDBC] hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  <FolderTree className="w-4 h-4 text-amber-300" />
                  <span>Estructura & Deptos</span>
                </button>

                {/* Auditoría Fiduciaria */}
                <button
                  onClick={onOpenAudit}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold text-[#B4BCC8] hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Auditoría Fiduciaria</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onTabChange('herramientas')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                    activeTab === 'herramientas'
                      ? 'bg-[#0D2535] text-white border border-[#1F3C4D]'
                      : 'text-[#B4BCC8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Cpu className={`w-4 h-4 ${activeTab === 'herramientas' ? 'text-emerald-400' : 'text-[#B4BCC8]'}`} />
                  <span>Bóveda de Herramientas</span>
                </button>

                <button
                  onClick={onOpenHelp}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold text-[#B4BCC8] hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-blue-400" />
                  <span>Mesa de Ayuda TI</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 5. Pie de Barra Lateral */}
      <div className="pt-4 border-t border-[#142C3B] space-y-2">
        <div
          onClick={() => onTabChange('perfil')}
          className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0D2535]/70 hover:bg-[#0D2535] border border-[#1F3C4D]/60 transition-colors cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1F2E54] to-[#1A3441] text-white flex items-center justify-center font-bold text-xs ring-1 ring-white/20">
            {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-white truncate group-hover:text-[#CFCDBC]">
              {currentUser?.name || 'Colaborador'}
            </span>
            <span className="text-[10px] text-[#8C9BA5] truncate">
              {currentUser?.role || 'Colaborador Fiduciario'}
            </span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-500/10 transition-colors cursor-pointer border border-transparent hover:border-rose-500/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
