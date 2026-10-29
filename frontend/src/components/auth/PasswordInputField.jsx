import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * PasswordInputField - Campo de contraseña con alternador de visibilidad y requisitos
 * Con textos y advertencias en español
 */
export default function PasswordInputField({
  value,
  onChange,
  label = 'Contraseña',
  placeholder = '••••••••••••••••',
  error = null,
  showRequirements = true
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-edv-midnight tracking-tight">
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full h-12 pl-4 pr-12 bg-edv-surface hover:bg-white text-edv-midnight placeholder:text-edv-slate text-sm font-medium rounded-xl border border-edv-sand/70 focus:border-edv-royal-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-edv-royal-navy/20 transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 p-1 text-edv-slate hover:text-edv-midnight transition-colors cursor-pointer"
          aria-label="Alternar visibilidad de contraseña"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      {showRequirements && (
        <p className="text-[10px] sm:text-[11px] text-edv-steel leading-relaxed pt-0.5">
          Al menos 12 caracteres, máximo 20 caracteres. Letras mayúsculas, minúsculas, números y símbolos.
        </p>
      )}

      {error && (
        <span className="text-[11px] text-red-600 font-medium block">
          {error}
        </span>
      )}
    </div>
  );
}
