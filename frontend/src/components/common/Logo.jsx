import React from 'react';
import { LOGO_PATH } from '../../constants/theme.js';

export default function Logo({
  className = 'h-10 w-auto',
  showText = true,
  textColor = 'text-white',
  subtitleColor = 'text-edv-slate'
}) {
  return (
    <div className="flex items-center gap-3 select-none">
      <img
        src={LOGO_PATH}
        alt="Empresas Del Valle"
        className={`object-contain drop-shadow-sm ${className}`}
        onError={(e) => {
          // Fallback visual si la imagen falla al cargar
          e.target.style.display = 'none';
        }}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`text-base font-extrabold uppercase tracking-wider leading-none font-montserrat ${textColor}`}>
            Empresas Del Valle
          </span>
          <span className={`text-[10px] font-semibold tracking-widest uppercase mt-1 font-montserrat ${subtitleColor}`}>
            Desde 1958
          </span>
        </div>
      )}
    </div>
  );
}
