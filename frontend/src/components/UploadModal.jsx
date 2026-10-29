import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  X,
  FileText,
  CheckCircle,
  AlertCircle,
  Building,
  Shield,
  Tag,
  Loader2,
  Layers,
  GraduationCap
} from 'lucide-react';

export default function UploadModal({ onClose, onUploadSuccess, currentUser }) {
  const [title, setTitle] = useState('');
  const [division, setDivision] = useState(currentUser?.division || 'corp');
  const [department, setDepartment] = useState('Gobernanza, Legal & Cumplimiento');
  const [customDepartment, setCustomDepartment] = useState('');
  const [category, setCategory] = useState('governance');
  const [confidentiality, setConfidentiality] = useState('Uso Interno');
  const [version, setVersion] = useState('v1.0');
  const [author, setAuthor] = useState(currentUser?.name || 'Super Administrador Fiduciario');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const [companyList, setCompanyList] = useState([
    { id: 'all', shortName: 'Todas las Empresas (Holding Consolidado)' },
    { id: 'corp', shortName: 'Holding Del Valle' },
    { id: 'cerezera', shortName: 'Inversiones Cerezera' },
    { id: 'america', shortName: 'Radio América 95.5 FM' },
    { id: 'daleo', shortName: 'Daleo Construcciones' },
    { id: 'advision', shortName: 'Advision DOOH' },
    { id: 'vallealto', shortName: 'Valle Alto' }
  ]);

  const [deptMap, setDeptMap] = useState({});
  const [catList, setCatList] = useState([]);

  useEffect(() => {
    fetch('/api/companies').then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setCompanyList([
          { id: 'all', shortName: 'Todas las Empresas (Holding Consolidado)' },
          ...data
        ]);
      }
    }).catch(() => {});

    fetch('/api/departments').then(r => r.json()).then(data => {
      if (data) setDeptMap(data);
    }).catch(() => {});

    fetch('/api/categories').then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) setCatList(data);
    }).catch(() => {});
  }, []);

  const fileInputRef = useRef(null);

  const getAvailableDepts = () => {
    if (division === 'all') {
      const allDepts = new Set();
      Object.entries(deptMap).forEach(([k, arr]) => {
        if (Array.isArray(arr) && k !== 'allList') arr.forEach(d => allDepts.add(d));
      });
      return Array.from(allDepts).length > 0 ? Array.from(allDepts) : [
        'Gobernanza, Legal & Cumplimiento',
        'Finanzas & Tesorería Central',
        'Talento Humano & Beneficios',
        'Tecnología e Infraestructura TI'
      ];
    }
    return deptMap[division] || [
      'Gobernanza General',
      'Operaciones & Finanzas'
    ];
  };

  const handleDivisionChange = (div) => {
    setDivision(div);
    const depts = div === 'all' ? getAvailableDepts() : (deptMap[div] || []);
    if (depts.length > 0) setDepartment(depts[0]);
    setCustomDepartment('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!title) {
        const cleanName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        setTitle(cleanName.replace(/[-_]/g, ' '));
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (!title) {
        const cleanName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        setTitle(cleanName.replace(/[-_]/g, ' '));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setErrorMsg('Por favor ingrese el título del recurso o curso.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const finalDepartment = customDepartment.trim() || department;

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('division', division);
      formData.append('department', finalDepartment);
      formData.append('category', category);
      formData.append('confidentiality', confidentiality);
      formData.append('version', version);
      formData.append('author', author);
      formData.append('description', description);
      formData.append('tags', tags);

      if (selectedFile) {
        formData.append('file', selectedFile);
      } else {
        formData.append('fileType', 'pdf');
      }

      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'x-user-name': currentUser?.name || 'Super Administrador'
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar el archivo en MariaDB.');
      }

      onUploadSuccess(data.resource);
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-montserrat">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#CFCDBC] animate-in fade-in zoom-in-95 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#CFCDBC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1F2E54] text-white flex items-center justify-center shadow-sm">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#092332] leading-tight">
                Crear / Subir Recurso o Curso
              </h2>
              <p className="text-xs text-[#40606E]">
                Aprovisionamiento fiduciario por Empresa y Departamento
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          {/* Zona de Arrastrar y Soltar Archivo */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-[#1F2E54] bg-[#FBFBF5]'
                : selectedFile
                ? 'border-emerald-500 bg-emerald-50/40'
                : 'border-[#CFCDBC] bg-[#FBFBF5] hover:bg-white'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {selectedFile ? (
              <div className="flex items-center justify-center gap-3 text-emerald-800 font-semibold">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <div className="text-left">
                  <div className="font-bold text-xs">{selectedFile.name}</div>
                  <div className="text-[10px] text-gray-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Listo para almacenar en MariaDB
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <Upload className="w-6 h-6 text-[#1F2E54] mx-auto" />
                <div className="font-bold text-[#092332]">
                  Haga clic para seleccionar o arrastre el archivo aquí
                </div>
                <div className="text-[10px] text-gray-400">
                  PDF, DOCX, XLSX, MP4, PPTX (Máx. 50MB) • Se registrará en MariaDB local
                </div>
              </div>
            )}
          </div>

          {/* Título del Recurso */}
          <div>
            <label className="block text-xs font-bold text-[#092332] mb-1">
              Título del Recurso o Curso *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Manual de Auditoría Fiduciaria ISO 27001 / Guía de Mesa de Dinero"
              className="w-full px-3.5 py-2.5 bg-[#FBFBF5] text-[#092332] text-xs font-medium rounded-xl border border-[#CFCDBC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20"
              required
            />
          </div>

          {/* Fila: Empresa y Departamento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#092332] mb-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#1F2E54]" />
                <span>Empresa / Unidad de Negocio *</span>
              </label>
              <select
                value={division}
                onChange={(e) => handleDivisionChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FBFBF5] text-[#092332] text-xs font-medium rounded-xl border border-[#CFCDBC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20 cursor-pointer"
              >
                {companyList.map(c => (
                  <option key={c.id} value={c.id}>{c.shortName || c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#092332] mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#1F2E54]" />
                <span>Departamento Asignado *</span>
              </label>
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setCustomDepartment('');
                }}
                className="w-full px-3.5 py-2.5 bg-[#FBFBF5] text-[#092332] text-xs font-medium rounded-xl border border-[#CFCDBC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20 cursor-pointer"
              >
                {getAvailableDepts().map((deptName, i) => (
                  <option key={i} value={deptName}>{deptName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Campo para Escribir Departamento Personalizado Desde Cero */}
          <div>
            <label className="block text-[11px] font-semibold text-[#40606E] mb-1">
              O ingrese un departamento personalizado desde cero (opcional):
            </label>
            <input
              type="text"
              value={customDepartment}
              onChange={(e) => setCustomDepartment(e.target.value)}
              placeholder="Ej: Gerencia de Inversiones Agroindustriales / Unidad DOOH Nocturna"
              className="w-full px-3.5 py-2 bg-[#FBFBF5] text-[#092332] text-xs font-medium rounded-xl border border-[#CFCDBC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20"
            />
          </div>

          {/* Fila: Categoría y Clasificación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#092332] mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#1F2E54]" />
                <span>Categoría Temática *</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FBFBF5] text-[#092332] text-xs font-medium rounded-xl border border-[#CFCDBC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20 cursor-pointer"
              >
                {catList.length > 0 ? (
                  catList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
                ) : (
                  <>
                    <option value="governance">Políticas & Gobernanza</option>
                    <option value="hr">Talento Humano & Beneficios</option>
                    <option value="brand">Identidad de Marca & Medios</option>
                    <option value="templates">Plantillas & Formularios</option>
                    <option value="tools">Herramientas & Accesos TI</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#092332] mb-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#1F2E54]" />
                <span>Nivel de Confidencialidad *</span>
              </label>
              <select
                value={confidentiality}
                onChange={(e) => setConfidentiality(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FBFBF5] text-[#092332] text-xs font-medium rounded-xl border border-[#CFCDBC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20 cursor-pointer"
              >
                <option value="Público">Público (Todos los colaboradores)</option>
                <option value="Uso Interno">Uso Interno (Empresas Del Valle)</option>
                <option value="Confidencial">Confidencial (Requiere autorización)</option>
                <option value="Restringido">Restringido Fiduciario (Directiva)</option>
              </select>
            </div>
          </div>

          {/* Fila: Versión y Autor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#092332] mb-1">
                Versión
              </label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="v1.0"
                className="w-full px-3.5 py-2 bg-[#FBFBF5] text-[#092332] text-xs font-medium rounded-xl border border-[#CFCDBC] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#092332] mb-1">
                Autor o Emisor Responsable
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FBFBF5] text-[#092332] text-xs font-medium rounded-xl border border-[#CFCDBC] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-bold text-[#092332] mb-1">
              Descripción del Recurso
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Indique el propósito, alcance o instrucciones para el colaborador..."
              className="w-full px-3.5 py-2 bg-[#FBFBF5] text-[#092332] text-xs font-medium rounded-xl border border-[#CFCDBC] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Botones de Acción */}
          <div className="pt-3 border-t border-[#CFCDBC] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#CFCDBC] text-xs font-bold text-[#40606E] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ backgroundColor: '#1F2E54', color: '#FFFFFF' }}
              className="px-5 py-2.5 bg-[#1F2E54] hover:bg-[#092332] !text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Almacenando en MariaDB...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 text-white" />
                  <span>Publicar en Repositorio</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
