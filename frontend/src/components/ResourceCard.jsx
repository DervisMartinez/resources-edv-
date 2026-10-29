import React from 'react';
import {
  FileText,
  FileSpreadsheet,
  FileCode,
  Archive,
  Download,
  Eye,
  Star,
  Clock,
  Layers
} from 'lucide-react';

export default function ResourceCard({
  resource,
  onDownload,
  onToggleFavorite,
  onViewDetails,
  divisionName
}) {
  const getFileTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      case 'pptx':
      case 'ppt':
        return <FileText className="w-5 h-5 text-amber-600" />;
      case 'docx':
      case 'doc':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'zip':
      case 'rar':
        return <Archive className="w-5 h-5 text-purple-600" />;
      default:
        return <FileCode className="w-5 h-5 text-[#1F2E54]" />;
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

  const companyLogos = {
    all: '/logo-holding.png',
    corp: '/logo-holding.png',
    cerezera: '/logo-cerezera.png',
    america: '/logo-america.png',
    daleo: '/logo-daleo.png',
    advision: '/logo-advision.png',
    vallealto: '/logo-vallealto.png'
  };

  return (
    <div className="bg-white rounded-2xl border border-[#CFCDBC] shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group relative overflow-hidden font-montserrat">
      {/* Top Bar: Icon, Division & Department */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FBFBF5] border border-[#CFCDBC] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              {getFileTypeIcon(resource.fileType)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-white p-0.5 flex items-center justify-center shrink-0 border border-gray-200">
                  <img src={companyLogos[resource.division] || '/logo-holding.png'} alt="" className="max-h-full max-w-full object-contain" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#1F2E54] block truncate max-w-[150px]">
                  {divisionName || 'Holding Del Valle'}
                </span>
              </div>
              <span className="text-[10px] text-[#40606E] font-semibold block truncate max-w-[170px] mt-0.5">
                {resource.department || 'Gobernanza General'}
              </span>
              <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full border mt-1 ${getConfidentialityBadge(resource.confidentiality)}`}>
                {resource.confidentiality}
              </span>
            </div>
          </div>

          <button
            onClick={() => onToggleFavorite(resource.id)}
            className="p-1 text-gray-300 hover:text-amber-500 transition-colors cursor-pointer"
            title={resource.isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
          >
            <Star
              className={`w-4 h-4 ${
                resource.isFavorite ? 'fill-amber-500 text-amber-500' : ''
              }`}
            />
          </button>
        </div>

        {/* Title & Description */}
        <h3
          onClick={() => onViewDetails(resource)}
          className="text-xs sm:text-sm font-extrabold text-[#092332] hover:text-[#1F2E54] transition-colors cursor-pointer line-clamp-2 leading-snug mb-1.5"
        >
          {resource.title}
        </h3>

        <p className="text-xs text-[#40606E] line-clamp-2 leading-relaxed mb-3 font-normal">
          {resource.description}
        </p>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {resource.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[9px] bg-[#FBFBF5] text-[#40606E] px-2 py-0.5 rounded font-semibold border border-[#CFCDBC]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Metadata & Action Buttons */}
      <div className="pt-3 border-t border-[#FBFBF5] mt-auto">
        <div className="flex items-center justify-between text-[11px] text-[#73787c] mb-3">
          <div className="flex items-center gap-1.5">
            <span className="font-bold uppercase text-[#092332] bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">
              {resource.fileType.toUpperCase()}
            </span>
            <span>{resource.fileSize}</span>
            <span>•</span>
            <span className="font-mono text-[10px]">{resource.version}</span>
          </div>
          <div className="flex items-center gap-1 font-medium text-[10px]">
            <Clock className="w-3 h-3 text-[#73787c]" />
            <span>{resource.updatedAt}</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(resource)}
            className="w-full py-2 bg-[#FBFBF5] hover:bg-[#CFCDBC]/30 text-[#092332] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-[#CFCDBC] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#1F2E54]" />
            <span>Detalles</span>
          </button>

          <button
            onClick={() => onDownload(resource)}
            style={{ backgroundColor: '#1F2E54', color: '#FFFFFF' }}
            className="w-full py-2 bg-[#1F2E54] hover:bg-[#092332] !text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Descargar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
