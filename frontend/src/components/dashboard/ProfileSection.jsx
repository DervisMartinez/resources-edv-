import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Building,
  ShieldCheck,
  Calendar,
  Lock,
  CheckCircle,
  Key
} from 'lucide-react';

/**
 * ProfileSection - Sección de Perfil del Colaborador
 * Muestra información institucional, división, permisos fiduciarios y seguridad
 */
export default function ProfileSection({ currentUser, onUpdateProfile }) {
  const [isSaved, setIsSaved] = useState(false);
  const [fullName, setFullName] = useState(currentUser?.name || 'Carlos Mendoza');
  const [phoneNumber, setPhoneNumber] = useState('+58 (241) 850-8255');
  const [division, setDivision] = useState(currentUser?.division || 'corp');

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-5 font-montserrat max-w-4xl select-none text-white">
      {/* Header estilo macOS */}
      <div className="pb-3 border-b border-[#142C3B]">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Perfil del Colaborador
        </h2>
        <p className="text-[12px] text-[#8C9BA5] mt-0.5">
          Identidad institucional, filial asignada y acreditaciones fiduciarias de seguridad.
        </p>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs rounded-lg flex items-center gap-2 font-medium animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Información de perfil actualizada exitosamente en el directorio fiduciario.</span>
        </div>
      )}

      {/* Tarjeta de Resumen de Identidad estilo macOS Account Pane */}
      <div className="bg-[#0D2535] text-white p-5 sm:p-6 rounded-xl shadow-xs flex flex-col sm:flex-row items-center gap-5 border border-[#1F3C4D]">
        <div className="w-16 h-16 rounded-xl bg-[#1F2E54] text-white flex items-center justify-center font-bold text-2xl border border-white/20 shadow-xs">
          {fullName.charAt(0)}
        </div>
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Acreditación Fiduciaria Activa
          </div>
          <h3 className="text-xl font-bold text-white">{fullName}</h3>
          <p className="text-[12px] text-[#B4BCC8]">
            {currentUser?.role || 'Colaborador Fiduciario'} • {currentUser?.divisionName || 'Empresas Del Valle'}
          </p>
        </div>
      </div>

      {/* Formulario de Datos Personales estilo macOS System Settings */}
      <form onSubmit={handleSave} className="bg-[#0D2535] p-5 sm:p-6 rounded-xl border border-[#1F3C4D] shadow-xs space-y-4">
        <h4 className="text-[11px] font-bold text-[#8C9BA5] uppercase tracking-wider pb-2 border-b border-white/5">
          Información Institucional
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-white text-[12px] block">Nombre y Apellido</label>
            <div className="relative flex items-center">
              <User className="w-3.5 h-3.5 text-[#8C9BA5] absolute left-3" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-8 pl-8 pr-3 bg-[#091E2A] rounded-lg border border-[#1F3C4D] text-white font-medium text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-white text-[12px] block">Correo Corporativo Oficial</label>
            <div className="relative flex items-center">
              <Mail className="w-3.5 h-3.5 text-[#8C9BA5] absolute left-3" />
              <input
                type="email"
                disabled
                value={currentUser?.email || 'colaborador@empresasdelvalle.com'}
                className="w-full h-8 pl-8 pr-3 bg-[#061219] rounded-lg border border-[#1F3C4D]/60 text-[#8C9BA5] font-medium text-xs cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-white text-[12px] block">Número de Teléfono / Extensión</label>
            <div className="relative flex items-center">
              <Phone className="w-3.5 h-3.5 text-[#8C9BA5] absolute left-3" />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full h-8 pl-8 pr-3 bg-[#091E2A] rounded-lg border border-[#1F3C4D] text-white font-medium text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-white text-[12px] block">División / Unidad de Negocio</label>
            <div className="relative flex items-center">
              <Building className="w-3.5 h-3.5 text-[#8C9BA5] absolute left-3 pointer-events-none" />
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full h-8 pl-8 pr-3 bg-[#091E2A] rounded-lg border border-[#1F3C4D] text-white font-medium text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400/40 cursor-pointer"
              >
                <option value="corp">Corporativo General – Casa Matriz</option>
                <option value="cerezera">Inversiones Cerezera S.A.</option>
                <option value="america">Radio América Multimedios</option>
                <option value="daleo">Daleo Desarrollos Inmobiliarios</option>
                <option value="advision">Advision Publicidad y Medios</option>
                <option value="vallealto">Desarrollos Valle Alto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Nivel de Cumplimiento y Seguridad */}
        <div className="pt-3 border-t border-white/5 space-y-2.5">
          <h4 className="text-[11px] font-bold text-[#8C9BA5] uppercase tracking-wider">
            Protocolos de Seguridad y Acreditación
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-2.5 bg-[#091E2A] rounded-lg border border-[#1F3C4D]">
              <div className="text-[10px] text-[#8C9BA5] font-semibold uppercase">Cifrado</div>
              <div className="font-bold text-xs text-white mt-0.5">TLS 1.3 Fiduciario</div>
            </div>

            <div className="p-2.5 bg-[#091E2A] rounded-lg border border-[#1F3C4D]">
              <div className="text-[10px] text-[#8C9BA5] font-semibold uppercase">Normativa</div>
              <div className="font-bold text-xs text-emerald-400 mt-0.5">ISO/IEC 27001:2022</div>
            </div>

            <div className="p-2.5 bg-[#091E2A] rounded-lg border border-[#1F3C4D]">
              <div className="text-[10px] text-[#8C9BA5] font-semibold uppercase">Terminal</div>
              <div className="font-mono text-xs text-white mt-0.5">Dispositivo Autorizado</div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 flex justify-end">
          <button
            type="submit"
            className="h-8 px-4 bg-[#1F2E54] hover:bg-[#253966] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer border border-white/10"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
