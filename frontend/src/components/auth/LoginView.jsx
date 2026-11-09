import React from 'react';
import AuthHeroBanner from './AuthHeroBanner.jsx';
import AuthForm from './AuthForm.jsx';
import { authService } from '../../services/authService.js';

/**
 * LoginView - Ventana de Acceso diseñada bajo principios de macOS Human Interface Guidelines
 * Simplicidad, proporciones nativas de ventana de escritorio, barra de título y ausencia de artificios visuales
 */
export default function LoginView({ onLogin, divisions = [] }) {
  const handleAuthenticate = async (payload) => {
    let user;
    if (payload.phoneNumber || payload.fullName) {
      user = await authService.register(payload);
    } else {
      user = await authService.login(payload);
    }
    onLogin(user);
  };

  return (
    <div className="min-h-screen w-full bg-[#08161E] text-white font-montserrat flex items-center justify-center p-3 sm:p-6 lg:p-8 antialiased selection:bg-[#1F2E54] selection:text-white">
      {/* Contenedor de Ventana macOS */}
      <div className="w-full max-w-[1080px] bg-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-[0.99] duration-200">
        {/* Barra de Título Unificada macOS (Titlebar) */}
        <div className="h-10 bg-[#F4F4EE] border-b border-[#E2E0D4] px-4 flex items-center justify-between select-none shrink-0">
          {/* Traffic Lights (Control de Ventana macOS) */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-2xs"></span>
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-2xs"></span>
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-2xs"></span>
          </div>

          {/* Título de la Ventana */}
          <div className="text-[12px] font-semibold text-[#5A646E] flex items-center gap-1.5">
            <span>Empresas Del Valle</span>
            <span className="text-[#8C9BA5]">•</span>
            <span>Acceso Corporativo</span>
          </div>

          {/* Versión / Estado */}
          <div className="text-[10px] font-semibold text-[#8C9BA5] bg-white/70 px-2 py-0.5 rounded border border-[#D5D3C5]">
            v2.1
          </div>
        </div>

        {/* Cuerpo de la Ventana Split-View */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          {/* Panel Izquierdo: Resumen y Filosofía */}
          <div className="md:col-span-5 h-full">
            <AuthHeroBanner />
          </div>

          {/* Panel Derecho: Formulario de Autenticación */}
          <div className="md:col-span-7 bg-white p-6 sm:p-10 lg:p-12 flex items-center justify-center">
            <AuthForm
              onAuthenticate={handleAuthenticate}
              divisions={divisions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
