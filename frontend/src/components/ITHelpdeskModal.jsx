import React from 'react';
import {
  X,
  HelpCircle,
  Phone,
  Mail,
  ShieldAlert,
  Server,
  Globe,
  Database,
  ExternalLink
} from 'lucide-react';

export default function ITHelpdeskModal({ onClose }) {
  const systems = [
    {
      name: 'SAP S/4HANA ERP Fiduciario',
      desc: 'Sistema central de contabilidad fiduciaria, tesorería y gestión de compras.',
      code: 'SAP-VALLE',
      status: 'Operativo 100%'
    },
    {
      name: 'Webmail Corporativo Zimbra / Exchange',
      desc: 'Bandeja institucional de mensajería con cifrado de correos S/MIME.',
      code: 'MAIL-EDV',
      status: 'Operativo 100%'
    },
    {
      name: 'Portal de Nómina y Autoservicio',
      desc: 'Consulta de recibos de pago, constancias de trabajo y deducciones.',
      code: 'RRHH-SELF',
      status: 'Operativo 100%'
    },
    {
      name: 'Bóveda de Resguardo Fiduciario ISO 27001',
      desc: 'Almacenamiento de alta redundancia geográfica para contratos y actas.',
      code: 'VAULT-SEC',
      status: 'Operativo 100%'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-montserrat select-none">
      <div className="bg-[#092332] text-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-[#1F3C4D] animate-in fade-in zoom-in-95 my-8">
        {/* Header macOS Sheet style */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1F3C4D]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0D2535] border border-[#1F3C4D] text-[#CFCDBC] flex items-center justify-center shadow-xs">
              <HelpCircle className="w-4 h-4 text-[#CFCDBC]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Mesa de Ayuda TI y Directorio de Sistemas
              </h2>
              <p className="text-xs text-[#B4BCC8]">
                Asistencia técnica y canales de soporte fiduciario 24/7
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#B4BCC8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4 text-xs text-[#B4BCC8]">
          {/* Canales de Contacto Directo */}
          <div className="bg-[#0D2535] p-4 rounded-xl border border-[#1F3C4D] space-y-2">
            <h3 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#CFCDBC]" />
              Canales de Asistencia Inmediata
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#40606E] block text-[11px]">Línea Interna Corporativa:</span>
                <span className="text-white font-semibold">Ext. 5800 / 5801</span>
              </div>
              <div>
                <span className="text-[#40606E] block text-[11px]">Sede Central Valencia:</span>
                <span className="text-white font-semibold">+58 (241) 850-8255</span>
              </div>
              <div>
                <span className="text-[#40606E] block text-[11px]">Correo Soporte TI:</span>
                <span className="text-white font-semibold">soporte.ti@empresasdelvalle.com</span>
              </div>
              <div>
                <span className="text-[#40606E] block text-[11px]">Mesa de Control Fiduciario:</span>
                <span className="text-white font-semibold">gobernanza@empresasdelvalle.com</span>
              </div>
            </div>
          </div>

          {/* Directorio de Sistemas y Herramientas */}
          <div>
            <h3 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-2.5 flex items-center gap-1.5">
              <Server className="w-4 h-4 text-[#CFCDBC]" />
              Sistemas Internos del Conglomerado
            </h3>
            <div className="space-y-2">
              {systems.map((sys, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#061219] rounded-xl border border-[#1F3C4D] hover:border-[#40606E] transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-white">{sys.name}</span>
                      <span className="text-[9px] font-mono bg-[#1A3441] text-[#CFCDBC] px-1.5 py-0.5 rounded border border-[#40606E]/40">
                        {sys.code}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#B4BCC8] mt-0.5">{sys.desc}</p>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-700/50 whitespace-nowrap">
                    {sys.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#1F3C4D] flex justify-end">
          <button
            onClick={onClose}
            className="h-8 px-5 bg-[#1F2E54] hover:bg-[#283C6E] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
