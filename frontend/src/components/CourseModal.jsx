import React, { useState } from 'react';
import {
  X,
  Play,
  CheckCircle,
  Clock,
  Download,
  BookOpen,
  Award,
  ChevronRight,
  ShieldCheck,
  Share2
} from 'lucide-react';

/**
 * CourseModal - Reproductor interactivo de curso / objetivo fiduciario
 */
export default function CourseModal({ course, onClose, onCompleteLesson }) {
  if (!course) return null;

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([0]);

  const lessons = course.lessons || [
    { id: 1, title: 'Introducción al Marco Normativo y Fiduciario', duration: '12 min', type: 'video' },
    { id: 2, title: 'Políticas de Resguardo y Clasificación ISO 27001', duration: '18 min', type: 'video' },
    { id: 3, title: 'Protocolos de Actuación por Departamento', duration: '25 min', type: 'reading' },
    { id: 4, title: 'Estudio de Casos Reales y Auditoría de Cumplimiento', duration: '30 min', type: 'quiz' },
    { id: 5, title: 'Evaluación Fiduciaria Final y Acreditación', duration: '15 min', type: 'exam' }
  ];

  const toggleLesson = (idx) => {
    setCompletedLessons(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const progressPercent = Math.round((completedLessons.length / lessons.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-montserrat select-none">
      <div className="bg-[#092332] text-white rounded-2xl max-w-4xl w-full border border-[#1F3C4D] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-auto">
        {/* Header con información del curso */}
        <div className="p-4 sm:p-6 bg-[#0D2535] border-b border-[#1A3441] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1F2E54] to-[#1A3441] border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {course.type || 'Curso'}
                </span>
                <span className="text-[10px] font-semibold text-[#CFCDBC] bg-white/5 px-2 py-0.5 rounded-full">
                  {course.level || 'Básico'}
                </span>
                <span className="text-[10px] text-[#B4BCC8]">
                  {course.department || 'Gobernanza Corporativa'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white truncate leading-tight">
                {course.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-[#B4BCC8] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenedor central: Video Mockup + Temario */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Lado izquierdo: Pantalla de Clase / Video */}
          <div className="lg:col-span-7 p-4 sm:p-6 bg-[#061219] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1A3441]">
            <div className="aspect-video bg-gradient-to-br from-[#0A1A24] to-[#122A3A] rounded-xl border border-[#1F3C4D] relative overflow-hidden flex items-center justify-center group shadow-inner">
              {/* Overlay decorativo de video */}
              <div className="absolute inset-0 bg-radial from-transparent to-black/60 pointer-events-none"></div>

              {/* Botón Play central */}
              <button className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#092332] flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-all cursor-pointer z-10">
                <Play className="w-6 h-6 fill-current ml-1" />
              </button>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 z-10 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-lg">
                <span className="font-semibold truncate">
                  Clase {activeLessonIndex + 1}: {lessons[activeLessonIndex]?.title}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold shrink-0 ml-2">
                  {lessons[activeLessonIndex]?.duration}
                </span>
              </div>
            </div>

            {/* Descripción y botón de marcar lección */}
            <div className="mt-4 space-y-3">
              <div className="text-xs text-[#B4BCC8] leading-relaxed">
                {course.description || 'Contenido oficial de formación institucional y gobernanza para colaboradores de Empresas Del Valle S.A.'}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => toggleLesson(activeLessonIndex)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    completedLessons.includes(activeLessonIndex)
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-[#092332] shadow-md shadow-emerald-500/20'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {completedLessons.includes(activeLessonIndex)
                      ? 'Clase Completada ✓'
                      : 'Marcar como Completada'}
                  </span>
                </button>

                <button className="flex items-center gap-1.5 text-xs text-[#B4BCC8] hover:text-white transition-colors cursor-pointer">
                  <Download className="w-3.5 h-3.5" />
                  <span>Guía PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Lado derecho: Lista de lecciones del curso */}
          <div className="lg:col-span-5 p-4 sm:p-6 bg-[#092332] flex flex-col justify-between">
            <div>
              {/* Barra de progreso global del curso */}
              <div className="mb-4 pb-3 border-b border-[#1A3441]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#FBFBF5]">Progreso del Curso</span>
                  <span className="font-extrabold text-emerald-400">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-[#0D2535] rounded-full overflow-hidden border border-[#1F3C4D]">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="text-[10px] text-[#B4BCC8] mt-1 text-right">
                  {completedLessons.length} de {lessons.length} clases acreditadas
                </div>
              </div>

              {/* Lista interactiva de lecciones */}
              <div className="text-[11px] font-bold text-[#8C9BA5] uppercase tracking-wider mb-2">
                Contenido del Módulo
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {lessons.map((lesson, idx) => {
                  const isCompleted = completedLessons.includes(idx);
                  const isActive = activeLessonIndex === idx;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonIndex(idx)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#1F2E54] text-white font-bold border border-[#40606E]'
                          : 'bg-[#0D2535] hover:bg-[#122F43] text-[#B4BCC8] hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLesson(idx);
                          }}
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                            isCompleted
                              ? 'bg-emerald-500 text-[#092332]'
                              : 'border border-[#40606E] text-transparent hover:border-emerald-400'
                          }`}
                        >
                          <CheckCircle className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="truncate leading-tight">{lesson.title}</span>
                      </div>
                      <span className="text-[10px] text-[#8C9BA5] shrink-0 ml-2">
                        {lesson.duration}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pie del modal con Acreditación */}
            <div className="mt-4 pt-3 border-t border-[#1A3441] flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Certificado ISO 27001 Incluido</span>
              </div>
              <button
                onClick={onClose}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
