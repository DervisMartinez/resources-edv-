import React, { useState, useEffect } from 'react';
import {
  X,
  GraduationCap,
  Building2,
  FolderTree,
  Clock,
  Award,
  Layers,
  User,
  FileText,
  Save,
  AlertCircle
} from 'lucide-react';

export default function CreateCourseModal({
  currentUser,
  divisions = [],
  onClose,
  onCourseCreated
}) {
  const [formData, setFormData] = useState({
    title: '',
    division: 'corp',
    department: '',
    level: 'Básico',
    duration: '1h 30m',
    modules: '5 Módulos',
    badge: 'Curso Oficial',
    instructor: currentUser?.name || 'Super Administrador',
    description: ''
  });

  const [departmentsMap, setDepartmentsMap] = useState({});
  const [availableDepts, setAvailableDepts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch departments for dynamic dropdown
  useEffect(() => {
    fetch('/api/departments')
      .then(res => res.json())
      .then(data => {
        setDepartmentsMap(data);
        const depts = data[formData.division] || [];
        setAvailableDepts(depts);
        if (depts.length > 0 && !formData.department) {
          setFormData(prev => ({ ...prev, department: depts[0] }));
        }
      })
      .catch(() => {});
  }, []);

  const handleDivisionChange = (divId) => {
    const depts = departmentsMap[divId] || [];
    setAvailableDepts(depts);
    setFormData(prev => ({
      ...prev,
      division: divId,
      department: depts.length > 0 ? depts[0] : 'Gobernanza General'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('El título del curso es obligatorio.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-name': currentUser?.name || 'Super Administrador'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al guardar el curso en MariaDB.');
      }

      if (onCourseCreated) {
        onCourseCreated(data.course);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-montserrat select-none">
      <div className="bg-[#092332] text-white rounded-2xl max-w-2xl w-full border border-[#1F3C4D] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-auto">
        {/* Header */}
        <div className="p-5 bg-[#0D2535] border-b border-[#1A3441] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Crear Curso en el Catálogo de Estudio
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  MariaDB Real
                </span>
              </div>
              <p className="text-xs text-[#B4BCC8]">
                El curso se guardará directamente en la base de datos y se asignará a la filial correspondiente.
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

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-500/20 text-rose-300 border-b border-rose-500/40 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario estilo macOS Sheet */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 select-none">
          {/* Título */}
          <div>
            <label className="text-[12px] font-semibold text-white block mb-1">
              Título del Curso *
            </label>
            <input
              type="text"
              required
              placeholder="ej: Protocolos de Transmisión y Pauta Publicitaria 95.5 FM"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full h-8 px-3 bg-[#0D2535] text-white text-xs rounded-lg border border-[#1F3C4D] focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
            />
          </div>

          {/* Empresa y Departamento Asignado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[12px] font-semibold text-white flex items-center gap-1.5 mb-1">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Empresa / Filial Asignada</span>
              </label>
              <select
                value={formData.division}
                onChange={(e) => handleDivisionChange(e.target.value)}
                className="w-full h-8 px-2.5 bg-[#0D2535] text-white text-xs rounded-lg border border-[#1F3C4D] focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#092332] text-white">Todas las Empresas (Holding Consolidado)</option>
                {divisions.map((d) => (
                  <option key={d.id} value={d.id} className="bg-[#092332] text-white">{d.shortName || d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-white flex items-center gap-1.5 mb-1">
                <FolderTree className="w-3.5 h-3.5 text-amber-400" />
                <span>Departamento Asignado</span>
              </label>
              {availableDepts.length > 0 ? (
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full h-8 px-2.5 bg-[#0D2535] text-white text-xs rounded-lg border border-[#1F3C4D] focus:outline-none cursor-pointer"
                >
                  {availableDepts.map((dept, i) => (
                    <option key={i} value={dept} className="bg-[#092332] text-white">{dept}</option>
                  ))}
                  <option value="Gobernanza General" className="bg-[#092332] text-white">Gobernanza General</option>
                </select>
              ) : (
                <input
                  type="text"
                  placeholder="ej: Operaciones & Medios"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full h-8 px-3 bg-[#0D2535] text-white text-xs rounded-lg border border-[#1F3C4D] focus:outline-none"
                />
              )}
            </div>
          </div>

          {/* Nivel, Duración y Módulos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[12px] font-semibold text-white flex items-center gap-1 mb-1">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>Nivel</span>
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full h-8 px-2.5 bg-[#0D2535] text-white text-xs rounded-lg border border-[#1F3C4D] cursor-pointer"
              >
                <option value="Básico" className="bg-[#092332] text-white">Básico</option>
                <option value="Intermedio" className="bg-[#092332] text-white">Intermedio</option>
                <option value="Avanzado" className="bg-[#092332] text-white">Avanzado</option>
                <option value="Especializado" className="bg-[#092332] text-white">Especializado</option>
                <option value="Obligatorio" className="bg-[#092332] text-white">Obligatorio</option>
              </select>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-white flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Duración Estimada</span>
              </label>
              <input
                type="text"
                placeholder="ej: 2h 15m"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full h-8 px-3 bg-[#0D2535] text-white text-xs rounded-lg border border-[#1F3C4D] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[12px] font-semibold text-white flex items-center gap-1 mb-1">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Módulos / Clases</span>
              </label>
              <input
                type="text"
                placeholder="ej: 6 Módulos"
                value={formData.modules}
                onChange={(e) => setFormData({ ...formData, modules: e.target.value })}
                className="w-full h-8 px-3 bg-[#0D2535] text-white text-xs rounded-lg border border-[#1F3C4D] focus:outline-none"
              />
            </div>
          </div>

          {/* Distintivo e Instructor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[12px] font-semibold text-white block mb-1">
                Etiqueta / Badge
              </label>
              <input
                type="text"
                placeholder="ej: Obligatorio, Certificación, Bursátil"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full h-8 px-3 bg-[#0D2535] text-white text-xs rounded-lg border border-[#1F3C4D] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[12px] font-semibold text-white flex items-center gap-1 mb-1">
                <User className="w-3.5 h-3.5 text-amber-300" />
                <span>Instructor / Facilitador</span>
              </label>
              <input
                type="text"
                placeholder="ej: Comité Fiduciario"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full h-8 px-3 bg-[#0D2535] text-white text-xs rounded-lg border border-[#1F3C4D] focus:outline-none"
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="text-[12px] font-semibold text-white flex items-center gap-1 mb-1">
              <FileText className="w-3.5 h-3.5 text-[#8C9BA5]" />
              <span>Descripción y Contenido del Curso</span>
            </label>
            <textarea
              rows={2}
              placeholder="Explica los objetivos de aprendizaje..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 bg-[#0D2535] text-white text-xs rounded-lg border border-[#1F3C4D] focus:outline-none"
            />
          </div>

          {/* Botones estilo macOS Sheet */}
          <div className="pt-3 border-t border-[#1A3441] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-8 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-[#CFCDBC] hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-8 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-[#092332] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Guardando...' : 'Publicar en MariaDB'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
