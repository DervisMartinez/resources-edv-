import React, { useState } from 'react';
import InputField from './InputField.jsx';
import PasswordInputField from './PasswordInputField.jsx';
import { Loader2, Building2, Lock } from 'lucide-react';

/**
 * AuthForm - Formulario de Acceso conforme a macOS Human Interface Guidelines
 * Simplicidad, precisión, campos limpios y botón estándar macOS
 */
export default function AuthForm({ onAuthenticate, divisions = [] }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [division, setDivision] = useState(divisions[0]?.id || 'corp');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Por favor ingrese su correo y contraseña.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      await onAuthenticate({
        email: email.trim().toLowerCase(),
        password,
        division
      });
    } catch (err) {
      setErrorMsg(err.message || 'Error al verificar las credenciales corporativas.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto py-2 font-montserrat">
      {/* Encabezado macOS HIG */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#092332] tracking-tight">
          Iniciar Sesión
        </h2>
        <p className="text-[13px] text-[#40606E] mt-1 font-medium leading-relaxed">
          Ingrese sus credenciales de colaborador o administrador para acceder al portal.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium animate-in fade-in">
          {errorMsg}
        </div>
      )}

      {/* Formulario macOS */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Correo Corporativo */}
        <InputField
          label="Correo Corporativo Oficial"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@empresasdelvalle.com.ve"
          required
        />

        {/* Campo División / Filial */}
        <div className="space-y-1.5">
          <label className="block text-[12px] font-semibold text-[#092332] tracking-normal">
            División / Unidad de Negocio
          </label>
          <div className="relative">
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full h-10 pl-3.5 pr-9 bg-[#FBFBF5] hover:bg-white text-[#092332] text-[13px] font-medium rounded-lg border border-[#CFCDBC] focus:border-[#1F2E54] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20 transition-all cursor-pointer appearance-none"
            >
              {divisions && divisions.length > 0 ? (
                divisions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name || d.short_name}
                  </option>
                ))
              ) : (
                <>
                  <option value="corp">Corporativo General – Casa Matriz</option>
                  <option value="cerezera">Inversiones Cerezera S.A.</option>
                  <option value="america">Radio América Multimedios</option>
                  <option value="daleo">Daleo Desarrollos Inmobiliarios</option>
                  <option value="advision">Advision Publicidad y Medios</option>
                  <option value="vallealto">Desarrollos Valle Alto</option>
                </>
              )}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#40606E]">
              <Building2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Campo Contraseña */}
        <PasswordInputField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Contraseña"
          placeholder="••••••••••••••••"
          showRequirements={false}
        />

        {/* Botón Principal macOS Push Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 bg-[#1F2E54] hover:bg-[#162241] active:bg-[#0D152A] text-white text-[13px] font-semibold rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Verificando...</span>
              </>
            ) : (
              <span>Acceder</span>
            )}
          </button>
        </div>

        {/* Nota Institucional de Gobernanza macOS Footnote */}
        <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-center gap-1.5 text-center text-[#73787C] text-[11px]">
          <Lock className="w-3 h-3 text-[#40606E]" />
          <span>Acceso corporativo seguro bajo estándares ISO 27001</span>
        </div>
      </form>
    </div>
  );
}
