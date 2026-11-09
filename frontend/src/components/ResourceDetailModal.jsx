import React, { useState } from 'react';
import {
  X,
  Download,
  Share2,
  ShieldCheck,
  Calendar,
  User,
  HardDrive,
  FileText,
  Copy,
  Check,
  Building,
  Tag
} from 'lucide-react';

export default function ResourceDetailModal({
  resource,
  onClose,
  onDownload,
  divisionName
}) {
  const [copied, setCopied] = useState(false);

  if (!resource) return null;

  const handleCopyLink = () => {
    const link = `${window.location.origin}/#resource-${resource.id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getConfidentialityBadge = (level) => {
    switch (level) {
      case 'Restringido Fiduciario':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'Confidencial':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Uso Interno':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Público':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-white/10 text-white/80 border-white/20';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-montserrat select-none text-white">
      <div className="bg-[#092332] rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#1F3C4D] animate-in fade-in zoom-in-95 my-8">
        {/* Top Header estilo macOS Sheet */}
        <div className="flex items-start justify-between pb-3 border-b border-[#1A3441] gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                {divisionName || 'Holding Del Valle'}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getConfidentialityBadge(resource.confidentiality)}`}>
                {resource.confidentiality}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white leading-snug">
              {resource.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8C9BA5] hover:text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 space-y-4 text-xs text-[#B4BCC8]">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-white uppercase tracking-wider mb-1 text-[11px]">
              Descripción Institucional
            </h3>
            <p className="leading-relaxed bg-[#0D2535] p-3.5 rounded-xl border border-[#1F3C4D] text-xs text-white/90">
              {resource.description}
            </p>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#0D2535] p-2.5 rounded-lg border border-[#1F3C4D]">
              <span className="text-[10px] text-[#8C9BA5] font-semibold uppercase block">Formato</span>
              <span className="text-xs font-bold text-white uppercase">{resource.fileType}</span>
            </div>

            <div className="bg-[#0D2535] p-2.5 rounded-lg border border-[#1F3C4D]">
              <span className="text-[10px] text-[#8C9BA5] font-semibold uppercase block">Tamaño</span>
              <span className="text-xs font-bold text-white">{resource.fileSize}</span>
            </div>

            <div className="bg-[#0D2535] p-2.5 rounded-lg border border-[#1F3C4D]">
              <span className="text-[10px] text-[#8C9BA5] font-semibold uppercase block">Versión</span>
              <span className="text-xs font-mono font-bold text-white">{resource.version}</span>
            </div>

            <div className="bg-[#0D2535] p-2.5 rounded-lg border border-[#1F3C4D]">
              <span className="text-[10px] text-[#8C9BA5] font-semibold uppercase block">Descargas</span>
              <span className="text-xs font-bold text-emerald-400">{resource.downloadsCount || 0}</span>
            </div>
          </div>

          {/* Metadata Rows */}
          <div className="space-y-1.5 pt-1 border-t border-white/5">
            <div className="flex items-center justify-between py-1">
              <span className="flex items-center gap-1.5 text-[#8C9BA5] font-medium">
                <User className="w-3.5 h-3.5" />
                <span>Departamento / Autor:</span>
              </span>
              <span className="font-semibold text-white">{resource.author}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="flex items-center gap-1.5 text-[#8C9BA5] font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>Última Actualización:</span>
              </span>
              <span className="font-medium text-white">{resource.updatedAt}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="flex items-center gap-1.5 text-[#8C9BA5] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cifrado y Cumplimiento:</span>
              </span>
              <span className="font-mono text-emerald-400 font-bold text-[11px]">
                ISO 27001 • TLS 1.3
              </span>
            </div>
          </div>

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold text-[#8C9BA5] uppercase tracking-wider mb-1.5">
                Etiquetas
              </h4>
              <div className="flex flex-wrap gap-1">
                {resource.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-[#0D2535] text-[#CFCDBC] px-2 py-0.5 rounded font-medium text-[11px] border border-[#1F3C4D]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions estilo macOS Sheet */}
        <div className="pt-3 border-t border-[#1A3441] flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto h-8 px-3 rounded-lg border border-white/10 hover:bg-white/10 text-[#CFCDBC] font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '¡Copiado!' : 'Copiar Enlace'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto h-8 px-3 rounded-lg border border-white/10 text-[#CFCDBC] hover:text-white hover:bg-white/10 font-medium text-xs cursor-pointer"
            >
              Cerrar
            </button>
            <button
              onClick={() => onDownload(resource)}
              className="w-full sm:w-auto h-8 px-4 rounded-lg bg-[#1F2E54] hover:bg-[#253966] text-white font-semibold text-xs shadow-xs border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Descargar Archivo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
