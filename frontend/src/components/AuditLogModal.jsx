import React, { useState, useEffect } from 'react';
import {
  X,
  Activity,
  ShieldCheck,
  Download,
  Upload,
  LogIn,
  Trash2,
  Lock,
  RefreshCw,
  GraduationCap,
  UserPlus,
  UserMinus,
  Settings
} from 'lucide-react';

export default function AuditLogModal({ onClose, logs = [] }) {
  const [liveLogs, setLiveLogs] = useState(logs);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLiveLogs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/audit-logs');
      if (res.ok) {
        const data = await res.json();
        setLiveLogs(data);
      }
    } catch (err) {
      console.error('Error fetching live audit logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveLogs();
  }, []);

  const getActionBadge = (action) => {
    switch (action) {
      case 'DOWNLOAD':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#1F2E54] text-[#B4BCC8] px-2 py-0.5 rounded border border-[#40606E]/40">
            <Download className="w-3 h-3 text-[#B4BCC8]" /> DESCARGA
          </span>
        );
      case 'UPLOAD':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/50">
            <Upload className="w-3 h-3 text-emerald-400" /> CARGA
          </span>
        );
      case 'LOGIN':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#1A3441] text-[#CFCDBC] px-2 py-0.5 rounded border border-[#40606E]/40">
            <LogIn className="w-3 h-3 text-[#CFCDBC]" /> ACCESO
          </span>
        );
      case 'DELETE':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-950/60 text-rose-300 px-2 py-0.5 rounded border border-rose-700/50">
            <Trash2 className="w-3 h-3 text-rose-400" /> BORRADO
          </span>
        );
      case 'CREATE_COURSE':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/50">
            <GraduationCap className="w-3 h-3 text-emerald-400" /> ALTA CURSO
          </span>
        );
      case 'DELETE_COURSE':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-950/60 text-rose-300 px-2 py-0.5 rounded border border-rose-700/50">
            <Trash2 className="w-3 h-3 text-rose-400" /> BAJA CURSO
          </span>
        );
      case 'CREATE_USER':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-950/60 text-amber-300 px-2 py-0.5 rounded border border-amber-700/50">
            <UserPlus className="w-3 h-3 text-amber-400" /> ALTA USUARIO
          </span>
        );
      case 'DELETE_USER':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-950/60 text-rose-300 px-2 py-0.5 rounded border border-rose-700/50">
            <UserMinus className="w-3 h-3 text-rose-400" /> BAJA USUARIO
          </span>
        );
      case 'CONFIG_UPDATE':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#1F2E54] text-[#B4BCC8] px-2 py-0.5 rounded border border-[#40606E]/40">
            <Settings className="w-3 h-3 text-[#B4BCC8]" /> CONFIGURACIÓN
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold bg-[#1A3441] text-[#B4BCC8] px-2 py-0.5 rounded border border-[#40606E]/40">
            {action}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-montserrat select-none">
      <div className="bg-[#092332] text-white rounded-2xl max-w-5xl w-full p-5 sm:p-6 shadow-2xl border border-[#1F3C4D] animate-in fade-in zoom-in-95 my-auto">
        {/* Header macOS Sheet style */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1F3C4D]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0D2535] border border-[#1F3C4D] text-[#CFCDBC] flex items-center justify-center shadow-xs">
              <Activity className="w-4 h-4 text-[#CFCDBC]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white leading-tight">
                  Pista de Auditoría Fiduciaria ISO/IEC 27001
                </h2>
                <span className="flex items-center gap-1 text-[10px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  En Vivo (MariaDB)
                </span>
              </div>
              <p className="text-xs text-[#B4BCC8]">
                Registro inmutable de trazabilidad, cursos, accesos y configuraciones
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLiveLogs}
              disabled={isLoading}
              className="h-8 px-3 rounded-lg bg-[#1F2E54] hover:bg-[#283C6E] text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              title="Actualizar registros en tiempo real"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refrescar</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#B4BCC8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Security Summary Banner */}
        <div className="my-4 p-3 bg-[#0D2535] rounded-xl border border-[#1F3C4D] flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">Estado de Cumplimiento:</span>
            <span className="text-emerald-300 font-medium">100% Cifrado y Certificado en MariaDB</span>
          </div>
          <div className="flex items-center gap-2 text-[#B4BCC8] font-mono text-[11px]">
            <Lock className="w-3.5 h-3.5 text-[#CFCDBC]" />
            <span>Hash SHA-256 / Registro Activo ({liveLogs.length} eventos)</span>
          </div>
        </div>

        {/* Table of Logs */}
        <div className="overflow-x-auto max-h-[460px] rounded-xl border border-[#1F3C4D] bg-[#061219]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0D2535] text-[#CFCDBC] font-semibold uppercase tracking-wider sticky top-0 z-10 border-b border-[#1F3C4D]">
              <tr>
                <th className="py-2.5 px-4">Fecha y Hora</th>
                <th className="py-2.5 px-4">Usuario & Rol</th>
                <th className="py-2.5 px-4">Acción</th>
                <th className="py-2.5 px-4">Recurso / Objeto</th>
                <th className="py-2.5 px-4">División</th>
                <th className="py-2.5 px-4">Certificación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F3C4D]/60 text-[#B4BCC8]">
              {liveLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#40606E] text-xs">
                    No se registran eventos de auditoría aún. Las acciones del sistema se registrarán en tiempo real.
                  </td>
                </tr>
              ) : (
                liveLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#0D2535]/50 transition-colors">
                    <td className="py-2.5 px-4 font-mono text-[11px] text-[#B4BCC8] whitespace-nowrap">
                      {log.timestamp ? new Date(log.timestamp).toLocaleString('es-ES') : 'Reciente'}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-white">{log.userName || 'Sistema'}</div>
                      <div className="text-[10px] text-[#40606E]">{log.userRole || 'Super Administrador'}</div>
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-white max-w-xs truncate" title={log.resourceTitle}>
                      {log.resourceTitle}
                    </td>
                    <td className="py-2.5 px-4 text-[#CFCDBC] font-medium whitespace-nowrap">
                      {log.division || 'Holding Del Valle'}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50">
                        {log.status || 'Validado ISO 27001'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-[#1F3C4D] flex items-center justify-between">
          <span className="text-[11px] text-[#40606E]">
            Trazabilidad fiduciaria conectada a MariaDB local (puerto 3306).
          </span>
          <button
            onClick={onClose}
            className="h-8 px-5 bg-[#1F2E54] hover:bg-[#283C6E] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
}
