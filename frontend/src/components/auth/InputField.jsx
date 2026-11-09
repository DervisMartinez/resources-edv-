import React from 'react';

/**
 * InputField - macOS HIG compliant input
 * Minimalist, precise, inset surface with subtle 1px border and refined focus ring
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
        <label className="block text-[12px] font-semibold text-[#092332] tracking-normal">
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
          className="w-full h-10 px-3.5 bg-[#FBFBF5] hover:bg-white text-[#092332] placeholder:text-[#8C9BA5] text-[13px] font-medium rounded-lg border border-[#CFCDBC] focus:border-[#1F2E54] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20 transition-all duration-150"
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center pointer-events-auto">
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
