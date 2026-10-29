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
    <div className="w-full my-6 font-montserrat">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold text-[#43474c] uppercase tracking-widest flex items-center gap-2">
          <span>{isSuperAdmin ? 'Unidades de Negocio del Consorcio' : 'Tu Filial Corporativa Asignada'}</span>
          <span className="text-[10px] text-[#73787c] font-medium lowercase">
            {isSuperAdmin ? '(filtrar recursos por empresa)' : '(recursos autorizados para tu empresa)'}
          </span>
        </h2>
        {isSuperAdmin && activeDivision !== 'all' && (
          <button
            onClick={() => onSelectDivision('all')}
            className="text-[11px] font-bold text-[#3A5A78] hover:text-[#092332] underline-offset-2 hover:underline cursor-pointer"
          >
            Ver Todas las Divisiones
          </button>
        )}
      </div>

      <div className={`grid gap-3 ${isSuperAdmin ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6' : 'grid-cols-1 sm:grid-cols-2 max-w-xl'}`}>
        {displayItems.map((item) => {
          const isSelected = activeDivision === item.id;
          const logoSrc = companyLogos[item.id] || item.logoPath || '/logo-holding.png';

          return (
            <button
              key={item.id}
              onClick={() => onSelectDivision(item.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#092332] text-white border-[#092332] shadow-md ring-2 ring-[#3A5A78]'
                  : 'bg-white hover:bg-[#f7f4e2] text-[#1c1c11] border-[#c3c7cc] shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className="w-10 h-10 rounded-lg p-1.5 flex items-center justify-center bg-white shadow-xs border border-gray-100 shrink-0">
                  <img
                    src={logoSrc}
                    alt={item.shortName || item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                {item.resourceCount !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-[#dae2ff]' : 'bg-gray-100 text-[#43474c]'
                    }`}
                  >
                    {item.resourceCount} {item.resourceCount === 1 ? 'doc' : 'docs'}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-xs uppercase tracking-tight leading-snug">
                  {item.shortName || item.name}
                </h3>
                <p
                  className={`text-[10px] line-clamp-1 mt-0.5 ${
                    isSelected ? 'text-[#b1cadd]' : 'text-[#73787c]'
                  }`}
                >
                  {item.description}
                </p>
              </div>

              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#3A5A78]"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
