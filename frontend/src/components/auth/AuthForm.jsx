import React, { useState } from 'react';
import InputField from './InputField.jsx';
import PasswordInputField from './PasswordInputField.jsx';
import { ArrowRight, Loader2, Building2, ShieldCheck } from 'lucide-react';

/**
 * AuthForm - Formulario de Acceso Institucional
 * Botón con estilo sólido de alta visibilidad `#1F2E54` y texto "Acceder"
 */
export default function AuthForm({ onAuthenticate, divisions = [] }) {
  // Campos vacíos por defecto para seguridad en el acceso
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [division, setDivision] = useState(divisions[0]?.id || 'corp');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Por favor ingrese su correo y contraseña corporativa.');
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
      setErrorMsg(err.message || 'Error al autenticar las credenciales corporativas.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto py-6 sm:py-8 px-4 sm:px-6 flex flex-col justify-center font-montserrat">
      {/* Encabezado Institucional */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#092332] tracking-tight">
          Iniciar Sesión
        </h2>
        <p className="text-xs sm:text-sm text-[#40606E] mt-2 font-medium leading-relaxed">
          Ingrese sus credenciales de Super Administrador o Colaborador para acceder al portal.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium animate-in fade-in">
          {errorMsg}
        </div>
      )}

      {/* Formulario de Login Único */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Correo Corporativo */}
        <InputField
          label="Correo Corporativo Oficial / ID"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@empresasdelvalle.com.ve"
          required
        />

        {/* Campo División / Unidad de Negocio */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#092332] tracking-tight">
            División / Unidad de Negocio
          </label>
          <div className="relative">
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full h-12 pl-4 pr-10 bg-[#FBFBF5] hover:bg-white text-[#092332] text-sm font-medium rounded-xl border border-[#CFCDBC] focus:border-[#1F2E54] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20 transition-all cursor-pointer appearance-none"
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
            <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-[#40606E]">
              <Building2 className="w-4 h-4" />
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

        {/* Botón Principal: Sólido con fondo azul visible #1F2E54 y texto 'Acceder' */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading}
            style={{ backgroundColor: '#1F2E54', color: '#FFFFFF' }}
            className="w-full h-12 bg-[#1F2E54] hover:bg-[#092332] active:bg-[#000b14] !text-white text-sm font-bold tracking-wide rounded-xl shadow-lg shadow-[#1F2E54]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span className="text-white font-bold">Verificando...</span>
              </>
            ) : (
              <>
                <span className="text-white font-bold">Acceder</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
              </>
            )}
          </button>
        </div>

        {/* Nota Institucional de Gobernanza */}
        <div className="pt-4 mt-2 border-t border-[#CFCDBC]/80 text-center">
          <p className="text-[11px] text-[#40606E] leading-relaxed font-medium">
            🔒 El alta y registro de nuevos colaboradores es gestionado de manera exclusiva por la Dirección y Super Administradores mediante protocolos de gobernanza fiduciaria ISO 27001.
          </p>
        </div>
      </form>
    </div>
  );
}
