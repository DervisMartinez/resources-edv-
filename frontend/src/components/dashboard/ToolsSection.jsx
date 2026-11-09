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
    <div className="space-y-5 font-montserrat select-none text-white">
      {/* Encabezado estilo macOS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#142C3B]">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold uppercase tracking-wider mb-0.5">
            <Mail className="w-3.5 h-3.5" />
            <span>Herramientas & Accesos Institucionales</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {isSuperAdmin ? 'Panel de Webmails & Servidores del Grupo' : 'Herramienta de Trabajo Asignada'}
          </h2>
          <p className="text-[12px] text-[#8C9BA5] mt-0.5">
            {isSuperAdmin
              ? 'Control centralizado de servidores de correo y sistemas fiduciarios de todas las filiales.'
              : `Acceso oficial verificado para el personal activo de ${assignedCompany.shortName || assignedCompany.name}.`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSuperAdmin && (
            <button
              onClick={onOpenStructure}
              className="h-8 px-3 bg-amber-500 hover:bg-amber-400 text-[#092332] text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Configurar Webmails</span>
            </button>
          )}

          <button
            onClick={onOpenHelp}
            className="h-8 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Soporte TI</span>
          </button>
        </div>
      </div>

      {/* VISTA PARA USUARIO NORMAL: EXCLUSIVAMENTE SU WEBMAIL CORPORATIVO */}
      {!isSuperAdmin ? (
        <div className="space-y-4">
          {/* Tarjeta Principal de Webmail macOS Card */}
          <div className="bg-[#0D2535] p-5 sm:p-6 rounded-xl border border-[#1F3C4D] shadow-xs relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
                  <img
                    src={assignedCompany.logoPath || '/logo-holding.png'}
                    alt={assignedCompany.shortName}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Servicio Oficial Asignado
                    </span>
                    <span className="text-[10px] bg-white/10 text-[#CFCDBC] px-2 py-0.2 rounded font-mono font-bold">
                      {assignedCompany.code || 'EDV-CORP'}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                    Webmail Corporativo – {assignedCompany.shortName || assignedCompany.name}
                  </h3>

                  <p className="text-[12px] text-[#B4BCC8] max-w-xl leading-relaxed">
                    Bandeja oficial de correspondencia institucional con cifrado TLS 1.3 y resguardo de datos según normativa fiduciaria de Empresas Del Valle S.A.
                  </p>

                  <div className="pt-0.5 flex items-center gap-2 text-[11px] font-mono text-emerald-300">
                    <Lock className="w-3.5 h-3.5" />
                    <span className="truncate max-w-md">{defaultWebmailUrl}</span>
                  </div>
                </div>
              </div>

              {/* Botón de Entrada Directa al Webmail */}
              <div className="shrink-0 flex flex-col sm:items-end gap-1.5">
                <a
                  href={defaultWebmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-4 bg-emerald-500 hover:bg-emerald-400 text-[#092332] text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer group"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Acceder a Webmail</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-[10px] text-[#8C9BA5] text-center sm:text-right">
                  Requiere credenciales institucionales
                </span>
              </div>
            </div>

            {/* Sub-barra informativa */}
            <div className="mt-5 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#8C9BA5]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Asignado a: <strong className="text-white">{currentUser?.name || 'Colaborador'}</strong> ({currentUser?.department || 'Departamento Asignado'})</span>
              </div>

              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Certificado ISO 27001 • Cifrado Fiduciario Activo</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de soporte TI */}
          <div className="bg-[#091E2A] p-4 rounded-xl border border-[#1F3C4D] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h4 className="text-[13px] font-semibold text-white">
                ¿Problemas para acceder a tu correo o requieres restablecer contraseña?
              </h4>
              <p className="text-[11px] text-[#8C9BA5]">
                El equipo de Infraestructura TI de Empresas Del Valle gestiona de forma centralizada todas las cuentas institucionales.
              </p>
            </div>
            <button
              onClick={onOpenHelp}
              className="h-8 px-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Contactar Soporte TI
            </button>
          </div>
        </div>
      ) : (
        /* VISTA PARA SUPER ADMINISTRADOR: TODOS LOS WEBMAILS Y PLATAFORMAS DEL GRUPO */
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[13px] font-semibold text-[#CFCDBC]">
              Webmails Oficiales por Filial ({divisions.length} Empresas)
            </h3>
            <span className="text-[11px] text-[#8C9BA5]">
              Haz clic en "Configurar Webmails" para modificar las URLs.
            </span>
          </div>

          {/* Grid de Webmails de cada empresa */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {divisions.map((comp) => {
              const url = comp.webmailUrl || 'https://webmail.empresasdelvalle.com.ve';
              return (
                <div
                  key={comp.id}
                  className="bg-[#0D2535] hover:bg-[#112F42] p-4 rounded-xl border border-[#1F3C4D] hover:border-[#40606E] shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center border border-white/20 shadow-xs">
                        <img
                          src={comp.logoPath || '/logo-holding.png'}
                          alt={comp.shortName}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <span className="text-[9px] font-mono font-bold bg-[#091E2A] text-emerald-400 px-2 py-0.5 rounded border border-[#1F3C4D]">
                        {comp.code || comp.id}
                      </span>
                    </div>

                    <h4 className="text-[13px] font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                      {comp.shortName || comp.name}
                    </h4>
                    <p className="text-[11px] text-[#8C9BA5] mt-0.5 line-clamp-1">
                      {comp.name}
                    </p>

                    <div className="mt-2.5 p-2 rounded-lg bg-[#091E2A] border border-[#1F3C4D] flex items-center gap-1.5 text-[11px] font-mono text-emerald-300">
                      <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{url}</span>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={onOpenStructure}
                      className="text-[11px] text-[#8C9BA5] hover:text-white font-medium transition-colors cursor-pointer"
                    >
                      Editar URL
                    </button>

                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-7 px-2.5 bg-[#1F2E54] hover:bg-[#253966] text-white text-[11px] font-semibold rounded-md transition-colors flex items-center gap-1 cursor-pointer shadow-xs border border-white/10"
                    >
                      <span>Abrir</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Plataformas Centrales del Holding */}
          <div className="pt-4 border-t border-[#142C3B]">
            <h3 className="text-[11px] font-semibold text-[#8C9BA5] uppercase tracking-wider mb-3">
              Plataformas & Servidores Fiduciarios del Holding
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#0D2535] border border-[#1F3C4D] shadow-xs">
                <div className="flex items-center gap-2 mb-1 text-white font-bold text-xs">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>SAP S/4HANA Fiduciario</span>
                </div>
                <p className="text-[11px] text-[#8C9BA5]">
                  Gestión financiera centralizada, compras y nómina del grupo.
                </p>
                <span className="inline-block mt-2 text-[9px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.2 rounded border border-emerald-500/40">
                  Operativo 100%
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D2535] border border-[#1F3C4D] shadow-xs">
                <div className="flex items-center gap-2 mb-1 text-white font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Bóveda de Resguardo</span>
                </div>
                <p className="text-[11px] text-[#8C9BA5]">
                  Custodia de escrituras, contratos marco y poderes notariados.
                </p>
                <span className="inline-block mt-2 text-[9px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.2 rounded border border-emerald-500/40">
                  Cifrado ISO 27001
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D2535] border border-[#1F3C4D] shadow-xs">
                <div className="flex items-center gap-2 mb-1 text-white font-bold text-xs">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>Servidor MariaDB</span>
                </div>
                <p className="text-[11px] text-[#8C9BA5]">
                  Base de datos local con auditoría inmutable en tiempo real.
                </p>
                <span className="inline-block mt-2 text-[9px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.2 rounded border border-emerald-500/40">
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
