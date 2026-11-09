import React from 'react';
import Logo from '../common/Logo.jsx';
import { ShieldCheck, BookOpen, Mail, Building2 } from 'lucide-react';

/**
 * AuthHeroBanner - Panel lateral estructurado según macOS HIG
 * Enfocado en simplicidad, claridad tipográfica y ausencia de efectos recargados
 */
export default function AuthHeroBanner() {
  const highlights = [
    {
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      title: 'Gobernanza Fiduciaria',
      desc: 'Bóveda centralizada de normativas y documentos con control de versiones.'
    },
    {
      icon: <BookOpen className="w-4 h-4 text-[#CFCDBC]" />,
      title: 'Academy Corporativa',
      desc: 'Catálogo de capacitación oficial estructurado por filial y departamento.'
    },
    {
      icon: <Mail className="w-4 h-4 text-blue-300" />,
      title: 'Herramientas de Trabajo',
      desc: 'Acceso directo y seguro al servidor de correo institucional asignado.'
    }
  ];

  return (
    <div className="w-full h-full bg-[#092332] text-white p-8 sm:p-10 flex flex-col justify-between border-r border-[#142C3B] select-none font-montserrat">
      {/* Cabecera con Logo Oficial */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Logo
            className="h-9 w-auto brightness-0 invert"
            showText={false}
          />
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-white tracking-wider uppercase">
              EMPRESAS DEL VALLE S.A.
            </span>
            <span className="text-[10px] text-[#B4BCC8] tracking-widest uppercase">
              Desde 1958
            </span>
          </div>
        </div>

        {/* Titular */}
        <div className="mt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
            Plataforma Integral de Recursos Corporativos
          </h1>
          <p className="text-[13px] text-[#B4BCC8] mt-2 font-normal leading-relaxed">
            Consorcio empresarial: Holding Del Valle, Inversiones Cerezera, Radio América, Daleo, Advision y Valle Alto.
          </p>
        </div>
      </div>

      {/* Lista de características estilo macOS Source List */}
      <div className="my-8 space-y-4">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-[#0D2535] border border-[#1F3C4D] flex items-start gap-3"
          >
            <div className="p-2 rounded-lg bg-[#1A3441] shrink-0 mt-0.5">
              {item.icon}
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-white">
                {item.title}
              </h4>
              <p className="text-[11px] text-[#B4BCC8] mt-0.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pie de página del panel */}
      <div className="pt-4 border-t border-[#142C3B] flex items-center justify-between text-[11px] text-[#8C9BA5]">
        <span>Archivo Fiduciario v2.1</span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Conexión TLS 1.3
        </span>
      </div>
    </div>
  );
}
