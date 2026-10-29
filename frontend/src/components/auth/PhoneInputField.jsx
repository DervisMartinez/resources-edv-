import React, { useState } from 'react';

/**
 * PhoneInputField - Entrada para número de teléfono con selector de bandera/código
 * Replica exactamente el campo con bandera de la plantilla
 */
export default function PhoneInputField({
  value,
  onChange,
  label = 'Número de teléfono',
  error
}) {
  const [selectedCountry, setSelectedCountry] = useState({
    code: '+58',
    flag: '🇻🇪',
    name: 'Venezuela'
  });

  const countries = [
    { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
    { code: '+374', flag: '🇦🇲', name: 'Armenia' },
    { code: '+1', flag: '🇺🇸', name: 'Estados Unidos' },
    { code: '+34', flag: '🇪🇸', name: 'España' },
    { code: '+57', flag: '🇨🇴', name: 'Colombia' },
    { code: '+507', flag: '🇵🇦', name: 'Panamá' },
  ];

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="space-y-1.5 relative">
      <label className="block text-xs font-bold text-edv-midnight tracking-tight">
        {label}
      </label>

      <div className="relative flex items-center">
        {/* Selector de país */}
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="absolute left-2.5 h-8 px-2 flex items-center gap-1.5 rounded-lg bg-white/70 hover:bg-white text-xs font-semibold text-edv-midnight border border-edv-sand/40 cursor-pointer transition-colors z-10"
        >
          <span className="text-base">{selectedCountry.flag}</span>
          <span className="font-mono text-xs">{selectedCountry.code}</span>
        </button>

        <input
          type="tel"
          value={value}
          onChange={onChange}
          placeholder="0000 00 00"
          className="w-full h-12 pl-24 pr-4 bg-edv-surface hover:bg-white text-edv-midnight placeholder:text-edv-slate text-sm font-medium rounded-xl border border-edv-sand/70 focus:border-edv-royal-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-edv-royal-navy/20 transition-all duration-200"
        />

        {showDropdown && (
          <div className="absolute top-14 left-0 w-56 bg-white rounded-xl shadow-2xl border border-edv-sand p-1.5 z-50 animate-in fade-in zoom-in-95">
            <div className="text-[10px] font-bold text-edv-slate px-2.5 py-1 uppercase tracking-wider">
              Código de País
            </div>
            <div className="max-h-48 overflow-y-auto space-y-0.5">
              {countries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(c);
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs hover:bg-edv-surface text-left transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{c.flag}</span>
                    <span className="font-medium text-edv-midnight">{c.name}</span>
                  </span>
                  <span className="font-mono text-edv-steel text-[11px] font-bold">
                    {c.code}
                  </span>
                </button>
              ))}
            </div>
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
