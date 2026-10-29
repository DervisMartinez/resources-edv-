import React from 'react';
import Logo from './common/Logo.jsx';
import { ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenHelp, onOpenAudit }) {
  return (
    <footer className="w-full bg-[#132232] text-white border-t-[6px] border-[#3A5A78] shadow-2xl mt-auto">
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <Logo
              className="h-10 w-auto brightness-0 invert drop-shadow-sm"
              showText={true}
              textColor="text-white"
              subtitleColor="text-[#b1cadd]"
            />
          </div>

          {/* Fiduciary compliance badge */}
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-xs">
            <ShieldCheck className="w-4 h-4 text-[#cde6fa]" />
            <span className="text-[#dae2ff] font-medium">
              Protocolo de Cifrado TLS 1.3 • Validación ISO/IEC 27001
            </span>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#b1cadd]">
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-center md:text-left">
            <span>© 1958–2024 Empresas Del Valle S.A. Todos los derechos reservados.</span>
            <span className="hidden md:inline text-white/20">•</span>
            <span>División de Seguridad e Infraestructura Fiduciaria</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold text-[#b1cadd]">
            <button
              onClick={onOpenHelp}
              className="hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
            >
              Marco Jurídico y Cumplimiento
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={onOpenHelp}
              className="hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
            >
              Privacidad de Datos
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={onOpenAudit}
              className="hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
            >
              Mesa de Control & Auditoría
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
