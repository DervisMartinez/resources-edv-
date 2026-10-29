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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#c3c7cc] animate-in fade-in zoom-in-95 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e5e3d2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#092332] text-white flex items-center justify-center shadow-sm">
              <HelpCircle className="w-5 h-5 text-[#dae2ff]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#092332] leading-tight">
                Mesa de Ayuda TI y Directorio de Sistemas
              </h2>
              <p className="text-xs text-[#73787c]">
                Asistencia técnica y canales de soporte fiduciario 24/7
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#73787c] hover:text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-4 text-xs text-[#43474c]">
          {/* Canales de Contacto Directo */}
          <div className="bg-[#f7f4e2] p-4 rounded-xl border border-[#e5e3d2] space-y-2">
            <h3 className="font-bold text-[#092332] uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#3A5A78]" />
              Canales de Asistencia Inmediata
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-[#132232] block">Línea Interna Corporativa:</span>
                <span className="text-[#3A5A78] font-bold">Ext. 5800 / 5801</span>
              </div>
              <div>
                <span className="font-semibold text-[#132232] block">Sede Central Valencia:</span>
                <span className="text-[#3A5A78] font-bold">+58 (241) 850-8255</span>
              </div>
              <div>
                <span className="font-semibold text-[#132232] block">Correo Soporte TI:</span>
                <span className="text-[#3A5A78] font-bold">soporte.ti@empresasdelvalle.com</span>
              </div>
              <div>
                <span className="font-semibold text-[#132232] block">Mesa de Control Fiduciario:</span>
                <span className="text-[#3A5A78] font-bold">gobernanza@empresasdelvalle.com</span>
              </div>
            </div>
          </div>

          {/* Directorio de Sistemas y Herramientas */}
          <div>
            <h3 className="font-bold text-[#092332] uppercase tracking-wider text-[11px] mb-2.5 flex items-center gap-1.5">
              <Server className="w-4 h-4 text-[#3A5A78]" />
              Sistemas Internos del Conglomerado
            </h3>
            <div className="space-y-2.5">
              {systems.map((sys, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-xl border border-[#c3c7cc] hover:border-[#3A5A78] transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#132232]">{sys.name}</span>
                      <span className="text-[9px] font-mono bg-gray-100 text-[#092332] px-1.5 py-0.5 rounded">
                        {sys.code}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#73787c] mt-0.5">{sys.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 whitespace-nowrap">
                    {sys.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#e5e3d2] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#092332] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#132232] transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
