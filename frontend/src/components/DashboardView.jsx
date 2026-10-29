import React, { useState, useEffect } from 'react';
import Sidebar from './dashboard/Sidebar.jsx';
import TopHeader from './dashboard/TopHeader.jsx';
import DashboardHome from './dashboard/DashboardHome.jsx';
import ResourcesSection from './dashboard/ResourcesSection.jsx';
import ToolsSection from './dashboard/ToolsSection.jsx';
import UsersSection from './dashboard/UsersSection.jsx';
import ProfileSection from './dashboard/ProfileSection.jsx';

import CourseModal from './CourseModal.jsx';
import AIAssistantModal from './AIAssistantModal.jsx';
import CertificatesModal from './CertificatesModal.jsx';
import UploadModal from './UploadModal.jsx';
import ResourceDetailModal from './ResourceDetailModal.jsx';
import AuditLogModal from './AuditLogModal.jsx';
import ITHelpdeskModal from './ITHelpdeskModal.jsx';
import CorporateStructureModal from './dashboard/CorporateStructureModal.jsx';
import CreateCourseModal from './dashboard/CreateCourseModal.jsx';

import {
  GraduationCap,
  Users2,
  MapPin,
  Award,
  Play,
  CheckCircle,
  Clock,
  Sparkles,
  BookOpen,
  Trash2
} from 'lucide-react';

/**
 * DashboardView - Vista principal post-acceso
 * Integra la estética de la referencia del usuario con la paleta ACOMPAÑAMIENTO y Montserrat
 * Soporta de manera completa al Usuario Normal y al Super Administrador
 */
