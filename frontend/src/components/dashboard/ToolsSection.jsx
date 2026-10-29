import React from 'react';
import {
  Mail,
  ShieldCheck,
  ExternalLink,
  HelpCircle,
  Clock,
  Layers,
  Settings,
  Building2,
  CheckCircle2,
  Lock,
  Phone
} from 'lucide-react';

/**
 * ToolsSection - Sección de Herramientas Corporativas y Webmail Oficial
 * Para usuarios normales: muestra exclusivamente el Webmail Corporativo asignado a su filial
 * Para el Super Administrador: control fiduciario de todas las empresas y plataformas
 */
export default function ToolsSection({
  currentUser,
  divisions = [],
  onOpenHelp,
  onOpenStructure
}) {
  const isSuperAdmin = currentUser?.role === 'Super Administrador';

  // Buscar la empresa asignada al colaborador actual
  const userDivisionId = currentUser?.division || 'corp';
  const assignedCompany = divisions.find(d => d.id === userDivisionId) || {
    id: userDivisionId,
    name: currentUser?.divisionName || 'Holding Del Valle',
    shortName: currentUser?.divisionName || 'Holding Del Valle',
    code: 'EDV-OFICIAL',
    logoPath: '/logo-holding.png',
    webmailUrl: 'https://webmail.empresasdelvalle.com.ve'
  };

  const defaultWebmailUrl = assignedCompany.webmailUrl || 'https://webmail.empresasdelvalle.com.ve';

  return (
    <div className="space-y-6 font-montserrat select-none">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#1F2E54] font-bold uppercase tracking-wider mb-0.5">
            <Mail className="w-4 h-4 text-emerald-600" />
            <span>Herramientas & Accesos Institucionales</span>
          </div>
          <h2 className="text-2xl font-black text-[#092332] tracking-tight">
            {isSuperAdmin ? 'Panel de Herramientas & Webmails del Grupo' : 'Herramienta de Trabajo Asignada'}
          </h2>
          <p className="text-xs text-[#40606E] mt-0.5">
            {isSuperAdmin
              ? 'Administración y acceso a los servidores de correo y sistemas fiduciarios de todas las filiales.'
              : `Acceso oficial verificado para el personal activo de ${assignedCompany.shortName || assignedCompany.name}.`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSuperAdmin && (
            <button
              onClick={onOpenStructure}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-[#092332] text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              <span>Configurar Webmails</span>
            </button>
          )}

          <button
            onClick={onOpenHelp}
            className="px-3.5 py-2 bg-[#092332] hover:bg-[#1F2E54] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Soporte TI 24/7</span>
          </button>
        </div>
      </div>

      {/* VISTA PARA USUARIO NORMAL: EXCLUSIVAMENTE SU WEBMAIL CORPORATIVO */}
      {!isSuperAdmin ? (
        <div className="space-y-5">
          {/* Tarjeta Principal de Webmail de su Empresa */}
          <div className="bg-gradient-to-br from-[#092332] via-[#122A3B] to-[#1F2E54] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-[#1F3C4D] relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2.5 flex items-center justify-center shrink-0 border border-white/20 shadow-md">
                  <img
                    src={assignedCompany.logoPath || '/logo-holding.png'}
                    alt={assignedCompany.shortName}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Servicio Oficial Asignado
                    </span>
                    <span className="text-[10px] bg-white/10 text-[#CFCDBC] px-2 py-0.5 rounded font-mono font-bold">
                      {assignedCompany.code || 'EDV-CORP'}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    Webmail Corporativo – {assignedCompany.shortName || assignedCompany.name}
                  </h3>

                  <p className="text-xs text-[#B4BCC8] max-w-xl leading-relaxed">
                    Bandeja oficial de correspondencia y comunicaciones institucionales con cifrado TLS 1.3 y resguardo de datos según normativa fiduciaria de Empresas Del Valle S.A.
                  </p>

                  <div className="pt-1 flex items-center gap-2 text-xs font-mono text-emerald-300">
                    <Lock className="w-3.5 h-3.5" />
                    <span className="truncate max-w-md">{defaultWebmailUrl}</span>
                  </div>
                </div>
              </div>

              {/* Botón de Entrada Directa al Webmail */}
              <div className="shrink-0 flex flex-col sm:items-end gap-2">
                <a
                  href={defaultWebmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-[#092332] text-xs font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Acceder a Webmail</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-[10px] text-[#8C9BA5] text-center sm:text-right">
                  Requiere credenciales institucionales de {assignedCompany.shortName}
                </span>
              </div>
            </div>

            {/* Sub-barra informativa de seguridad y asignación */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#B4BCC8]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Asignado a: <strong className="text-white">{currentUser?.name || 'Colaborador'}</strong> ({currentUser?.department || 'Departamento Asignado'})</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Certificado ISO 27001 • Cifrado Fiduciario Activo</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de soporte TI si necesita asistencia con su cuenta */}
          <div className="bg-[#FBFBF5] p-5 rounded-2xl border border-[#CFCDBC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-[#092332]">
                ¿Problemas para acceder a tu correo o requieres restablecer contraseña?
              </h4>
              <p className="text-xs text-[#40606E]">
                El equipo de Infraestructura TI de Empresas Del Valle gestiona de forma centralizada todas las cuentas institucionales.
              </p>
            </div>
            <button
              onClick={onOpenHelp}
              className="px-4 py-2 bg-[#092332] hover:bg-[#1F2E54] text-white text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Contactar Soporte TI
            </button>
          </div>
        </div>
      ) : (
        /* VISTA PARA SUPER ADMINISTRADOR: TODOS LOS WEBMAILS Y PLATAFORMAS DEL GRUPO */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#092332]">
              Webmails Oficiales por Filial ({divisions.length} Empresas)
            </h3>
            <span className="text-xs text-[#40606E]">
              Haz clic en "Configurar Webmails" para cambiar las URLs de cada empresa.
            </span>
          </div>

          {/* Grid de Webmails de cada empresa */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {divisions.map((comp) => {
              const url = comp.webmailUrl || 'https://webmail.empresasdelvalle.com.ve';
              return (
                <div
                  key={comp.id}
                  className="bg-white p-5 rounded-2xl border border-[#CFCDBC] hover:border-[#1F2E54] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center border border-gray-200 shadow-xs">
                        <img
                          src={comp.logoPath || '/logo-holding.png'}
                          alt={comp.shortName}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-[#092332] text-white px-2 py-0.5 rounded">
                        {comp.code || comp.id}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-[#092332] group-hover:text-[#1F2E54] transition-colors leading-snug">
                      {comp.shortName || comp.name}
                    </h4>
                    <p className="text-xs text-[#40606E] mt-1 line-clamp-2">
                      {comp.name}
                    </p>

                    <div className="mt-3 p-2 rounded-lg bg-[#FBFBF5] border border-gray-200 flex items-center gap-1.5 text-xs font-mono text-[#1F2E54]">
                      <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{url}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      onClick={onOpenStructure}
                      className="px-2.5 py-1.5 text-xs text-[#40606E] hover:text-[#092332] font-semibold hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Editar URL
                    </button>

                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#092332] hover:bg-[#1F2E54] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Abrir Webmail</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Plataformas Centrales del Holding */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-bold text-[#092332] uppercase tracking-wider mb-4">
              Plataformas & Servidores Fiduciarios del Holding
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#CFCDBC] shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-[#092332] font-bold text-sm">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>SAP S/4HANA Fiduciario</span>
                </div>
                <p className="text-xs text-[#40606E]">
                  Gestión financiera centralizada, compras y nómina del grupo empresarial.
                </p>
                <span className="inline-block mt-3 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Operativo 100%
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#CFCDBC] shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-[#092332] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Bóveda Fiduciaria de Resguardo</span>
                </div>
                <p className="text-xs text-[#40606E]">
                  Custodia de escrituras, contratos marco y poderes notariados del consorcio.
                </p>
                <span className="inline-block mt-3 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Cifrado ISO 27001
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#CFCDBC] shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-[#092332] font-bold text-sm">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>Servidores & Auditoría MariaDB</span>
                </div>
                <p className="text-xs text-[#40606E]">
                  Base de datos local en 127.0.0.1:3306 con registro inmutable en tiempo real.
                </p>
                <span className="inline-block mt-3 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  En Línea TLS 1.3
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
