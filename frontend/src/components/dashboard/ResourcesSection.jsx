import React, { useState, useMemo } from 'react';
import DivisionFilter from '../DivisionFilter.jsx';
import Toolbar from '../Toolbar.jsx';
import ResourceCard from '../ResourceCard.jsx';
import ResourceTable from '../ResourceTable.jsx';
import { FolderSearch, PlusCircle, Upload, Building, Filter } from 'lucide-react';

const corporateDepartments = {
  corp: [
    'Dirección General & Presidencia',
    'Gobernanza, Legal & Cumplimiento',
    'Auditoría Fiduciaria ISO 27001',
    'Finanzas & Tesorería Central',
    'Talento Humano & Beneficios',
    'Tecnología e Infraestructura TI'
  ],
  cerezera: [
    'Mesa de Dinero & Inversiones',
    'Análisis de Riesgos Cuantitativos',
    'Gestión de Portafolios de Capital',
    'Contabilidad & Liquidación Bursátil'
  ],
  america: [
    'Dirección Editorial & Noticias',
    'Cabina Master & Transmisión',
    'Producción & Contenidos Multimedia',
    'Comercialización & Pautas Radiales'
  ],
  daleo: [
    'Ingeniería Civil & Proyectos Urbanos',
    'Seguridad y Salud Laboral en Obras',
    'Costos, Presupuestos & APU',
    'Arquitectura & Diseño Sostenible'
  ],
  advision: [
    'Operaciones & Mantenimiento DOOH',
    'Planificación de Medios Exteriores',
    'Comercialización & Cuentas Clave',
    'Tráfico & Pautas de Pantallas LED'
  ]
};

