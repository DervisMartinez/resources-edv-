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
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-montserrat select-none text-white">
      <div className="bg-[#092332] rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#1F3C4D] animate-in fade-in zoom-in-95 my-8">
        {/* Header estilo macOS Sheet Titlebar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1A3441]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1F2E54] text-white flex items-center justify-center border border-white/20 shadow-xs">
              <Upload className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Crear / Subir Recurso o Curso
              </h2>
              <p className="text-[11px] text-[#8C9BA5]">
                Aprovisionamiento por filial y departamento en MariaDB
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8C9BA5] hover:text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-3 p-3 bg-red-500/20 border border-red-500/40 text-red-300 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          {/* Zona de Arrastrar y Soltar Archivo */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-emerald-400 bg-[#0D2535]'
                : selectedFile
                ? 'border-emerald-500/60 bg-emerald-500/10'
                : 'border-[#1F3C4D] bg-[#0D2535] hover:border-[#40606E]'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {selectedFile ? (
              <div className="flex items-center justify-center gap-2 text-emerald-300 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <div className="text-left">
                  <div className="font-bold text-xs text-white">{selectedFile.name}</div>
                  <div className="text-[10px] text-[#8C9BA5]">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Listo para almacenar en MariaDB
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <Upload className="w-5 h-5 text-emerald-400 mx-auto" />
                <div className="font-semibold text-white text-[12px]">
                  Haga clic para seleccionar o arrastre el archivo aquí
                </div>
                <div className="text-[10px] text-[#8C9BA5]">
                  PDF, DOCX, XLSX, MP4, PPTX (Máx. 50MB) • Se guardará en MariaDB
                </div>
              </div>
            )}
          </div>

          {/* Título del Recurso */}
          <div>
            <label className="block text-[12px] font-semibold text-white mb-1">
              Título del Recurso o Curso *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Manual de Gobernanza Fiduciaria ISO 27001 / Guía de Mesa de Dinero"
              className="w-full h-8 px-3 bg-[#0D2535] text-white text-xs font-medium rounded-lg border border-[#1F3C4D] focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
              required
            />
          </div>

          {/* Fila: Empresa y Departamento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-white mb-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#CFCDBC]" />
                <span>Empresa / Unidad de Negocio *</span>
              </label>
              <select
                value={division}
                onChange={(e) => handleDivisionChange(e.target.value)}
                className="w-full h-8 px-2.5 bg-[#0D2535] text-white text-xs font-medium rounded-lg border border-[#1F3C4D] focus:outline-none focus:ring-1 focus:ring-emerald-400/40 cursor-pointer"
              >
                {companyList.map(c => (
                  <option key={c.id} value={c.id} className="bg-[#092332] text-white">{c.shortName || c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-white mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#CFCDBC]" />
                <span>Departamento Asignado *</span>
              </label>
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setCustomDepartment('');
                }}
                className="w-full h-8 px-2.5 bg-[#0D2535] text-white text-xs font-medium rounded-lg border border-[#1F3C4D] focus:outline-none focus:ring-1 focus:ring-emerald-400/40 cursor-pointer"
              >
                {getAvailableDepts().map((deptName, i) => (
                  <option key={i} value={deptName} className="bg-[#092332] text-white">{deptName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Campo para Escribir Departamento Personalizado Desde Cero */}
          <div>
            <label className="block text-[11px] font-medium text-[#8C9BA5] mb-1">
              O ingrese un departamento personalizado (opcional):
            </label>
            <input
              type="text"
              value={customDepartment}
              onChange={(e) => setCustomDepartment(e.target.value)}
              placeholder="Ej: Gerencia de Inversiones Agroindustriales / Unidad DOOH Nocturna"
              className="w-full h-8 px-3 bg-[#0D2535] text-white text-xs font-medium rounded-lg border border-[#1F3C4D] focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
            />
          </div>

          {/* Fila: Categoría y Clasificación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-white mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#CFCDBC]" />
                <span>Categoría Temática *</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-8 px-2.5 bg-[#0D2535] text-white text-xs font-medium rounded-lg border border-[#1F3C4D] focus:outline-none focus:ring-1 focus:ring-emerald-400/40 cursor-pointer"
              >
                {catList.length > 0 ? (
                  catList.map(c => <option key={c.id} value={c.id} className="bg-[#092332] text-white">{c.name}</option>)
                ) : (
                  <>
                    <option value="governance" className="bg-[#092332] text-white">Políticas & Gobernanza</option>
                    <option value="hr" className="bg-[#092332] text-white">Talento Humano & Beneficios</option>
                    <option value="brand" className="bg-[#092332] text-white">Identidad de Marca & Medios</option>
                    <option value="templates" className="bg-[#092332] text-white">Plantillas & Formularios</option>
                    <option value="tools" className="bg-[#092332] text-white">Herramientas & Accesos TI</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-white mb-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#CFCDBC]" />
                <span>Nivel de Confidencialidad *</span>
              </label>
              <select
                value={confidentiality}
                onChange={(e) => setConfidentiality(e.target.value)}
                className="w-full h-8 px-2.5 bg-[#0D2535] text-white text-xs font-medium rounded-lg border border-[#1F3C4D] focus:outline-none focus:ring-1 focus:ring-emerald-400/40 cursor-pointer"
              >
                <option value="Público" className="bg-[#092332] text-white">Público (Todos los colaboradores)</option>
                <option value="Uso Interno" className="bg-[#092332] text-white">Uso Interno (Empresas Del Valle)</option>
                <option value="Confidencial" className="bg-[#092332] text-white">Confidencial (Requiere autorización)</option>
                <option value="Restringido" className="bg-[#092332] text-white">Restringido Fiduciario (Directiva)</option>
              </select>
            </div>
          </div>

          {/* Fila: Versión y Autor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-white mb-1">
                Versión
              </label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="v1.0"
                className="w-full h-8 px-3 bg-[#0D2535] text-white text-xs font-medium rounded-lg border border-[#1F3C4D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-white mb-1">
                Autor o Emisor Responsable
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full h-8 px-3 bg-[#0D2535] text-white text-xs font-medium rounded-lg border border-[#1F3C4D] focus:outline-none"
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-[12px] font-semibold text-white mb-1">
              Descripción del Recurso
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Indique el propósito o alcance..."
              className="w-full p-2.5 bg-[#0D2535] text-white text-xs font-medium rounded-lg border border-[#1F3C4D] focus:outline-none"
            />
          </div>

          {/* Botones de Acción estilo macOS Sheet */}
          <div className="pt-3 border-t border-[#1A3441] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-8 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#CFCDBC] hover:text-white transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-8 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#092332] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Publicar en MariaDB</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
