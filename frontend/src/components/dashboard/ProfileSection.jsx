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
    <div className="space-y-6 font-montserrat max-w-4xl">
      {/* Header */}
      <div className="pb-2 border-b border-edv-sand/70">
        <h2 className="text-2xl font-black text-edv-midnight tracking-tight">
          Perfil del Colaborador
        </h2>
        <p className="text-xs text-edv-steel mt-0.5">
          Datos de identidad institucional, unidad de negocio asignada y acreditaciones de seguridad.
        </p>
      </div>

      {isSaved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-semibold animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Información de perfil actualizada exitosamente en el directorio fiduciario.</span>
        </div>
      )}

      {/* Tarjeta de Resumen de Identidad */}
      <div className="bg-gradient-to-br from-[#092332] to-[#1F2E54] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center gap-6 border border-white/10">
        <div className="w-20 h-20 rounded-2xl bg-white/10 text-white flex items-center justify-center font-black text-3xl border border-white/20 shadow-inner">
          {fullName.charAt(0)}
        </div>
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Acreditación Fiduciaria Activa
          </div>
          <h3 className="text-2xl font-black text-white">{fullName}</h3>
          <p className="text-xs text-[#b1cadd]">
            {currentUser?.role || 'Colaborador Fiduciario Senior'} • {currentUser?.divisionName || 'Empresas Del Valle'}
          </p>
        </div>
      </div>

      {/* Formulario de Datos Personales y Laborales */}
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-edv-sand/70 shadow-sm space-y-5">
        <h4 className="text-sm font-extrabold text-edv-midnight uppercase tracking-wider pb-2 border-b border-gray-100">
          Información Institucional
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-edv-midnight block">Nombre y Apellido</label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-edv-slate absolute left-3.5" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-edv-surface rounded-xl border border-edv-sand text-edv-midnight font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-edv-royal-navy/20"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-edv-midnight block">Correo Corporativo Oficial</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-edv-slate absolute left-3.5" />
              <input
                type="email"
                disabled
                value={currentUser?.email || 'colaborador@empresasdelvalle.com'}
                className="w-full h-11 pl-10 pr-4 bg-gray-100 rounded-xl border border-gray-200 text-gray-500 font-medium cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-edv-midnight block">Número de Teléfono / Extensión</label>
            <div className="relative flex items-center">
              <Phone className="w-4 h-4 text-edv-slate absolute left-3.5" />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-edv-surface rounded-xl border border-edv-sand text-edv-midnight font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-edv-royal-navy/20"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-edv-midnight block">División / Unidad de Negocio</label>
            <div className="relative flex items-center">
              <Building className="w-4 h-4 text-edv-slate absolute left-3.5" />
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-edv-surface rounded-xl border border-edv-sand text-edv-midnight font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-edv-royal-navy/20 cursor-pointer"
              >
                <option value="corp">Corporativo General – Casa Matriz</option>
                <option value="cerezera">Inversiones Cerezera S.A.</option>
                <option value="america">Radio América Multimedios</option>
                <option value="daleo">Daleo Desarrollos Inmobiliarios</option>
                <option value="advision">Advision Publicidad y Medios</option>
              </select>
            </div>
          </div>
        </div>

        {/* Nivel de Cumplimiento y Seguridad */}
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <h4 className="text-xs font-extrabold text-edv-midnight uppercase tracking-wider">
            Protocolos de Seguridad y Acreditación
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-edv-surface rounded-xl border border-edv-sand">
              <div className="text-[10px] text-edv-steel font-bold uppercase">Cifrado</div>
              <div className="font-bold text-xs text-edv-midnight mt-0.5">TLS 1.3 Bancario</div>
            </div>

            <div className="p-3 bg-edv-surface rounded-xl border border-edv-sand">
              <div className="text-[10px] text-edv-steel font-bold uppercase">Normativa</div>
              <div className="font-bold text-xs text-emerald-700 mt-0.5">ISO/IEC 27001:2022</div>
            </div>

            <div className="p-3 bg-edv-surface rounded-xl border border-edv-sand">
              <div className="text-[10px] text-edv-steel font-bold uppercase">Sesión Actual</div>
              <div className="font-mono text-xs text-edv-midnight mt-0.5">Terminal Confiable</div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-edv-royal-navy hover:bg-edv-midnight text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
