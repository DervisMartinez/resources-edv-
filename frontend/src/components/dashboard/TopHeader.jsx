import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  Shield,
  ChevronDown,
  User as UserIcon,
  CheckCircle2,
  X
} from 'lucide-react';
import { PALETTE } from '../../constants/theme.js';

/**
 * TopHeader - Barra superior oscura inspirada directamente en el diseño del mockup
 * Utiliza la paleta ACOMPAÑAMIENTO y tipografía Montserrat
 */
export default function TopHeader({
  currentUser,
  searchQuery,
  onSearchChange,
  onOpenAssistant,
  onOpenNotifications,
  onProfileClick,
  userPoints = 13,
  selectedDivision,
  onSelectDivision,
  divisions = []
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const isSuperAdmin = currentUser?.role === 'Super Administrador';

  const notifications = [
    {
      id: 1,
      title: 'Plazo de Curso: Gobernanza Fiduciaria ISO 27001 vence en 3 días',
      time: 'Hace 45 min',
      unread: true,
      tag: 'Capacitación'
    },
    {
      id: 2,
      title: 'Nuevo recurso asignado a tu departamento: Manual Operativo 2026',
      time: 'Ayer',
      unread: true,
      tag: 'Recurso'
    },
    {
      id: 3,
      title: 'Verificación de Seguridad Fiduciaria aprobada satisfactoriamente',
      time: 'Hace 2 días',
      unread: false,
      tag: 'Seguridad'
    }
  ];

  return (
    <header className="h-14 bg-[#091E2A] border-b border-[#142C3B] px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-6 select-none font-montserrat sticky top-0 z-40">
      {/* Buscador macOS Toolbar con atajo ⌘ K */}
      <div className="relative flex-1 max-w-lg">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-[#8C9BA5] absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por curso, documento o departamento..."
            className="w-full h-8 pl-8 pr-14 bg-[#0D2535] hover:bg-[#112F42] focus:bg-[#112F42] text-white placeholder:text-[#8C9BA5] text-[12px] font-medium rounded-lg border border-[#1F3C4D] focus:border-[#40606E] focus:outline-none focus:ring-1 focus:ring-[#CFCDBC]/30 shadow-inner transition-all"
          />
          <div className="absolute right-2 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#1A3441] border border-[#2B4B58] text-[9px] font-bold text-[#B4BCC8] pointer-events-none">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Acciones del lado derecho: Toolbar Buttons de macOS */}
      <div className="flex items-center gap-2">
        {/* Botón Asistente macOS Push Button */}
        <button
          onClick={onOpenAssistant}
          className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#CFCDBC] hover:text-white text-[12px] font-medium shadow-xs transition-colors cursor-pointer group"
          title="Consultar al Asistente Fiduciario Corporativo"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-105 transition-transform" />
          <span className="hidden sm:inline">Asistente</span>
        </button>

        {/* Píldora de Puntos / Acreditaciones Fiduciarias */}
        <div
          className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-[#0D2535] border border-[#1F3C4D] text-[12px] font-bold text-emerald-400 shadow-xs"
          title="Acreditaciones Fiduciarias"
        >
          <span className="text-xs">🛡️</span>
          <span className="text-[#FBFBF5]">{userPoints}</span>
        </div>

        {/* Notificaciones */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#B4BCC8] hover:text-white border border-white/10 flex items-center justify-center transition-colors relative cursor-pointer shadow-xs"
            title="Avisos y Notificaciones"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-[#092332] rounded-xl shadow-2xl border border-[#1F3C4D] p-3.5 z-50 animate-in fade-in zoom-in-95 text-white">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#1A3441] mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#FBFBF5]">
                    Avisos Fiduciarios
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md font-bold">
                    2 Nuevos
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[#B4BCC8] hover:text-white p-1 rounded-md hover:bg-white/5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg text-xs transition-colors border ${
                      n.unread
                        ? 'bg-[#0D2535] border-[#1F3C4D]'
                        : 'bg-transparent border-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wide">
                        {n.tag}
                      </span>
                      <span className="text-[10px] text-[#8C9BA5]">{n.time}</span>
                    </div>
                    <div className="text-white text-[12px] font-medium leading-snug">{n.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Separador vertical fino */}
        <div className="h-6 w-[1px] bg-[#1A3441] hidden sm:block"></div>

        {/* Perfil del Usuario / Super Administrador */}
        <button
          onClick={onProfileClick}
          className="flex items-center gap-2.5 p-1 sm:pr-3 rounded-full hover:bg-[#0D2535] border border-transparent hover:border-[#1F3C4D] transition-colors cursor-pointer group"
          title="Ver Perfil y Acreditaciones"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#1F2E54] to-[#1A3441] text-white flex items-center justify-center font-bold text-xs uppercase shadow-md ring-2 ring-[#40606E]/40 group-hover:ring-[#CFCDBC] transition-all">
            {currentUser?.name ? currentUser.name.charAt(0) : <UserIcon className="w-4 h-4" />}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-white group-hover:text-[#CFCDBC] leading-tight truncate max-w-[120px]">
              {currentUser?.name ? currentUser.name.split(' ')[0] : 'Colaborador'}
            </span>
            <span className="text-[10px] text-[#B4BCC8] leading-none">
              {isSuperAdmin ? 'Super Admin' : (currentUser?.divisionName || 'Holding')}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}
