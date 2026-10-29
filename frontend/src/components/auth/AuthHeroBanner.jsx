import React from 'react';
import Logo from '../common/Logo.jsx';
import AuthStepCard from './AuthStepCard.jsx';

/**
 * AuthHeroBanner - Banner lateral izquierdo fiduciario
 * Con mensajes institucionales de acceso y la paleta ACOMPAÑAMIENTO
 */
export default function AuthHeroBanner({ activeStep = 1, onStepChange }) {
  const steps = [
    { number: 1, title: 'Acceso Fiduciario Centralizado' },
    { number: 2, title: 'Validación de Seguridad ISO 27001' },
    { number: 3, title: 'Bóveda de Recursos y Sistemas' },
  ];

  return (
    <div className="relative w-full h-full min-h-[620px] lg:min-h-[720px] rounded-[32px] sm:rounded-[36px] overflow-hidden p-8 sm:p-12 flex flex-col justify-between shadow-2xl border border-edv-royal-navy/40 bg-gradient-to-br from-[#1F2E54] via-[#1A3441] to-[#092332]">
      {/* Resplandor ambiental de fondo usando los tonos Steel y Slate */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#40606E]/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-[#1F2E54]/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-[#092332]/60 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Superior: Logo y Razón Social */}
      <div className="relative z-10">
        <Logo
          className="h-12 w-auto brightness-0 invert drop-shadow"
          showText={true}
          textColor="text-white"
          subtitleColor="text-edv-slate"
        />
      </div>

      {/* Contenido Central: Pastilla, Titular y Subtítulo */}
      <div className="relative z-10 my-auto py-10 max-w-lg">
        {/* Pastilla Institucional */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-white text-xs font-semibold shadow-sm mb-6">
          <span>Bóveda Fiduciaria Institucional</span>
          <span role="img" aria-label="empresa">🏢</span>
        </div>

        {/* Titular Principal en Español */}
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight mb-4">
          Construyendo el Futuro Hoy
        </h1>

        {/* Subtítulo Descriptivo en Español */}
        <p className="text-sm sm:text-base text-white/85 font-normal leading-relaxed">
          Acceso centralizado para la administración fiduciaria, almacenamiento de recursos y gestión de sistemas del consorcio.
        </p>
      </div>

      {/* Sección Inferior: 3 Tarjetas Pilares Fiduciarios */}
      <div className="relative z-10 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {steps.map((step) => (
            <AuthStepCard
              key={step.number}
              number={step.number}
              title={step.title}
              isActive={activeStep === step.number}
              onClick={() => onStepChange && onStepChange(step.number)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
