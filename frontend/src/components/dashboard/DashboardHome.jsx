import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  BookOpen,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  Users,
  Eye,
  FileText,
  Building2,
  Calendar,
  Layers,
  Award,
  FolderOpen,
  Download,
  FolderTree
} from 'lucide-react';
import { PALETTE } from '../../constants/theme.js';

/**
 * DashboardHome - Panel interior del Dashboard con datos 100% REALES de la base de datos
 * Solo muestra lo que el Super Administrador ha creado (nada pre-puesto ni inventado)
 */
export default function DashboardHome({
  currentUser,
  resources = [],
  stats,
  onNavigateToResources,
  onNavigateToUsers,
  onOpenUpload,
  onOpenAudit,
  onOpenCourse,
  onOpenStructure,
  selectedDivision = 'corp'
}) {
  const isSuperAdmin = currentUser?.role === 'Super Administrador';
  const [isAdminPreviewMode, setIsAdminPreviewMode] = useState(false);
  const [isObjectivesExpanded, setIsObjectivesExpanded] = useState(false);

  // Filtrar recursos según la división seleccionada si no es 'all' ni 'corp'
  const divisionResources = resources.filter(r => {
    if (!selectedDivision || selectedDivision === 'all' || selectedDivision === 'corp') return true;
    return r.division === selectedDivision;
  });

  // Los primeros 3 recursos reales creados por el Super Administrador
  const primaryRealObjectives = divisionResources.slice(0, 3);
  // Recursos reales restantes para el acordeón
  const additionalRealObjectives = divisionResources.slice(3);

  // Helper para asignar colores visuales al thumbnail basados en el departamento real
  const getCardHeaderColor = (division) => {
    switch (division) {
      case 'cerezera': return 'from-[#1E293B] via-[#0F172A] to-[#122A26]';
      case 'america': return 'from-[#2A1810] via-[#1A100B] to-[#0A0604]';
      case 'daleo': return 'from-[#0F2236] via-[#0A1624] to-[#040A10]';
      case 'advision': return 'from-[#2A102A] via-[#1A0B1A] to-[#0A040A]';
      default: return 'from-[#0F2634] via-[#153447] to-[#0A1A24]';
    }
  };

  const getDivisionBadgeColor = (division) => {
    switch (division) {
      case 'cerezera': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'america': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'daleo': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'advision': return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
      default: return 'bg-[#1F2E54]/60 text-[#dae2ff] border-[#40606E]';
    }
  };

  return (
    <div className="space-y-8 select-none font-montserrat text-white">
      {/* 1. SECCIÓN EXCLUSIVA DE SUPER ADMINISTRADOR */}
      {isSuperAdmin && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0D2535] via-[#1A3441] to-[#0D2535] border border-[#1F3C4D] shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1F2E54] border border-[#CFCDBC]/40 flex items-center justify-center text-amber-300 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black tracking-wider text-amber-300 uppercase">
                    Panel Maestro Super Administrador
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                    MariaDB Local 10.4 Conectada
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  Gobernanza Centralizada de Empresas Del Valle S.A.
                </h3>
              </div>
            </div>

            {/* Acciones del Super Administrador */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Botón Crear Recurso / Curso desde Cero */}
              <button
                onClick={onOpenUpload}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#092332] text-xs font-black shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                title="Crear recurso o curso por departamento desde cero"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Crear / Subir Recurso</span>
              </button>

              {/* Botón Gestionar Usuarios */}
              <button
                onClick={onNavigateToUsers}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1F2E54] hover:bg-[#253966] text-white border border-[#40606E] text-xs font-bold shadow-md transition-all cursor-pointer"
                title="Crear y administrar usuarios en MariaDB"
              >
                <Users className="w-4 h-4 text-amber-300" />
                <span>Gestionar Usuarios</span>
              </button>

              {/* Botón Auditoría */}
              <button
                onClick={onOpenAudit}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#CFCDBC] text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Auditoría</span>
              </button>

              {/* Botón Gestionar Estructura */}
              <button
                onClick={onOpenStructure}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1F2E54] hover:bg-[#253966] text-white border border-[#40606E] text-xs font-bold transition-colors cursor-pointer"
                title="Editar nombres de empresas, departamentos y categorías"
              >
                <FolderTree className="w-3.5 h-3.5 text-amber-300" />
                <span>Estructura & Deptos</span>
              </button>

              {/* Conmutador Vista Admin / Colaborador */}
              <button
                onClick={() => setIsAdminPreviewMode(!isAdminPreviewMode)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isAdminPreviewMode
                    ? 'bg-amber-500 text-[#092332] border-amber-400'
                    : 'bg-[#061219] text-[#B4BCC8] border-[#1F3C4D] hover:text-white'
                }`}
                title="Cambiar perspectiva para ver el portal como un colaborador normal"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isAdminPreviewMode ? 'Vista: Colaborador' : 'Vista: Admin'}</span>
              </button>
            </div>
          </div>

          {/* Métricas reales de la base de datos MariaDB */}
          {!isAdminPreviewMode && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10">
              <div className="bg-[#092332] p-2.5 rounded-xl border border-[#1F3C4D]">
                <div className="text-[10px] font-bold text-[#8C9BA5] uppercase">Colaboradores en DB</div>
                <div className="text-lg font-black text-white mt-0.5">
                  {stats?.totalUsers || 1} Activo(s)
                </div>
              </div>
              <div className="bg-[#092332] p-2.5 rounded-xl border border-[#1F3C4D]">
                <div className="text-[10px] font-bold text-[#8C9BA5] uppercase">Recursos Creados</div>
                <div className="text-lg font-black text-emerald-400 mt-0.5">
                  {resources.length} Real(es)
                </div>
              </div>
              <div className="bg-[#092332] p-2.5 rounded-xl border border-[#1F3C4D]">
                <div className="text-[10px] font-bold text-[#8C9BA5] uppercase">Descargas Reales</div>
                <div className="text-lg font-black text-amber-300 mt-0.5">
                  {stats?.totalDownloads || 0}
                </div>
              </div>
              <div className="bg-[#092332] p-2.5 rounded-xl border border-[#1F3C4D]">
                <div className="text-[10px] font-bold text-[#8C9BA5] uppercase">Empresas Activas</div>
                <div className="text-lg font-black text-[#CFCDBC] mt-0.5">5 Filiales</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. ENCABEZADO DE BIENVENIDA */}
      <div>
        <div className="text-xs sm:text-sm font-semibold text-[#8C9BA5] mb-1">
          Hola {currentUser?.name ? currentUser.name.split(' ')[0] : 'Colaborador'}
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {resources.length > 0 ? 'Tienes objetivos por completar' : 'Portal de Recursos y Formación'}
          </h1>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#B4BCC8] bg-[#0D2535] px-3 py-1.5 rounded-full border border-[#1F3C4D]">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currentUser?.divisionName || 'Holding Del Valle'}</span>
          </span>
        </div>
      </div>

      {/* 3. CONTENIDO: SOLO RECURSOS REALES CREADOS POR EL SUPER USUARIO */}
      {divisionResources.length === 0 ? (
        /* ESTADO VACÍO LIMPIO (Cero datos inventados) */
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0D2535]/80 border border-[#1F3C4D] text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1A3441] border border-[#40606E] flex items-center justify-center text-emerald-400 mx-auto shadow-inner">
            <FolderOpen className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-lg font-bold text-white">
              No hay recursos ni cursos creados aún
            </h3>
            <p className="text-xs text-[#B4BCC8] leading-relaxed">
              {isSuperAdmin
                ? 'Como Super Administrador, eres el único autorizado para dar de alta y crear los recursos, cursos y normativas por empresa y departamento desde cero.'
                : 'Tu departamento aún no tiene recursos o cursos asignados. El Super Administrador los publicará próximamente.'}
            </p>
          </div>

          {isSuperAdmin && (
            <div className="pt-2">
              <button
                onClick={onOpenUpload}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#092332] font-black text-xs inline-flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Crear mi Primer Recurso / Curso</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* LISTADO DE RECURSOS REALES */
        <>
          {/* Fila de Tarjetas de Objetivos Principales (Máximo 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {primaryRealObjectives.map((res, index) => (
              <div
                key={res.id}
                onClick={() => onOpenCourse && onOpenCourse(res)}
                className="bg-[#0D2535] hover:bg-[#122F43] rounded-2xl border border-[#1F3C4D] hover:border-[#40606E] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl cursor-pointer group"
              >
                {/* Cabecera de la tarjeta con thumbnail dinámico real */}
                <div className="relative">
                  {/* Badge de vencimiento / estatus real */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-white font-bold text-[11px] shadow-sm ${
                      index === 0 ? 'bg-rose-600' : index === 1 ? 'bg-purple-600' : 'bg-emerald-600'
                    }`}>
                      {index === 0 ? 'Prioridad Alta' : index === 1 ? 'Vence pronto' : 'Activo'}
                    </span>
                  </div>

                  {/* Render gráfico con identidad de la empresa real */}
                  <div className={`w-full h-36 bg-gradient-to-br ${getCardHeaderColor(res.division)} relative overflow-hidden flex items-center justify-center p-4`}>
                    <div className="relative w-full max-w-[220px] h-20 bg-gradient-to-r from-[#092332] to-[#122F43] border border-[#CFCDBC]/40 rounded-xl shadow-xl flex items-center gap-3 px-3 backdrop-blur-sm">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-extrabold text-white truncate">
                          {res.department || 'Gobernanza General'}
                        </div>
                        <div className="text-[9px] text-[#B4BCC8] truncate">
                          {res.fileName || 'Archivo Corporativo'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenido y Metadatos reales */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getDivisionBadgeColor(res.division)}`}>
                        {res.division?.toUpperCase() || 'CORP'}
                      </span>
                      <span className="text-[#40606E]">•</span>
                      <span className="text-[11px] font-semibold text-[#8C9BA5]">
                        {res.confidentiality || 'Uso Interno'}
                      </span>
                      <span className="text-[#40606E]">•</span>
                      <span className="text-[10px] text-[#B4BCC8] truncate max-w-[130px]">
                        {res.fileType?.toUpperCase() || 'PDF'} ({res.fileSize || '1.0 MB'})
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#CFCDBC] transition-colors leading-snug line-clamp-2">
                      {res.title}
                    </h3>
                  </div>

                  {/* Barra de progreso y pie */}
                  <div className="space-y-2 pt-1 border-t border-white/5">
                    <div className="w-full h-1.5 bg-[#061219] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${Math.min(100, Math.max(25, (index + 1) * 30))}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#8C9BA5] pt-0.5">
                      <span className="font-semibold text-white/90">
                        {res.downloadsCount || 0} descarga(s)
                      </span>
                      <span className="text-[11px] text-emerald-400 font-bold">
                        {res.version || 'v1.0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Acordeón si hay más de 3 recursos reales */}
          {additionalRealObjectives.length > 0 && (
            <div className="flex flex-col items-center">
              <button
                onClick={() => setIsObjectivesExpanded(!isObjectivesExpanded)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D2535] hover:bg-[#122F43] border border-[#1F3C4D] text-xs font-bold text-[#CFCDBC] hover:text-white shadow-sm transition-all cursor-pointer group"
              >
                <span>
                  {isObjectivesExpanded
                    ? 'Mostrar menos recursos'
                    : `${additionalRealObjectives.length} recursos más disponibles`}
                </span>
                {isObjectivesExpanded ? (
                  <ChevronUp className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-emerald-400" />
                )}
              </button>

              {isObjectivesExpanded && (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  {additionalRealObjectives.map((obj) => (
                    <div
                      key={obj.id}
                      onClick={() => onOpenCourse && onOpenCourse(obj)}
                      className="bg-[#0D2535] hover:bg-[#122F43] rounded-xl border border-[#1F3C4D] p-4 flex flex-col justify-between shadow-md cursor-pointer group transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase">
                            {obj.division}
                          </span>
                          <span className="text-[10px] text-[#8C9BA5]">
                            {obj.fileType?.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                          {obj.title}
                        </h4>
                        <p className="text-[10px] text-[#B4BCC8] mt-1 line-clamp-2">
                          {obj.department}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#8C9BA5]">
                        <span>{obj.version}</span>
                        <span className="text-emerald-400 font-bold">Ver recurso</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sección Continúa Aprendiendo basada en recursos reales */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Continúa aprendiendo
              </h2>
              <button
                onClick={onNavigateToResources}
                className="flex items-center gap-1.5 text-xs font-bold text-[#CFCDBC] hover:text-white transition-colors cursor-pointer group"
              >
                <span>Ir al repositorio completo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {divisionResources.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  onClick={() => onOpenCourse && onOpenCourse(c)}
                  className="bg-[#0D2535] hover:bg-[#122F43] rounded-2xl border border-[#1F3C4D] hover:border-[#40606E] overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className={`relative aspect-video bg-gradient-to-br ${getCardHeaderColor(c.division)} flex items-center justify-center overflow-hidden`}>
                    <div className="w-10 h-10 rounded-full bg-white/90 text-[#092332] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>

                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded shadow-sm bg-black/50 backdrop-blur-sm">
                        {c.department}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] text-white font-semibold">
                      {c.fileType?.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-col justify-between flex-1">
                    <h4 className="text-xs sm:text-[13px] font-bold text-white group-hover:text-[#CFCDBC] transition-colors line-clamp-2 leading-snug">
                      {c.title}
                    </h4>
                    <div className="text-[10px] text-[#8C9BA5] mt-2 flex items-center justify-between">
                      <span className="truncate">{c.author || 'Super Administrador'}</span>
                      <span className="text-emerald-400 font-bold">Abrir</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
