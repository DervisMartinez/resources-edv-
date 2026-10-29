import React, { useState } from 'react';
import Logo from './common/Logo.jsx';
import {
  ShieldCheck,
  Upload,
  Search,
  LogOut,
  User,
  Building,
  Bell,
  Activity,
  HelpCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function Navbar({
  currentUser,
  onLogout,
  onOpenUpload,
  onOpenAudit,
  onOpenHelp,
  activeDivision,
  onSelectDivision,
  divisions = []
}) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Política ISO 27001 actualizada', time: 'Hace 2 horas', unread: true },
    { id: 2, title: 'Nuevo modelo financiero Q3 cargado', time: 'Ayer', unread: false },
    { id: 3, title: 'Copia de seguridad fiduciaria completada', time: 'Hace 2 días', unread: false },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#092332] text-white shadow-lg border-b border-[#1e3a5f]">
      {/* Barra superior de gobernanza */}
      <div className="bg-[#000b14] px-4 md:px-10 py-1 flex items-center justify-between text-[11px] text-[#b1cadd] border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-semibold text-[#dae2ff]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Terminal Seguro Empresas Del Valle
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline font-mono">TLS 1.3 • ISO 27001 Fiduciario</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenAudit}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-[#3A5A78]" />
            <span>Auditoría de Actividad</span>
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#3A5A78]" />
            <span>Soporte TI 24/7</span>
          </button>
        </div>
      </div>

      {/* Barra principal de navegación */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between gap-4">
        {/* Identidad y Logo Oficial */}
        <div className="flex items-center gap-3">
          <Logo
            className="h-10 w-auto brightness-0 invert drop-shadow-sm"
            showText={true}
            textColor="text-white"
            subtitleColor="text-[#b1cadd]"
          />
        </div>

        {/* Selector de División activa */}
        <div className="hidden lg:flex items-center bg-[#132232] rounded-lg border border-[#3A5A78]/50 p-1">
          <span className="text-[10px] uppercase font-bold text-[#b1cadd] px-2.5">
            División:
          </span>
          <select
            value={activeDivision}
            onChange={(e) => onSelectDivision(e.target.value)}
            className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-2"
          >
            <option value="all" className="bg-[#092332] text-white">Todas las Divisiones (Holding)</option>
            <option value="corp" className="bg-[#092332] text-white">Corporativo General – Casa Matriz</option>
            <option value="cerezera" className="bg-[#092332] text-white">Inversiones Cerezera S.A.</option>
            <option value="america" className="bg-[#092332] text-white">Radio América Multimedios</option>
            <option value="daleo" className="bg-[#092332] text-white">Daleo Desarrollos Inmobiliarios</option>
            <option value="advision" className="bg-[#092332] text-white">Advision Publicidad y Medios</option>
          </select>
        </div>

        {/* Acciones del Lado Derecho */}
        <div className="flex items-center gap-3">
          {/* Botón Subir Recurso */}
          <button
            onClick={onOpenUpload}
            className="bg-[#3A5A78] hover:bg-[#4a6e92] text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-md border border-white/10 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Subir Recurso</span>
          </button>

          {/* Notificaciones */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 rounded-lg bg-[#132232] hover:bg-[#1e3a5f] border border-white/10 text-white flex items-center justify-center transition-colors relative cursor-pointer"
              title="Notificaciones Institucionales"
            >
              <Bell className="w-4 h-4 text-[#dae2ff]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-[#1c1c11] rounded-xl shadow-2xl border border-[#c3c7cc] p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
                  <span className="text-xs font-bold uppercase text-[#092332]">Avisos Corporativos</span>
                  <span className="text-[10px] bg-[#f7f4e2] text-[#3A5A78] px-2 py-0.5 rounded font-bold">1 Nuevo</span>
                </div>
                <div className="space-y-2">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-2 rounded text-xs transition-colors ${
                        notif.unread ? 'bg-[#f7f4e2] font-semibold' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-[#132232]">{notif.title}</div>
                      <div className="text-[10px] text-[#73787c]">{notif.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Usuario / Perfil Fiduciario */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2.5 p-1.5 rounded-lg bg-[#132232] hover:bg-[#1e3a5f] border border-white/10 transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#3A5A78] text-white flex items-center justify-center font-bold text-xs uppercase shadow-inner">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-white leading-none">
                  {currentUser?.name || 'Colaborador Fiduciario'}
                </span>
                <span className="text-[10px] text-[#b1cadd] leading-tight">
                  {currentUser?.role || 'Colaborador'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#b1cadd]" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-[#1c1c11] rounded-xl shadow-2xl border border-[#c3c7cc] p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="pb-3 border-b border-gray-100">
                  <div className="text-xs font-bold text-[#092332]">{currentUser?.name}</div>
                  <div className="text-[11px] text-[#73787c] truncate">{currentUser?.email}</div>
                  <div className="mt-1.5 inline-block text-[10px] font-semibold bg-[#f7f4e2] text-[#3A5A78] px-2 py-0.5 rounded border border-[#e5e3d2]">
                    {currentUser?.divisionName || 'Holding Del Valle'}
                  </div>
                </div>

                <div className="py-2 space-y-1 text-xs">
                  <button
                    onClick={() => { setShowUserDropdown(false); onOpenAudit(); }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-[#f7f4e2] text-[#43474c] flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <Activity className="w-3.5 h-3.5 text-[#3A5A78]" />
                    <span>Registro de Cumplimiento</span>
                  </button>
                  <button
                    onClick={() => { setShowUserDropdown(false); onOpenHelp(); }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-[#f7f4e2] text-[#43474c] flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-[#3A5A78]" />
                    <span>Mesa de Ayuda TI</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-2 py-1.5 rounded text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer font-bold text-xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar Sesión Segura</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
