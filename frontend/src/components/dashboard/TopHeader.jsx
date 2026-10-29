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
    <header className="h-16 lg:h-20 bg-[#092332] border-b border-[#1A3441] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6 select-none font-montserrat sticky top-0 z-40">
      {/* Buscador central estilizado con atajo ⌘ K */}
      <div className="relative flex-1 max-w-xl">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#B4BCC8] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por ruta, curso, clase, recurso o departamento..."
            className="w-full h-10 sm:h-11 pl-10 pr-16 bg-[#0D2535] hover:bg-[#122F43] focus:bg-[#122F43] text-white placeholder:text-[#B4BCC8]/70 text-xs sm:text-[13px] font-medium rounded-xl border border-[#1F3C4D] focus:border-[#40606E] focus:outline-none focus:ring-1 focus:ring-[#CFCDBC]/40 shadow-inner transition-all"
          />
          <div className="absolute right-2.5 hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1A3441] border border-[#2B4B58] text-[10px] font-bold text-[#B4BCC8] pointer-events-none">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Acciones del lado derecho: Asistente Pregunta, Puntos, Notificaciones y Perfil */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Botón Píldora: Pregunta / Asistente Fiduciario */}
        <button
          onClick={onOpenAssistant}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#1A3441] hover:bg-[#1F2E54] border border-[#40606E]/60 text-[#CFCDBC] hover:text-white text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer group"
          title="Consultar al Asistente Fiduciario Corporativo"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Pregunta</span>
        </button>

        {/* Píldora de Puntos / Acreditaciones Fiduciarias */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-[#0D2535] border border-[#1F3C4D] text-xs font-bold text-emerald-400 shadow-sm"
          title="13 Puntos de Acreditación Fiduciaria / Objetivos Cumplidos"
        >
          <span className="text-sm leading-none">🛡️</span>
          <span className="text-[12px] text-[#FBFBF5] font-extrabold">{userPoints}</span>
        </div>

        {/* Notificaciones */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0D2535] hover:bg-[#1A3441] text-[#B4BCC8] hover:text-white border border-[#1F3C4D] flex items-center justify-center transition-colors relative cursor-pointer shadow-sm"
            title="Avisos y Notificaciones"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full ring-2 ring-[#092332]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#092332] rounded-2xl shadow-2xl border border-[#1F3C4D] p-4 z-50 animate-in fade-in zoom-in-95 text-white">
              <div className="flex items-center justify-between pb-3 border-b border-[#1A3441] mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FBFBF5]">
                    Avisos Fiduciarios
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                    2 Nuevos
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[#B4BCC8] hover:text-white p-1 rounded-lg hover:bg-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-xl text-xs transition-colors border ${
                      n.unread
                        ? 'bg-[#0D2535] border-[#1F3C4D]'
                        : 'bg-transparent border-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide">
                        {n.tag}
                      </span>
                      <span className="text-[10px] text-[#B4BCC8]">{n.time}</span>
                    </div>
                    <div className="text-white font-medium leading-relaxed">{n.title}</div>
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
