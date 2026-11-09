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
    <div className="w-full space-y-3.5 mb-6 font-montserrat select-none">
      {/* Category Pills Bar estilo macOS Segmented Control */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categoryConfig.map((cat) => {
          const isActive = activeCategory === cat.id && !showFavoritesOnly;
          return (
            <button
              key={cat.id}
              onClick={() => {
                if (showFavoritesOnly) onToggleFavorites();
                onSelectCategory(cat.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                isActive
                  ? 'bg-[#1F2E54] text-white border-white/20 shadow-xs'
                  : 'bg-[#0D2535] hover:bg-[#112F42] text-[#B4BCC8] hover:text-white border-[#1F3C4D]'
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
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
            showFavoritesOnly
              ? 'bg-amber-500 text-[#092332] border-amber-400 font-bold shadow-xs'
              : 'bg-[#0D2535] hover:bg-[#112F42] text-amber-400 border-[#1F3C4D]'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
          <span>Favoritos</span>
        </button>
      </div>

      {/* Main Filter Toolbar macOS Dark Surface */}
      <div className="bg-[#0D2535] p-2.5 sm:p-3 rounded-xl border border-[#1F3C4D] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        {/* Search Bar Inset */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C9BA5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por título, autor o palabra clave..."
            className="w-full h-8 pl-8 pr-7 bg-[#091E2A] text-white placeholder:text-[#8C9BA5] text-xs font-medium rounded-lg border border-[#1F3C4D] focus:border-[#40606E] focus:outline-none focus:ring-1 focus:ring-[#CFCDBC]/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C9BA5] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dropdown Filters and View Switches */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* File Type Filter */}
          <div className="flex items-center bg-[#091E2A] rounded-lg border border-[#1F3C4D] px-2 h-8">
            <FileType2 className="w-3.5 h-3.5 text-[#8C9BA5] mr-1.5" />
            <select
              value={fileTypeFilter}
              onChange={(e) => onFileTypeChange(e.target.value)}
              className="bg-transparent text-[11px] font-semibold text-[#B4BCC8] focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#091E2A] text-white">Formato: Todos</option>
              <option value="pdf" className="bg-[#091E2A] text-white">PDF</option>
              <option value="xlsx" className="bg-[#091E2A] text-white">Excel (.xlsx)</option>
              <option value="docx" className="bg-[#091E2A] text-white">Word (.docx)</option>
              <option value="pptx" className="bg-[#091E2A] text-white">PowerPoint (.pptx)</option>
              <option value="zip" className="bg-[#091E2A] text-white">Archivo ZIP</option>
            </select>
          </div>

          {/* Confidentiality Filter */}
          <div className="flex items-center bg-[#091E2A] rounded-lg border border-[#1F3C4D] px-2 h-8">
            <ShieldAlert className="w-3.5 h-3.5 text-[#8C9BA5] mr-1.5" />
            <select
              value={confidentialityFilter}
              onChange={(e) => onConfidentialityChange(e.target.value)}
              className="bg-transparent text-[11px] font-semibold text-[#B4BCC8] focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#091E2A] text-white">Clasificación: Todas</option>
              <option value="Público" className="bg-[#091E2A] text-white">Público</option>
              <option value="Uso Interno" className="bg-[#091E2A] text-white">Uso Interno</option>
              <option value="Confidencial" className="bg-[#091E2A] text-white">Confidencial</option>
              <option value="Restringido Fiduciario" className="bg-[#091E2A] text-white">Restringido Fiduciario</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center bg-[#091E2A] rounded-lg border border-[#1F3C4D] px-2 h-8">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8C9BA5] mr-1.5" />
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="bg-transparent text-[11px] font-semibold text-[#B4BCC8] focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-[#091E2A] text-white">Más recientes</option>
              <option value="title_asc" className="bg-[#091E2A] text-white">Nombre A-Z</option>
              <option value="downloads" className="bg-[#091E2A] text-white">Más descargados</option>
            </select>
          </div>

          {/* macOS Segmented Control: Grid / List */}
          <div className="flex items-center bg-[#061219] rounded-lg border border-[#1F3C4D] p-0.5 h-8">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1 rounded-md transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#1F2E54] text-white shadow-xs'
                  : 'text-[#8C9BA5] hover:text-white'
              }`}
              title="Vista de Cuadrícula"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1 rounded-md transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[#1F2E54] text-white shadow-xs'
                  : 'text-[#8C9BA5] hover:text-white'
              }`}
              title="Vista de Lista"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-[11px] text-[#8C9BA5] px-1 font-medium">
        <span>{totalResults} recurso(s) en la bóveda fiduciaria</span>
        {(searchQuery || fileTypeFilter !== 'all' || confidentialityFilter !== 'all' || showFavoritesOnly) && (
          <span className="text-emerald-400 font-semibold">Filtros activos</span>
        )}
      </div>
    </div>
  );
}
