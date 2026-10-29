import React from 'react';
import {
  Search,
  LayoutGrid,
  List,
  Filter,
  ShieldAlert,
  FileType2,
  ArrowUpDown,
  Star,
  BookOpen,
  Users,
  Palette,
  FileSpreadsheet,
  Cpu
} from 'lucide-react';

export default function Toolbar({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  fileTypeFilter,
  onFileTypeChange,
  confidentialityFilter,
  onConfidentialityChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  showFavoritesOnly,
  onToggleFavorites,
  totalResults
}) {
  const categoryConfig = [
    { id: 'all', label: 'Todos los Recursos', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'governance', label: 'Políticas & Gobernanza', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'hr', label: 'Talento Humano & Beneficios', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'brand', label: 'Identidad de Marca & Medios', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'templates', label: 'Plantillas & Formularios', icon: <FileSpreadsheet className="w-3.5 h-3.5" /> },
    { id: 'tools', label: 'Herramientas & Accesos TI', icon: <Cpu className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="w-full space-y-4 mb-6">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categoryConfig.map((cat) => {
          const isActive = activeCategory === cat.id && !showFavoritesOnly;
          return (
            <button
              key={cat.id}
              onClick={() => {
                if (showFavoritesOnly) onToggleFavorites();
                onSelectCategory(cat.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#092332] text-white border-[#092332] shadow-sm'
                  : 'bg-white hover:bg-[#f7f4e2] text-[#43474c] border-[#c3c7cc]'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}

        {/* Favorite Filter Pill */}
        <button
          onClick={onToggleFavorites}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
            showFavoritesOnly
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white hover:bg-amber-50 text-amber-700 border-[#c3c7cc]'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
          <span>Mis Favoritos</span>
        </button>
      </div>

      {/* Main Filter Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-[#c3c7cc] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#73787c]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por título, palabra clave, etiqueta o autor..."
            className="w-full h-10 pl-10 pr-4 bg-[#f7f4e2] text-[#1c1c11] text-xs font-medium rounded-lg border border-[#c3c7cc] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3A5A78] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#73787c] hover:text-black"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dropdown Filters and View Switches */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* File Type Filter */}
          <div className="flex items-center bg-[#f7f4e2] rounded-lg border border-[#c3c7cc] px-2.5 h-10">
            <FileType2 className="w-3.5 h-3.5 text-[#73787c] mr-1.5" />
            <select
              value={fileTypeFilter}
              onChange={(e) => onFileTypeChange(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[#1c1c11] focus:outline-none cursor-pointer"
            >
              <option value="all">Formato: Todos</option>
              <option value="pdf">PDF</option>
              <option value="xlsx">Excel (.xlsx)</option>
              <option value="docx">Word (.docx)</option>
              <option value="pptx">PowerPoint (.pptx)</option>
              <option value="zip">Archivo ZIP</option>
            </select>
          </div>

          {/* Confidentiality Filter */}
          <div className="flex items-center bg-[#f7f4e2] rounded-lg border border-[#c3c7cc] px-2.5 h-10">
            <ShieldAlert className="w-3.5 h-3.5 text-[#73787c] mr-1.5" />
            <select
              value={confidentialityFilter}
              onChange={(e) => onConfidentialityChange(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[#1c1c11] focus:outline-none cursor-pointer"
            >
              <option value="all">Clasificación: Todas</option>
              <option value="Público">Público</option>
              <option value="Uso Interno">Uso Interno</option>
              <option value="Confidencial">Confidencial</option>
              <option value="Restringido Fiduciario">Restringido Fiduciario</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center bg-[#f7f4e2] rounded-lg border border-[#c3c7cc] px-2.5 h-10">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#73787c] mr-1.5" />
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[#1c1c11] focus:outline-none cursor-pointer"
            >
              <option value="newest">Más recientes</option>
              <option value="title_asc">Nombre A-Z</option>
              <option value="downloads">Más descargados</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#f7f4e2] rounded-lg border border-[#c3c7cc] p-1 h-10">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#092332] text-white shadow-sm'
                  : 'text-[#73787c] hover:text-[#1c1c11]'
              }`}
              title="Vista de Cuadrícula"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[#092332] text-white shadow-sm'
                  : 'text-[#73787c] hover:text-[#1c1c11]'
              }`}
              title="Vista de Tabla Detallada"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-[#73787c] px-1 font-medium">
        <span>Mostrando {totalResults} recursos disponibles en el repositorio fiduciario</span>
        {(searchQuery || fileTypeFilter !== 'all' || confidentialityFilter !== 'all' || showFavoritesOnly) && (
          <span className="text-[#3A5A78] font-bold">Filtros activos aplicados</span>
        )}
      </div>
    </div>
  );
}
