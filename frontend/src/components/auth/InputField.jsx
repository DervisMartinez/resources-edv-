import React from 'react';

/**
 * InputField - Componente reutilizable para campos de texto
 * Single Responsibility: Renderizado consistente de etiqueta, campo de entrada e icono de validación
 */
export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  rightElement = null,
  error = null,
  className = '',
  name
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-edv-midnight tracking-tight">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full h-12 px-4 bg-edv-surface hover:bg-white text-edv-midnight placeholder:text-edv-slate text-sm font-medium rounded-xl border border-edv-sand/70 focus:border-edv-royal-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-edv-royal-navy/20 transition-all duration-200"
        />
        {rightElement && (
          <div className="absolute right-3.5 flex items-center pointer-events-auto">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <span className="text-[11px] text-red-600 font-medium block">
          {error}
        </span>
      )}
    </div>
  );
}
