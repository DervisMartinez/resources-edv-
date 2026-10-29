import React, { useState } from 'react';
import AuthHeroBanner from './AuthHeroBanner.jsx';
import AuthForm from './AuthForm.jsx';
import { authService } from '../../services/authService.js';

/**
 * LoginView - Componente principal de autenticación
 * Replica con exactitud la plantilla gráfica y la paleta cromática "ACOMPAÑAMIENTO"
 */
export default function LoginView({ onLogin, divisions = [] }) {
  const [activeStep, setActiveStep] = useState(1);

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
    <div className="min-h-screen w-full bg-white text-edv-midnight font-montserrat flex items-center justify-center p-3 sm:p-6 lg:p-8 antialiased selection:bg-edv-royal-navy selection:text-white">
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Columna Izquierda: Banner Hero Gráfico */}
        <div className="lg:col-span-7 xl:col-span-7 h-full flex flex-col justify-center">
          <AuthHeroBanner
            activeStep={activeStep}
            onStepChange={setActiveStep}
          />
        </div>

        {/* Columna Derecha: Formulario de Autenticación */}
        <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center">
          <AuthForm
            onAuthenticate={handleAuthenticate}
            divisions={divisions}
          />
        </div>
      </div>
    </div>
  );
}
