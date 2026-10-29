import React from 'react';

/**
 * AuthStepCard - Tarjeta de paso para el banner de bienvenida
 * Single Responsibility: Presentación de un paso del flujo de inducción
 */
export default function AuthStepCard({
  number = 1,
  title,
  isActive = false,
  onClick
}) {
  if (isActive) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex-1 bg-white text-edv-midnight p-4 rounded-2xl shadow-xl transition-all duration-300 text-left border border-white flex flex-col justify-between min-h-[120px] cursor-pointer"
      >
        <div className="w-7 h-7 rounded-full bg-edv-royal-navy text-white flex items-center justify-center font-bold text-xs">
          {number}
        </div>
        <div className="font-bold text-xs sm:text-sm text-edv-midnight leading-snug tracking-tight">
          {title}
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white p-4 rounded-2xl transition-all duration-300 text-left flex flex-col justify-between min-h-[120px] cursor-pointer group"
    >
      <div className="w-7 h-7 rounded-full border border-white/40 text-white/90 flex items-center justify-center font-semibold text-xs group-hover:border-white">
        {number}
      </div>
      <div className="font-medium text-xs sm:text-[13px] text-white/90 leading-snug group-hover:text-white">
        {title}
      </div>
    </button>
  );
}
