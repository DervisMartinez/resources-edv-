import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * PasswordInputField - macOS HIG compliant password field
 * Clean, compact, clear affordance
 */
export default function PasswordInputField({
  value,
  onChange,
  label = 'Contraseña',
  placeholder = '••••••••••••••••',
  error = null,
  showRequirements = false
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="block text-[12px] font-semibold text-[#092332] tracking-normal">
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full h-10 pl-3.5 pr-10 bg-[#FBFBF5] hover:bg-white text-[#092332] placeholder:text-[#8C9BA5] text-[13px] font-medium rounded-lg border border-[#CFCDBC] focus:border-[#1F2E54] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20 transition-all duration-150"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 p-1 text-[#8C9BA5] hover:text-[#092332] transition-colors cursor-pointer"
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
        <p className="text-[11px] text-[#40606E] leading-relaxed pt-0.5">
          Al menos 12 caracteres, mayúsculas, minúsculas, números y símbolos.
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
