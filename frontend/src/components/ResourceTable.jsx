import React from 'react';
import {
  FileText,
  FileSpreadsheet,
  FileCode,
  Archive,
  Download,
  Eye,
  Star
} from 'lucide-react';

export default function ResourceTable({
  resources,
  onDownload,
  onToggleFavorite,
  onViewDetails,
  divisions = []
}) {
  const getDivisionName = (divId) => {
    const d = divisions.find(item => item.id === divId);
    return d ? d.shortName : 'Holding Del Valle';
  };

  const getFileTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-600" />;
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
      case 'pptx':
      case 'ppt':
        return <FileText className="w-4 h-4 text-amber-600" />;
      case 'docx':
      case 'doc':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'zip':
      case 'rar':
        return <Archive className="w-4 h-4 text-purple-600" />;
      default:
        return <FileCode className="w-4 h-4 text-[#1F2E54]" />;
    }
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
    <div className="bg-[#0D2535] rounded-xl border border-[#1F3C4D] shadow-xs overflow-hidden mb-8 font-montserrat select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#091E2A] text-[#8C9BA5] font-semibold uppercase tracking-wider border-b border-[#1F3C4D] text-[10px]">
            <tr>
              <th className="py-2.5 px-3.5 w-8 text-center">★</th>
              <th className="py-2.5 px-3.5">Documento / Título</th>
              <th className="py-2.5 px-3.5">Empresa</th>
              <th className="py-2.5 px-3.5">Departamento</th>
              <th className="py-2.5 px-3.5">Clasificación</th>
              <th className="py-2.5 px-3.5">Versión</th>
              <th className="py-2.5 px-3.5">Tamaño</th>
              <th className="py-2.5 px-3.5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F3C4D]/60 text-white">
            {resources.map((res) => (
              <tr key={res.id} className="hover:bg-white/5 transition-colors">
                <td className="py-2.5 px-3.5 text-center">
                  <button
                    onClick={() => onToggleFavorite(res.id)}
                    className="text-[#8C9BA5] hover:text-amber-400 cursor-pointer"
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        res.isFavorite ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                  </button>
                </td>
                <td className="py-2.5 px-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-[#091E2A] rounded-lg border border-[#1F3C4D] shrink-0">
                      {getFileTypeIcon(res.fileType)}
                    </div>
                    <div>
                      <span
                        onClick={() => onViewDetails(res)}
                        className="font-semibold text-white hover:text-emerald-400 cursor-pointer line-clamp-1 text-[13px]"
                      >
                        {res.title}
                      </span>
                      <span className="text-[11px] text-[#8C9BA5] line-clamp-1">
                        {res.author}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-3.5 font-semibold text-emerald-400 text-[12px]">
                  {getDivisionName(res.division)}
                </td>
                <td className="py-2.5 px-3.5 font-medium text-[#B4BCC8] text-[12px]">
                  {res.department || 'Gobernanza General'}
                </td>
                <td className="py-2.5 px-3.5">
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.2 rounded-md border ${getConfidentialityBadge(res.confidentiality)}`}>
                    {res.confidentiality}
                  </span>
                </td>
                <td className="py-2.5 px-3.5 font-mono text-[11px] text-[#8C9BA5]">{res.version}</td>
                <td className="py-2.5 px-3.5 text-[#8C9BA5] text-[11px]">{res.fileSize}</td>
                <td className="py-2.5 px-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onViewDetails(res)}
                      className="p-1.5 rounded-md text-[#CFCDBC] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title="Ver detalles"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDownload(res)}
                      className="p-1.5 rounded-md bg-[#1F2E54] hover:bg-[#253966] text-white transition-colors cursor-pointer shadow-xs border border-white/10"
                      title="Descargar recurso"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
