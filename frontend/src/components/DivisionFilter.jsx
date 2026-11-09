import React from 'react';
import { Layers } from 'lucide-react';

export default function DivisionFilter({
  activeDivision,
  onSelectDivision,
  divisions = [],
  isSuperAdmin = true,
  userDivision = 'corp'
}) {
  const companyLogos = {
    all: '/logo-holding.png',
    corp: '/logo-holding.png',
    cerezera: '/logo-cerezera.png',
    america: '/logo-america.png',
    daleo: '/logo-daleo.png',
    advision: '/logo-advision.png',
    vallealto: '/logo-vallealto.png'
  };

  const allItems = [
    {
      id: 'all',
      name: 'Todas las Divisiones',
      shortName: 'Holding Consolidado',
      description: 'Vista fiduciaria unificada de todo el grupo',
      logoPath: '/logo-holding.png',
      color: '#092332'
    },
    ...divisions
  ];

  const displayItems = isSuperAdmin
    ? allItems
    : allItems.filter(item => item.id === userDivision || item.id === 'all');

  return (
    <div className="w-full my-5 font-montserrat select-none">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-[11px] font-semibold text-[#8C9BA5] uppercase tracking-wider flex items-center gap-2">
          <span>{isSuperAdmin ? 'Filiales del Consorcio' : 'Tu Filial Corporativa Asignada'}</span>
          <span className="text-[10px] text-[#8C9BA5]/80 font-normal lowercase">
            {isSuperAdmin ? '(filtrar recursos por empresa)' : '(recursos autorizados para tu empresa)'}
          </span>
        </h2>
        {isSuperAdmin && activeDivision !== 'all' && (
          <button
            onClick={() => onSelectDivision('all')}
            className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Ver Todas las Divisiones
          </button>
        )}
      </div>

      <div className={`grid gap-2.5 ${isSuperAdmin ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6' : 'grid-cols-1 sm:grid-cols-2 max-w-xl'}`}>
        {displayItems.map((item) => {
          const isSelected = activeDivision === item.id;
          const logoSrc = companyLogos[item.id] || item.logoPath || '/logo-holding.png';

          return (
            <button
              key={item.id}
              onClick={() => onSelectDivision(item.id)}
              className={`p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between relative overflow-hidden group shadow-xs ${
                isSelected
                  ? 'bg-[#1F2E54] text-white border-white/20 shadow-xs'
                  : 'bg-[#0D2535] hover:bg-[#112F42] text-[#B4BCC8] hover:text-white border-[#1F3C4D]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className="w-8 h-8 rounded-lg p-1 flex items-center justify-center bg-white shadow-xs border border-gray-100 shrink-0">
                  <img
                    src={logoSrc}
                    alt={item.shortName || item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                {item.resourceCount !== undefined && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#091E2A] text-[#8C9BA5]'
                    }`}
                  >
                    {item.resourceCount} {item.resourceCount === 1 ? 'doc' : 'docs'}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-[12px] uppercase tracking-tight leading-snug truncate">
                  {item.shortName || item.name}
                </h3>
                <p
                  className={`text-[10px] line-clamp-1 mt-0.5 ${
                    isSelected ? 'text-[#dae2ff]' : 'text-[#8C9BA5]'
                  }`}
                >
                  {item.description}
                </p>
              </div>

              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
