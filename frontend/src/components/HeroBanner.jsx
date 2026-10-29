import React from 'react';
import {
  FileText,
  Download,
  HardDrive,
  ShieldCheck,
  Building,
  Info,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function HeroBanner({ stats, onOpenHelp, onSelectDivision }) {
  return (
    <section className="relative bg-[#132232] text-white overflow-hidden shadow-xl border-b border-[#3A5A78]">
      {/* Patrón arquitectónico de fondo y destellos */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#092332] via-[#132232] to-[#3A5A78]/80 opacity-95"></div>
      
      {/* Trazo vectorial arquitectónico sutil */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 opacity-10 pointer-events-none">
        <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" className="w-full h-full text-white">
          <circle cx="200" cy="200" r="180" strokeWidth="2" strokeDasharray="6 6" />
          <polygon points="200,40 360,320 40,320" strokeWidth="2" />
          <line x1="40" y1="200" x2="360" y2="200" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="container mx-auto px-5 md:px-12 py-10 relative z-10 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Columna Izquierda: Mensaje Institucional */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#3A5A78]/60 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#dae2ff] border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Archivo y Repositorio Oficial para Colaboradores
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Construyendo el futuro hoy
            </h1>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light max-w-2xl">
              En <strong className="font-bold text-white italic">Empresas Del Valle</strong>, transformamos nuestra visión de futuro en soluciones reales. Este portal centraliza las normativas, activos de marca, formatos de gestión y recursos operativos para todas las divisiones del consorcio.
            </p>

            {/* Botones de Navegación Institucional (inspirados en Template 2) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectDivision('corp')}
                className="bg-[#092332] text-white rounded-full px-6 py-2 font-bold text-xs border border-white/30 shadow-md hover:bg-[#1a2f45] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Building className="w-3.5 h-3.5 text-[#cde6fa]" />
                <span>Nosotros</span>
              </button>

              <button
                onClick={onOpenHelp}
                className="bg-[#092332] text-white rounded-full px-6 py-2 font-bold text-xs border border-white/30 shadow-md hover:bg-[#1a2f45] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5 text-[#cde6fa]" />
                <span>Historia & Hitos (1958)</span>
              </button>

              <button
                onClick={onOpenHelp}
                className="bg-[#3A5A78] text-white rounded-full px-6 py-2 font-bold text-xs border border-white/40 shadow-md hover:bg-[#4a6e92] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5 text-white" />
                <span>Contacto & TI</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Tarjetas de Métricas Fiduciarias */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between text-[#cde6fa]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b1cadd]">Total Recursos</span>
                <FileText className="w-4 h-4" />
              </div>
              <div className="mt-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {stats?.totalResources || '15'}
                </span>
                <span className="text-[10px] block text-[#dae2ff] font-medium mt-0.5">
                  Documentos y plantillas
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between text-[#cde6fa]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b1cadd]">Descargas</span>
                <Download className="w-4 h-4" />
              </div>
              <div className="mt-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {stats?.totalDownloads || '4,285'}
                </span>
                <span className="text-[10px] block text-[#dae2ff] font-medium mt-0.5">
                  Consultas seguras
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between text-[#cde6fa]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b1cadd]">Bóveda Corporativa</span>
                <HardDrive className="w-4 h-4" />
              </div>
              <div className="mt-3">
                <span className="text-xl sm:text-2xl font-extrabold text-white">
                  {stats?.storageUsed || '4.8 GB'}
                </span>
                <span className="text-[10px] block text-[#dae2ff] font-medium mt-0.5">
                  de 50 GB asignados
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between text-[#cde6fa]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b1cadd]">Cumplimiento</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="mt-3">
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">
                  ISO 27001
                </span>
                <span className="text-[10px] block text-[#dae2ff] font-medium mt-0.5">
                  100% Auditado y Cifrado
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
