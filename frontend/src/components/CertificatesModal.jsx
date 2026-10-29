import React from 'react';
import { X, Award, ShieldCheck, Download, Printer, CheckCircle } from 'lucide-react';
import Logo from './common/Logo.jsx';

/**
 * CertificatesModal - Certificados y Acreditaciones Fiduciarias
 */
export default function CertificatesModal({ onClose, currentUser }) {
  const certId = 'EDV-ISO27001-2026-' + (currentUser?.id ? currentUser.id.replace(/\D/g, '').slice(-4) : '8502');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-montserrat select-none">
      <div className="bg-[#092332] text-white rounded-2xl max-w-2xl w-full border border-[#1F3C4D] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0D2535] border-b border-[#1A3441] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              Acreditación Institucional ISO 27001
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#B4BCC8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Canvas / Card */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#0D2535] to-[#061219]">
          <div className="border-4 border-double border-[#CFCDBC]/40 p-6 sm:p-8 rounded-xl bg-[#092332]/90 text-center relative shadow-2xl overflow-hidden">
            {/* Sello de agua */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <ShieldCheck className="w-72 h-72 text-white" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex justify-center mb-2">
                <Logo className="h-10 w-auto brightness-0 invert opacity-90" showText={false} />
              </div>

              <div className="text-[11px] font-bold text-[#CFCDBC] uppercase tracking-widest">
                Empresas Del Valle S.A. • Consorcio Fiduciario Desde 1958
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                Certificado de Acreditación
              </h2>

              <p className="text-xs text-[#B4BCC8] max-w-md mx-auto">
                Se otorga el presente reconocimiento oficial al colaborador por su exitosa aprobación en Gobernanza Corporativa, Protocolos de Resguardo y Seguridad Fiduciaria ISO 27001.
              </p>

              <div className="py-2 border-y border-[#1F3C4D] my-4">
                <div className="text-lg sm:text-xl font-bold text-emerald-400">
                  {currentUser?.name || 'Colaborador Fiduciario'}
                </div>
                <div className="text-xs text-[#CFCDBC]">
                  {currentUser?.department || 'Dirección General & Presidencia'} • {currentUser?.divisionName || 'Holding Del Valle'}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#B4BCC8] pt-2">
                <div>
                  <div className="font-bold text-white">ID Verificación</div>
                  <div className="font-mono text-emerald-400">{certId}</div>
                </div>
                <div>
                  <div className="font-bold text-white">Fecha de Emisión</div>
                  <div>2026-10-29</div>
                </div>
                <div>
                  <div className="font-bold text-white">Estado</div>
                  <div className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Vigente
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#0D2535] border-t border-[#1A3441] flex items-center justify-between">
          <div className="text-xs text-[#B4BCC8]">
            Válido para auditorías fiduciarias y comités corporativos.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#092332] font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
