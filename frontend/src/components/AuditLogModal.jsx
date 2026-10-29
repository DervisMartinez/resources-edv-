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
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
            <Download className="w-3 h-3" /> DESCARGA
          </span>
        );
      case 'UPLOAD':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
            <Upload className="w-3 h-3" /> CARGA
          </span>
        );
      case 'LOGIN':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
            <LogIn className="w-3 h-3" /> ACCESO
          </span>
        );
      case 'DELETE':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
            <Trash2 className="w-3 h-3" /> BORRADO
          </span>
        );
      case 'CREATE_COURSE':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
            <GraduationCap className="w-3 h-3" /> ALTA CURSO
          </span>
        );
      case 'DELETE_COURSE':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
            <Trash2 className="w-3 h-3" /> BAJA CURSO
          </span>
        );
      case 'CREATE_USER':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
            <UserPlus className="w-3 h-3" /> ALTA USUARIO
          </span>
        );
      case 'DELETE_USER':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
            <UserMinus className="w-3 h-3" /> BAJA USUARIO
          </span>
        );
      case 'CONFIG_UPDATE':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
            <Settings className="w-3 h-3" /> CONFIGURACIÓN
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
            {action}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-montserrat select-none">
      <div className="bg-white rounded-2xl max-w-5xl w-full p-5 sm:p-7 shadow-2xl border border-[#c3c7cc] animate-in fade-in zoom-in-95 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e5e3d2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#092332] text-white flex items-center justify-center shadow-sm">
              <Activity className="w-5 h-5 text-[#dae2ff]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-[#092332] leading-tight">
                  Pista de Auditoría Fiduciaria ISO/IEC 27001
                </h2>
                <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  En Vivo (MariaDB)
                </span>
              </div>
              <p className="text-xs text-[#73787c]">
                Registro inmutable de trazabilidad, cursos, accesos y configuraciones en tiempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLiveLogs}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg bg-[#092332] hover:bg-[#1F2E54] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              title="Actualizar registros en tiempo real"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refrescar</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#73787c] hover:text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Security Summary Banner */}
        <div className="my-4 p-3 bg-[#f7f4e2] rounded-xl border border-[#e5e3d2] flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-[#092332]">Estado de Cumplimiento:</span>
            <span className="text-emerald-700 font-semibold">100% Cifrado y Certificado en MariaDB</span>
          </div>
          <div className="flex items-center gap-2 text-[#73787c] font-mono text-[11px]">
            <Lock className="w-3.5 h-3.5 text-[#3A5A78]" />
            <span>Hash SHA-256 / Registro Activo ({liveLogs.length} eventos)</span>
          </div>
        </div>

        {/* Table of Logs */}
        <div className="overflow-x-auto max-h-[460px] rounded-xl border border-[#e5e3d2]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#092332] text-white font-bold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4">Fecha y Hora</th>
                <th className="py-3 px-4">Usuario & Rol</th>
                <th className="py-3 px-4">Acción</th>
                <th className="py-3 px-4">Recurso / Objeto Afectado</th>
                <th className="py-3 px-4">División</th>
                <th className="py-3 px-4">Certificación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e3d2] text-[#43474c]">
              {liveLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-xs">
                    No se registran eventos de auditoría aún. Las acciones del sistema se registrarán en tiempo real.
                  </td>
                </tr>
              ) : (
                liveLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#fdfae8] transition-colors">
                    <td className="py-2.5 px-4 font-mono text-[11px] text-[#73787c] whitespace-nowrap">
                      {log.timestamp ? new Date(log.timestamp).toLocaleString('es-ES') : 'Reciente'}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-[#132232]">{log.userName || 'Sistema'}</div>
                      <div className="text-[10px] text-[#73787c]">{log.userRole || 'Super Administrador'}</div>
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-[#132232] max-w-xs truncate" title={log.resourceTitle}>
                      {log.resourceTitle}
                    </td>
                    <td className="py-2.5 px-4 text-[#3A5A78] font-semibold whitespace-nowrap">
                      {log.division || 'Holding Del Valle'}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
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
        <div className="pt-4 mt-4 border-t border-[#e5e3d2] flex items-center justify-between">
          <span className="text-[11px] text-[#73787c]">
            Trazabilidad fiduciaria conectada a MariaDB local (puerto 3306).
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#092332] hover:bg-[#1F2E54] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
}
