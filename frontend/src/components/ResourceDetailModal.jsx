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
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Confidencial':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Uso Interno':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Público':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#c3c7cc] animate-in fade-in zoom-in-95 my-8">
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#e5e3d2] gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#3A5A78] uppercase tracking-wider bg-[#f7f4e2] px-2.5 py-0.5 rounded border border-[#e5e3d2]">
                {divisionName || 'Holding Del Valle'}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getConfidentialityBadge(resource.confidentiality)}`}>
                {resource.confidentiality}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#132232] leading-snug">
              {resource.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#73787c] hover:text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-5 space-y-5 text-xs text-[#43474c]">
          {/* Description */}
          <div>
            <h3 className="font-bold text-[#132232] uppercase tracking-wider mb-1 text-[11px]">
              Descripción Institucional
            </h3>
            <p className="leading-relaxed bg-[#fdfae8] p-4 rounded-xl border border-[#e5e3d2] text-sm">
              {resource.description}
            </p>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#f7f4e2] p-3 rounded-lg border border-[#e5e3d2]">
              <span className="text-[10px] text-[#73787c] font-semibold uppercase block">Formato</span>
              <span className="text-sm font-bold text-[#132232] uppercase">{resource.fileType}</span>
            </div>

            <div className="bg-[#f7f4e2] p-3 rounded-lg border border-[#e5e3d2]">
              <span className="text-[10px] text-[#73787c] font-semibold uppercase block">Tamaño</span>
              <span className="text-sm font-bold text-[#132232]">{resource.fileSize}</span>
            </div>

            <div className="bg-[#f7f4e2] p-3 rounded-lg border border-[#e5e3d2]">
              <span className="text-[10px] text-[#73787c] font-semibold uppercase block">Versión</span>
              <span className="text-sm font-mono font-bold text-[#132232]">{resource.version}</span>
            </div>

            <div className="bg-[#f7f4e2] p-3 rounded-lg border border-[#e5e3d2]">
              <span className="text-[10px] text-[#73787c] font-semibold uppercase block">Descargas</span>
              <span className="text-sm font-bold text-[#3A5A78]">{resource.downloadsCount || 0}</span>
            </div>
          </div>

          {/* Metadata Rows */}
          <div className="space-y-2 pt-1 border-t border-[#e5e3d2]">
            <div className="flex items-center justify-between py-1">
              <span className="flex items-center gap-2 text-[#73787c] font-medium">
                <User className="w-3.5 h-3.5" />
                <span>Departamento / Autor Emisor:</span>
              </span>
              <span className="font-bold text-[#132232]">{resource.author}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="flex items-center gap-2 text-[#73787c] font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>Última Actualización Fiduciaria:</span>
              </span>
              <span className="font-semibold text-[#132232]">{resource.updatedAt}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="flex items-center gap-2 text-[#73787c] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cifrado y Cumplimiento:</span>
              </span>
              <span className="font-mono text-emerald-700 font-bold">
                ISO 27001 • TLS 1.3 Verificado
              </span>
            </div>
          </div>

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold text-[#73787c] uppercase tracking-wider mb-2">
                Etiquetas de Búsqueda
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {resource.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-[#f7f4e2] text-[#092332] px-2.5 py-1 rounded font-semibold text-xs border border-[#e5e3d2]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#e5e3d2] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#c3c7cc] hover:bg-gray-100 text-[#43474c] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#c3c7cc] text-[#43474c] hover:bg-gray-100 font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Cerrar
            </button>
            <button
              onClick={() => onDownload(resource)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#092332] hover:bg-[#132232] text-white font-bold text-xs uppercase tracking-wider shadow-md border border-[#1e3a5f] flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4 text-[#dae2ff]" />
              <span>Descargar Archivo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
