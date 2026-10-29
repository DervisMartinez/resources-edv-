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
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Confidencial':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Uso Interno':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Público':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#CFCDBC] shadow-sm overflow-hidden mb-8 font-montserrat">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FBFBF5] text-[#092332] font-bold uppercase tracking-wider border-b border-[#CFCDBC]">
            <tr>
              <th className="py-3.5 px-4 w-10 text-center">★</th>
              <th className="py-3.5 px-4">Documento / Título</th>
              <th className="py-3.5 px-4">Empresa</th>
              <th className="py-3.5 px-4">Departamento</th>
              <th className="py-3.5 px-4">Clasificación</th>
              <th className="py-3.5 px-4">Versión</th>
              <th className="py-3.5 px-4">Tamaño</th>
              <th className="py-3.5 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#FBFBF5] text-[#40606E]">
            {resources.map((res) => (
              <tr key={res.id} className="hover:bg-[#FBFBF5] transition-colors">
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onToggleFavorite(res.id)}
                    className="text-gray-300 hover:text-amber-500 cursor-pointer"
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        res.isFavorite ? 'fill-amber-500 text-amber-500' : ''
                      }`}
                    />
                  </button>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-[#FBFBF5] rounded-lg border border-[#CFCDBC]">
                      {getFileTypeIcon(res.fileType)}
                    </div>
                    <div>
                      <span
                        onClick={() => onViewDetails(res)}
                        className="font-bold text-[#092332] hover:text-[#1F2E54] cursor-pointer line-clamp-1"
                      >
                        {res.title}
                      </span>
                      <span className="text-[11px] text-[#73787c] line-clamp-1">
                        {res.author}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold text-[#092332]">
                  {getDivisionName(res.division)}
                </td>
                <td className="py-3 px-4 font-medium text-[#40606E]">
                  {res.department || 'Gobernanza General'}
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${getConfidentialityBadge(res.confidentiality)}`}>
                    {res.confidentiality}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono font-medium">{res.version}</td>
                <td className="py-3 px-4 text-[#73787c]">{res.fileSize}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onViewDetails(res)}
                      className="p-1.5 rounded-lg text-[#1F2E54] hover:bg-[#FBFBF5] transition-colors cursor-pointer"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDownload(res)}
                      style={{ backgroundColor: '#1F2E54', color: '#FFFFFF' }}
                      className="p-1.5 rounded-lg bg-[#1F2E54] hover:bg-[#092332] !text-white transition-colors cursor-pointer shadow-xs"
                      title="Descargar recurso"
                    >
                      <Download className="w-4 h-4 text-white" />
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
