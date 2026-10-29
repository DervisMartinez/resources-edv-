import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  FileText
} from 'lucide-react';

/**
 * AIAssistantModal - Asistente Fiduciario Corporativo (Pregunta ✦)
 */
export default function AIAssistantModal({ onClose, currentUser }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hola ${currentUser?.name ? currentUser.name.split(' ')[0] : 'Colaborador'}. Soy el Asistente Fiduciario de Empresas Del Valle S.A. ¿En qué puedo orientarte hoy sobre cursos, normativas, departamentos o recursos corporativos?`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    '¿Cómo solicito una acreditación ISO 27001?',
    '¿Dónde encuentro los manuales de mi departamento?',
    '¿Cuál es la política fiduciaria de contraseñas?',
    '¿Cómo registrar un nuevo colaborador en MariaDB?'
  ];

  const handleSend = (textToSend) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = 'He consultado la base de datos fiduciaria corporativa. ';
      const lower = q.toLowerCase();

      if (lower.includes('iso') || lower.includes('certifica')) {
        responseText += 'Para obtener tu acreditación ISO 27001, debes completar el 100% de las clases del módulo de Gobernanza Fiduciaria. Al finalizar, tu certificado se generará automáticamente en la pestaña "Certificados" con firma criptográfica.';
      } else if (lower.includes('departamento') || lower.includes('manual')) {
        responseText += 'Los manuales departamentales están centralizados en la sección "Recursos & Documentos". Puedes filtrar por tu empresa (Holding, Cerezera, América, Daleo, Advision) y seleccionar tu departamento correspondiente.';
      } else if (lower.includes('usuario') || lower.includes('mariadb') || lower.includes('crear')) {
        responseText += 'La creación de colaboradores es facultad exclusiva del Super Administrador desde la sección "Gestión de Usuarios". Los nuevos colaboradores se encriptan con bcrypt y se guardan directamente en la base de datos MariaDB local.';
      } else if (lower.includes('contraseña') || lower.includes('seguridad')) {
        responseText += 'La política institucional exige contraseñas robustas con un mínimo de 8 caracteres, números y caracteres especiales, auditadas bajo el estándar fiduciario de Empresas Del Valle.';
      } else {
        responseText += `Respecto a "${q}": La información se encuentra catalogada bajo los protocolos del Holding Del Valle. Puedes revisar los detalles completos en la Biblioteca de Recursos o abrir un ticket con la Mesa de Ayuda TI.`;
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: responseText }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-montserrat select-none">
      <div className="bg-[#092332] text-white rounded-2xl max-w-2xl w-full border border-[#1F3C4D] shadow-2xl overflow-hidden flex flex-col h-[560px] animate-in fade-in zoom-in-95 my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0D2535] border-b border-[#1A3441] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1F2E54] to-emerald-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Asistente Fiduciario Del Valle
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  Activo
                </span>
              </div>
              <p className="text-[11px] text-[#B4BCC8]">
                Inteligencia y gobernanza documental corporativa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#B4BCC8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-[#061219]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 max-w-[85%] ${
                m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  m.sender === 'user'
                    ? 'bg-[#1F2E54] text-white'
                    : 'bg-emerald-500 text-[#092332]'
                }`}
              >
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#1F2E54] text-white rounded-tr-none'
                    : 'bg-[#0D2535] text-[#FBFBF5] border border-[#1F3C4D] rounded-tl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#B4BCC8] italic">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Consultando repositorio fiduciario...</span>
            </div>
          )}
        </div>

        {/* Preguntas Sugeridas */}
        <div className="p-2 sm:p-3 bg-[#092332] border-t border-[#1A3441] overflow-x-auto flex gap-2 no-scrollbar">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="text-[11px] text-[#CFCDBC] hover:text-white bg-[#0D2535] hover:bg-[#122F43] border border-[#1F3C4D] px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="p-3 sm:p-4 bg-[#0D2535] border-t border-[#1A3441] flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta sobre políticas, cursos, departamentos..."
            className="flex-1 h-10 px-3.5 bg-[#061219] text-white placeholder:text-[#B4BCC8]/60 text-xs rounded-xl border border-[#1F3C4D] focus:border-[#40606E] focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            className="h-10 px-4 bg-emerald-500 hover:bg-emerald-400 text-[#092332] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
          >
            <span>Enviar</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