export default function DashboardView({
  currentUser,
  onLogout,
  resources = [],
  setResources,
  divisions = [],
  stats,
  auditLogs = [],
  refreshResources
}) {
  // Pestaña activa por defecto: 'inicio' (estilo directo del mockup)
  const [activeTab, setActiveTab] = useState('inicio');
  const [selectedDivision, setSelectedDivision] = useState(currentUser?.division || 'corp');
  const [searchQuery, setSearchQuery] = useState('');

  // Modales interactivos
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAssistantModal, setShowAssistantModal] = useState(false);
  const [showCertificatesModal, setShowCertificatesModal] = useState(false);
  const [showStructureModal, setShowStructureModal] = useState(false);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  // Catálogo de Estudio Dinámico (MariaDB - CERO cursos inventados)
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);

  const isSuperAdmin = currentUser?.role === 'Super Administrador';

  const fetchCourses = async () => {
    try {
      setCoursesLoading(true);
      const divFilter = isSuperAdmin ? selectedDivision : (currentUser?.division || 'corp');
      const res = await fetch(`/api/courses?division=${encodeURIComponent(divFilter)}`);
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (err) {
      console.error('Error al cargar cursos:', err);
    } finally {
      setCoursesLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [selectedDivision, currentUser?.division, activeTab]);

  const handleDeleteCourse = async (courseId, courseTitle, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm(`¿Estás seguro de eliminar el curso "${courseTitle}" del catálogo de estudio de MariaDB? Esta acción es permanente.`)) return;

    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'x-user-name': currentUser?.name || 'Super Administrador'
        }
      });
      if (res.ok) {
        setCourses(prev => prev.filter(c => c.id !== courseId));
        if (refreshResources) refreshResources();
      }
    } catch (err) {
      console.error('Error al eliminar curso:', err);
    }
  };

  const handleCourseCreated = (newCourse) => {
    setCourses(prev => [newCourse, ...prev]);
    if (refreshResources) refreshResources();
  };

  // Favoritos optimistas
  const handleToggleFavorite = async (id) => {
    setResources(prev =>
      prev.map(r => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    );
    try {
      await fetch(`/api/resources/${id}/favorite`, { method: 'PATCH' });
    } catch (e) {
      console.log('Optimistic favorite updated locally');
    }
  };

  // Descarga de documentos corporativos
  const handleDownload = async (resource) => {
    try {
      const response = await fetch(`/api/resources/${resource.id}/download`, {
        headers: {
          'x-user-name': currentUser?.name || 'Super Administrador'
        }
      });

      if (!response.ok) throw new Error('Error al descargar');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resource.fileName || `${resource.title}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setResources(prev =>
        prev.map(r => (r.id === resource.id ? { ...r, downloadsCount: (r.downloadsCount || 0) + 1 } : r))
      );
    } catch (err) {
      const dummyText = `EMPRESAS DEL VALLE S.A. - DOCUMENTO CORPORATIVO\n\nTítulo: ${resource.title}\nDepartamento: ${resource.department || 'Gobernanza'}\nClasificación: ${resource.confidentiality}\nVersión: ${resource.version}\nAutor: ${resource.author}\n\nDescripción:\n${resource.description}`;
      const blob = new Blob([dummyText], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resource.fileName || `${resource.title}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setResources(prev =>
        prev.map(r => (r.id === resource.id ? { ...r, downloadsCount: (r.downloadsCount || 0) + 1 } : r))
      );
    }
  };

  const handleUploadSuccess = (newRes) => {
    setResources(prev => [newRes, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#061219] text-white flex font-montserrat antialiased selection:bg-[#1F2E54] selection:text-white">
      {/* 1. Barra Lateral Oscura (Sidebar) idéntica al Mockup */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'certificados') {
            setShowCertificatesModal(true);
            return;
          }
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onLogout={onLogout}
        selectedDivision={selectedDivision}
        onSelectDivision={setSelectedDivision}
        divisions={divisions}
        onOpenUpload={() => setShowUploadModal(true)}
        onOpenAudit={() => setShowAuditModal(true)}
        onOpenHelp={() => setShowHelpModal(true)}
        onOpenStructure={() => setShowStructureModal(true)}
      />

      {/* 2. Área Principal de Contenido */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden bg-[#061219]">
        {/* Barra Superior con Atajo ⌘ K, Asistente Pregunta ✦ y Puntos */}
        <TopHeader
          currentUser={currentUser}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (q.trim() && activeTab !== 'recursos' && activeTab !== 'cursos') {
              setActiveTab('recursos');
            }
          }}
          onOpenAssistant={() => setShowAssistantModal(true)}
          onProfileClick={() => setActiveTab('perfil')}
          selectedDivision={selectedDivision}
          onSelectDivision={setSelectedDivision}
          divisions={divisions}
        />

        {/* Contenido Dinámico de la Sección Activa */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1560px] w-full mx-auto">
          {/* VISTA 1: INICIO (Dashboard Principal con Objetivos y Continúa Aprendiendo) */}
          {(activeTab === 'inicio' || activeTab === 'dashboard') && (
            <DashboardHome
              currentUser={currentUser}
              resources={resources}
              stats={stats}
              selectedDivision={selectedDivision}
              onNavigateToResources={() => setActiveTab('recursos')}
              onNavigateToUsers={() => setActiveTab('usuarios')}
              onOpenUpload={() => setShowUploadModal(true)}
              onOpenAudit={() => setShowAuditModal(true)}
              onOpenStructure={() => setShowStructureModal(true)}
              onOpenCourse={(course) => setSelectedCourse(course)}
            />
          )}

          {/* VISTA 2: ACADEMY & CURSOS (Capacitación Real - CERO cursos asumidos) */}
          {activeTab === 'cursos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1A3441]">
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>Catálogo de Formación Corporativa (MariaDB)</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Academy Empresas Del Valle
                  </h2>
                  <p className="text-xs text-[#B4BCC8] mt-1">
                    {isSuperAdmin
                      ? 'Gestión total del catálogo fiduciario. Agrega o elimina cursos según cada filial o departamento.'
                      : `Cursos oficiales asignados para los colaboradores de ${divisions.find(d => d.id === currentUser?.division)?.shortName || 'tu empresa'}.`}
                  </p>
                </div>
                {isSuperAdmin && (
                  <button
                    onClick={() => setShowCreateCourseModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#092332] font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer self-start sm:self-auto"
                  >
                    <span>+ Agregar Curso al Catálogo</span>
                  </button>
                )}
              </div>

              {/* Estado de Carga o Catálogo Vacío / Poblado */}
              {coursesLoading ? (
                <div className="p-12 text-center text-[#B4BCC8] text-xs font-semibold">
                  Cargando catálogo de estudio desde MariaDB...
                </div>
              ) : courses.length === 0 ? (
                <div className="p-12 text-center bg-[#0D2535] rounded-2xl border border-[#1F3C4D] flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 max-w-md">
                    <h3 className="text-lg font-bold text-white">Catálogo de Estudio en Blanco (0 Cursos)</h3>
                    <p className="text-xs text-[#B4BCC8] leading-relaxed">
                      No hay cursos ficticios precargados. Todo el catálogo se gestiona directamente desde MariaDB.
                      {isSuperAdmin
                        ? ' Como Super Administrador, puedes crear cursos desde cero asignándolos a cada empresa o departamento.'
                        : ' Tu empresa aún no tiene cursos activos asignados en el catálogo corporativo.'}
                    </p>
                  </div>
                  {isSuperAdmin && (
                    <button
                      onClick={() => setShowCreateCourseModal(true)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#092332] font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all"
                    >
                      <span>+ Crear Primer Curso del Catálogo</span>
                    </button>
                  )}
                </div>
              ) : (
                /* Grid de Cursos Reales de MariaDB */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {courses.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCourse({ ...c, type: 'Curso Academy' })}
                      className="p-5 rounded-2xl bg-[#0D2535] hover:bg-[#122F43] border border-[#1F3C4D] hover:border-[#40606E] transition-all cursor-pointer group flex flex-col justify-between shadow-lg relative"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3 gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {c.badge || 'Curso Oficial'}
                          </span>
                          <span className="text-[10px] text-[#B4BCC8] font-semibold">{c.duration || '1h 30m'}</span>
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                          {c.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className="text-xs text-[#CFCDBC] font-medium">
                            {c.department}
                          </span>
                          <span className="text-[10px] bg-[#1A3441] text-[#B4BCC8] px-1.5 py-0.5 rounded">
                            {c.division === 'all' ? 'Todas las Empresas' : (divisions.find(d => d.id === c.division)?.shortName || c.division)}
                          </span>
                        </div>
                        {c.description && (
                          <p className="text-xs text-[#8C9BA5] mt-2 line-clamp-2">
                            {c.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-[#8C9BA5]">{c.modules || '5 Módulos'}</span>

                        <div className="flex items-center gap-2">
                          {isSuperAdmin && (
                            <button
                              onClick={(e) => handleDeleteCourse(c.id, c.title, e)}
                              className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 rounded-lg transition-colors cursor-pointer"
                              title="Borrar curso del catálogo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}

                          <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Ingresar a Clase →
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VISTA 3: RECURSOS (Bóveda con Filtros por Empresa y Desglose de Departamento) */}
          {activeTab === 'recursos' && (
            <div className="bg-white text-[#092332] p-5 sm:p-7 rounded-2xl border border-[#CFCDBC] shadow-xl">
              <ResourcesSection
                currentUser={currentUser}
                resources={resources}
                setResources={setResources}
                divisions={divisions}
                onOpenUpload={() => setShowUploadModal(true)}
                onViewDetails={setSelectedResource}
                onDownload={handleDownload}
                onToggleFavorite={handleToggleFavorite}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          )}

          {/* VISTA 4: COMUNIDAD (Directorio & Avisos con badge 12) */}
          {activeTab === 'comunidad' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#1A3441] flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Comunidad & Directorio Del Valle
                  </h2>
                  <p className="text-xs text-[#B4BCC8] mt-1">
                    Red colaborativa institucional entre las 5 empresas filiales y sus departamentos.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-500 text-white font-black text-xs shadow-md">
                  12 Avisos Activos
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { title: 'Comité de Inversiones Trimestral', team: 'Cerezera Capital', time: 'Hoy 3:00 PM', members: '18 participantes' },
                  { title: 'Reunión de Coordinación de Obras', team: 'Daleo Construcciones', time: 'Mañana 9:00 AM', members: '24 ingenieros' },
                  { title: 'Lanzamiento Nueva Pauta 95.5 FM', team: 'Radio América', time: 'Viernes 11:00 AM', members: '12 productores' },
                  { title: 'Inspección de Circuitos DOOH', team: 'Advision', time: 'Lunes 10:00 AM', members: '8 técnicos' },
                  { title: 'Auditoría Fiduciaria ISO 27001', team: 'Holding Central', time: 'En curso', members: 'Equipo de Gobernanza' },
                  { title: 'Actualización Salarial y Beneficios', team: 'Talento Humano', time: 'Publicado', members: 'Todos los colaboradores' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0D2535] border border-[#1F3C4D] hover:border-[#40606E] transition-all">
                    <span className="text-[10px] font-bold text-amber-300 uppercase">{item.team}</span>
                    <h4 className="text-sm font-bold text-white mt-1">{item.title}</h4>
                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#B4BCC8]">
                      <span>{item.time}</span>
                      <span className="text-emerald-400 font-semibold">{item.members}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VISTA 5: RUTAS DEPARTAMENTALES */}
          {activeTab === 'rutas' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#1A3441]">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Rutas de Formación por Departamento
                </h2>
                <p className="text-xs text-[#B4BCC8] mt-1">
                  Planes secuenciales de acreditación técnica y fiduciaria diseñados desde 1958.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { title: 'Ruta Fiduciaria: Cumplimiento y Gobernanza ISO 27001', courses: '4 cursos • 12 módulos', level: 'Obligatoria', division: 'Holding Del Valle' },
                  { title: 'Ruta Bursátil: Análisis Cuantitativo y Operaciones de Mesa', courses: '6 cursos • 18 módulos', level: 'Especialidad', division: 'Cerezera Capital' },
                  { title: 'Ruta Técnica: Normativa de Obras, Seguridad y Costos APU', courses: '5 cursos • 15 módulos', level: 'Ingeniería', division: 'Daleo Construcciones' },
                  { title: 'Ruta de Medios: Operación Radial, Master y Pauta Comercial', courses: '4 cursos • 10 módulos', level: 'Comunicación', division: 'Radio América 95.5 FM' }
                ].map((r, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-[#0D2535] border border-[#1F3C4D] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase">{r.division}</span>
                      <h3 className="text-base font-bold text-white mt-1">{r.title}</h3>
                      <p className="text-xs text-[#B4BCC8] mt-2">{r.courses}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-amber-300 font-semibold">{r.level}</span>
                      <button
                        onClick={() => setSelectedCourse({ title: r.title, department: r.division, type: 'Ruta Departamental' })}
                        className="text-emerald-400 font-bold hover:underline cursor-pointer"
                      >
                        Iniciar Ruta →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VISTA 6: GESTIÓN DE USUARIOS (Super Administrador en MariaDB) */}
          {activeTab === 'usuarios' && (
            <div className="bg-white text-[#092332] p-5 sm:p-7 rounded-2xl border border-[#CFCDBC] shadow-xl">
              <UsersSection currentUser={currentUser} />
            </div>
          )}

          {/* VISTA 7: HERRAMIENTAS CORPORATIVAS & WEBMAIL */}
          {activeTab === 'herramientas' && (
            <div className="bg-white text-[#092332] p-5 sm:p-7 rounded-2xl border border-[#CFCDBC] shadow-xl">
              <ToolsSection
                currentUser={currentUser}
                divisions={divisions}
                onOpenHelp={() => setShowHelpModal(true)}
                onOpenStructure={() => setShowStructureModal(true)}
              />
            </div>
          )}

          {/* VISTA 8: PERFIL DEL COLABORADOR */}
          {activeTab === 'perfil' && (
            <div className="bg-white text-[#092332] p-5 sm:p-7 rounded-2xl border border-[#CFCDBC] shadow-xl">
              <ProfileSection currentUser={currentUser} />
            </div>
          )}
        </main>
      </div>

      {/* 3. MODALES GLOBALES */}

      {/* Modal Reproductor de Curso / Objetivo */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}

      {/* Modal Asistente Fiduciario (Pregunta ✦) */}
      {showAssistantModal && (
        <AIAssistantModal
          currentUser={currentUser}
          onClose={() => setShowAssistantModal(false)}
        />
      )}

      {/* Modal Certificados Acreditados ISO 27001 */}
      {showCertificatesModal && (
        <CertificatesModal
          currentUser={currentUser}
          onClose={() => setShowCertificatesModal(false)}
        />
      )}

      {/* Modal Subir / Crear Recurso desde cero por departamento */}
      {showUploadModal && (
        <UploadModal
          currentUser={currentUser}
          onClose={() => setShowUploadModal(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

      {/* Modal Detalle de Recurso */}
      {selectedResource && (
        <ResourceDetailModal
          resource={selectedResource}
          divisionName={divisions.find(d => d.id === selectedResource.division)?.shortName || 'Holding Del Valle'}
          onClose={() => setSelectedResource(null)}
          onDownload={handleDownload}
        />
      )}

      {/* Modal Registro de Auditoría Fiduciaria */}
      {showAuditModal && (
        <AuditLogModal
          logs={auditLogs}
          onClose={() => setShowAuditModal(false)}
        />
      )}

      {/* Modal Mesa de Ayuda TI */}
      {showHelpModal && (
        <ITHelpdeskModal
          onClose={() => setShowHelpModal(false)}
        />
      )}

      {/* Modal Crear Curso (Super Administrador) */}
      {showCreateCourseModal && (
        <CreateCourseModal
          currentUser={currentUser}
          divisions={divisions}
          onClose={() => setShowCreateCourseModal(false)}
          onCourseCreated={handleCourseCreated}
        />
      )}

      {/* Modal Gestión de Estructura: Empresas, Departamentos y Categorías */}
      {showStructureModal && (
        <CorporateStructureModal
          onClose={() => setShowStructureModal(false)}
          onStructureUpdated={refreshResources}
        />
      )}
    </div>
  );
}