export default function ResourcesSection({
  currentUser,
  resources = [],
  setResources,
  divisions = [],
  onOpenUpload,
  onViewDetails,
  onDownload,
  onToggleFavorite,
  searchQuery,
  onSearchChange
}) {
  const isSuperAdmin = currentUser?.role === 'Super Administrador';
  const userDivision = currentUser?.division || 'corp';

  const [activeDivision, setActiveDivision] = useState(isSuperAdmin ? 'all' : userDivision);
  const [activeDepartment, setActiveDepartment] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [confidentialityFilter, setConfidentialityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const getDivisionName = (divId) => {
    const d = divisions.find(item => item.id === divId);
    return d ? d.shortName : 'Holding Del Valle';
  };

  // Departamentos disponibles según la división seleccionada
  const availableDepartments = useMemo(() => {
    const targetDivision = isSuperAdmin ? activeDivision : userDivision;
    if (targetDivision === 'all') {
      const allDepts = new Set();
      Object.values(corporateDepartments).forEach(arr => arr.forEach(d => allDepts.add(d)));
      return Array.from(allDepts);
    }
    return corporateDepartments[targetDivision] || [];
  }, [activeDivision, isSuperAdmin, userDivision]);

  const filteredResources = useMemo(() => {
    let result = [...resources];

    if (!isSuperAdmin) {
      // Usuario normal: exclusivamente su empresa asignada o documentos generales del holding ('all')
      result = result.filter(r => r.division === userDivision || r.division === 'all');
    } else if (activeDivision && activeDivision !== 'all') {
      result = result.filter(r => r.division === activeDivision);
    }

    if (activeDepartment && activeDepartment !== 'all') {
      result = result.filter(r => r.department === activeDepartment);
    }

    if (activeCategory && activeCategory !== 'all') {
      result = result.filter(r => r.category === activeCategory);
    }

    if (showFavoritesOnly) {
      result = result.filter(r => r.isFavorite);
    }

    if (fileTypeFilter && fileTypeFilter !== 'all') {
      result = result.filter(r => r.fileType.toLowerCase() === fileTypeFilter.toLowerCase());
    }

    if (confidentialityFilter && confidentialityFilter !== 'all') {
      result = result.filter(r => r.confidentiality === confidentialityFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        (r.department && r.department.toLowerCase().includes(q)) ||
        (r.tags && r.tags.some(tag => tag.toLowerCase().includes(q)))
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.updatedAt) - new Date(a.updatedAt);
      if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
      if (sortBy === 'downloads') return (b.downloadsCount || 0) - (a.downloadsCount || 0);
      return 0;
    });

    return result;
  }, [
    resources,
    activeDivision,
    isSuperAdmin,
    userDivision,
    activeDepartment,
    activeCategory,
    showFavoritesOnly,
    fileTypeFilter,
    confidentialityFilter,
    searchQuery,
    sortBy
  ]);

  return (
    <div className="space-y-6 font-montserrat">
      {/* Encabezado con Botón Destacado de Alta Visibilidad */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#CFCDBC]">
        <div>
          <h2 className="text-2xl font-black text-[#092332] tracking-tight">
            Bóveda de Recursos Corporativos
          </h2>
          <p className="text-xs text-[#40606E] mt-0.5">
            {isSuperAdmin
              ? 'Documentación fiduciaria, normativas y formatos operativos desglosados por empresa y departamento.'
              : `Documentación oficial asignada y autorizada para ${divisions.find(d => d.id === userDivision)?.shortName || 'tu empresa'}.`}
          </p>
        </div>

        {/* Botón Sólido de Alta Visibilidad (Solo Super Administrador) */}
        {isSuperAdmin && (
          <button
            onClick={onOpenUpload}
            style={{ backgroundColor: '#1F2E54', color: '#FFFFFF' }}
            className="px-5 py-2.5 bg-[#1F2E54] hover:bg-[#092332] !text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#1F2E54]/30 transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <Upload className="w-4 h-4 text-white" />
            <span>Crear / Subir Recurso</span>
          </button>
        )}
      </div>

      {/* Selector de Unidades de Negocio / Empresa */}
      <DivisionFilter
        activeDivision={activeDivision}
        onSelectDivision={(div) => {
          setActiveDivision(div);
          setActiveDepartment('all');
        }}
        divisions={divisions}
        isSuperAdmin={isSuperAdmin}
        userDivision={userDivision}
      />

      {/* Barra de Desglose por Departamento */}
      <div className="bg-white p-3 rounded-2xl border border-[#CFCDBC] shadow-sm flex items-center gap-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#092332] whitespace-nowrap pl-2">
          <Filter className="w-3.5 h-3.5 text-[#1F2E54]" />
          <span>Departamento:</span>
        </div>

        <button
          onClick={() => setActiveDepartment('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeDepartment === 'all'
              ? 'bg-[#1F2E54] text-white shadow-xs'
              : 'bg-[#FBFBF5] text-[#40606E] hover:bg-[#CFCDBC]/40 border border-[#CFCDBC]'
          }`}
        >
          Todos los Departamentos
        </button>

        {availableDepartments.map((dept, idx) => (
          <button
            key={idx}
            onClick={() => setActiveDepartment(dept)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeDepartment === dept
                ? 'bg-[#1F2E54] text-white font-bold shadow-xs'
                : 'bg-[#FBFBF5] text-[#40606E] hover:bg-[#CFCDBC]/40 border border-[#CFCDBC]'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <Toolbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        fileTypeFilter={fileTypeFilter}
        onFileTypeChange={setFileTypeFilter}
        confidentialityFilter={confidentialityFilter}
        onConfidentialityChange={setConfidentialityFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        totalResults={filteredResources.length}
      />

      {/* Listado de Recursos: Cuadrícula o Tabla */}
      {filteredResources.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#CFCDBC] p-12 text-center my-8 shadow-sm">
          <FolderSearch className="w-12 h-12 text-[#40606E]/60 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#092332]">
            {resources.length === 0
              ? 'Aún no hay recursos creados en el repositorio'
              : 'No se encontraron recursos en este filtro'}
          </h3>
          <p className="text-xs text-[#40606E] max-w-md mx-auto mt-1 mb-5">
            {resources.length === 0
              ? 'El repositorio está limpio. Como Super Administrador, puedes crear y subir los documentos, normativas y cursos reales para cada empresa y departamento.'
              : 'No hay documentos registrados para la combinación de empresa y departamento seleccionada.'}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setActiveDivision('all');
                setActiveDepartment('all');
                setActiveCategory('all');
                onSearchChange('');
                setFileTypeFilter('all');
                setConfidentialityFilter('all');
                setShowFavoritesOnly(false);
              }}
              className="px-4 py-2 bg-[#FBFBF5] text-[#092332] rounded-xl text-xs font-bold border border-[#CFCDBC] hover:bg-gray-100 cursor-pointer"
            >
              Restablecer Filtros
            </button>
            <button
              onClick={onOpenUpload}
              style={{ backgroundColor: '#1F2E54', color: '#FFFFFF' }}
              className="px-4 py-2 bg-[#1F2E54] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Upload className="w-4 h-4 text-white" />
              <span>Crear Recurso en este Depto</span>
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredResources.map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              divisionName={getDivisionName(res.division)}
              onDownload={onDownload}
              onToggleFavorite={onToggleFavorite}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <ResourceTable
          resources={filteredResources}
          divisions={divisions}
          onDownload={onDownload}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
        />
      )}
    </div>
  );
}
