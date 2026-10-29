import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  FolderTree,
  Tag,
  Edit2,
  Trash2,
  Plus,
  Check,
  AlertCircle,
  Save,
  ShieldCheck,
  Mail,
  ExternalLink
} from 'lucide-react';

export default function CorporateStructureModal({ onClose, onStructureUpdated }) {
  const [activeTab, setActiveTab] = useState('companies'); // 'companies' | 'departments' | 'categories'

  // Data states
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState('corp');

  // Edit states
  const [editingCompany, setEditingCompany] = useState(null);
  const [editingDept, setEditingDept] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  // New item states
  const [showNewCompany, setShowNewCompany] = useState(false);
  const [newCompany, setNewCompany] = useState({ id: '', name: '', shortName: '', code: '', description: '', logoPath: '/logo-holding.png', color: '#1F2E54', webmailUrl: 'https://webmail.empresasdelvalle.com.ve' });

  const [showNewDept, setShowNewDept] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptCompany, setNewDeptCompany] = useState('corp');

  const [showNewCat, setShowNewCat] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const [feedback, setFeedback] = useState({ msg: '', type: '' });

  // Fetch all structure data
  const loadData = async () => {
    try {
      const [compRes, deptRes, catRes] = await Promise.all([
        fetch('/api/companies'),
        fetch('/api/departments'),
        fetch('/api/categories')
      ]);

      if (compRes.ok) setCompanies(await compRes.json());
      if (deptRes.ok) {
        const dData = await deptRes.json();
        setDepartments(dData.allList || []);
      }
      if (catRes.ok) setCategories(await catRes.json());
    } catch (e) {
      console.error('Error fetching structure:', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback({ msg: '', type: '' }), 3500);
  };

  // --- EMPRESAS HANDLERS ---
  const handleSaveCompany = async (comp) => {
    try {
      const res = await fetch(`/api/companies/${comp.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comp)
      });
      if (!res.ok) throw new Error('Error al actualizar la empresa.');
      showToast('Empresa actualizada correctamente en MariaDB.');
      setEditingCompany(null);
      loadData();
      if (onStructureUpdated) onStructureUpdated();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    if (!newCompany.name || !newCompany.shortName) return;
    try {
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCompany)
      });
      if (!res.ok) throw new Error('Error al crear la empresa.');
      showToast('Nueva empresa registrada en MariaDB.');
      setShowNewCompany(false);
      setNewCompany({ id: '', name: '', shortName: '', code: '', description: '', logoPath: '/logo-holding.png', color: '#1F2E54' });
      loadData();
      if (onStructureUpdated) onStructureUpdated();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // --- DEPARTAMENTOS HANDLERS ---
  const handleSaveDept = async (dept) => {
    try {
      const res = await fetch(`/api/departments/${dept.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dept)
      });
      if (!res.ok) throw new Error('Error al actualizar el departamento.');
      showToast('Departamento actualizado correctamente.');
      setEditingDept(null);
      loadData();
      if (onStructureUpdated) onStructureUpdated();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleCreateDept = async (e) => {
    e.preventDefault();
    if (!newDeptName.trim()) return;
    try {
      const res = await fetch('/api/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId: newDeptCompany, name: newDeptName.trim() })
      });
      if (!res.ok) throw new Error('Error al crear el departamento.');
      showToast('Nuevo departamento registrado.');
      setNewDeptName('');
      setShowNewDept(false);
      loadData();
      if (onStructureUpdated) onStructureUpdated();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteDept = async (id, name) => {
    if (!confirm(`¿Eliminar el departamento "${name}"?`)) return;
    try {
      const res = await fetch(`/api/departments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar.');
      showToast(`Departamento "${name}" eliminado.`);
      loadData();
      if (onStructureUpdated) onStructureUpdated();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // --- CATEGORÍAS HANDLERS ---
  const handleSaveCategory = async (cat) => {
    try {
      const res = await fetch(`/api/categories/${cat.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat)
      });
      if (!res.ok) throw new Error('Error al actualizar la categoría.');
      showToast('Categoría actualizada.');
      setEditingCategory(null);
      loadData();
      if (onStructureUpdated) onStructureUpdated();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName.trim(), description: newCatDesc.trim() })
      });
      if (!res.ok) throw new Error('Error al crear categoría.');
      showToast('Nueva categoría registrada.');
      setNewCatName('');
      setNewCatDesc('');
      setShowNewCat(false);
      loadData();
      if (onStructureUpdated) onStructureUpdated();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (!confirm(`¿Eliminar la categoría "${name}"?`)) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar categoría.');
      showToast(`Categoría "${name}" eliminada.`);
      loadData();
      if (onStructureUpdated) onStructureUpdated();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const filteredDepts = selectedCompanyFilter === 'all'
    ? departments
    : departments.filter(d => d.companyId === selectedCompanyFilter);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-montserrat select-none">
      <div className="bg-[#092332] text-white rounded-2xl max-w-4xl w-full border border-[#1F3C4D] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 my-auto">
        {/* Header */}
        <div className="p-5 bg-[#0D2535] border-b border-[#1A3441] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1F2E54] border border-[#CFCDBC]/40 flex items-center justify-center text-amber-300 shadow-md">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Gestión y Edición de Estructura Corporativa
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-[#B4BCC8]">
                Edita nombres de empresas, agrega o renombra departamentos y gestiona categorías en MariaDB.
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

        {/* Feedback Alert */}
        {feedback.msg && (
          <div className={`p-3 text-xs font-semibold flex items-center gap-2 ${
            feedback.type === 'error' ? 'bg-rose-500/20 text-rose-300 border-b border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border-b border-emerald-500/40'
          }`}>
            {feedback.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
            <span>{feedback.msg}</span>
          </div>
        )}

        {/* Tabs de Navegación */}
        <div className="flex border-b border-[#1A3441] bg-[#061219] px-4 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('companies')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'companies'
                ? 'bg-[#092332] text-white border-t border-x border-[#1F3C4D]'
                : 'text-[#8C9BA5] hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Empresas / Filiales ({companies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('departments')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'departments'
                ? 'bg-[#092332] text-white border-t border-x border-[#1F3C4D]'
                : 'text-[#8C9BA5] hover:text-white'
            }`}
          >
            <FolderTree className="w-4 h-4 text-amber-400" />
            <span>Departamentos ({departments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-[#092332] text-white border-t border-x border-[#1F3C4D]'
                : 'text-[#8C9BA5] hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4 text-cyan-400" />
            <span>Categorías Documentales ({categories.length})</span>
          </button>
        </div>

        {/* Contenido Dinámico por Pestaña */}
        <div className="flex-1 p-5 overflow-y-auto bg-[#092332] space-y-4">
          {/* TAB 1: EMPRESAS / FILIALES */}
          {activeTab === 'companies' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs text-[#B4BCC8]">
                  Puedes modificar la razón social, nombre corto, código y logo de cada empresa del grupo.
                </span>
                <button
                  onClick={() => setShowNewCompany(!showNewCompany)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#092332] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Empresa</span>
                </button>
              </div>

              {/* Formulario para Crear Empresa */}
              {showNewCompany && (
                <form onSubmit={handleCreateCompany} className="p-4 rounded-xl bg-[#0D2535] border border-[#1F3C4D] space-y-3 animate-in fade-in">
                  <div className="font-bold text-xs text-emerald-400">Registrar Nueva Empresa / Filial</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Identificador ID (ej: vallealto)"
                      value={newCompany.id}
                      onChange={(e) => setNewCompany({ ...newCompany, id: e.target.value })}
                      className="px-3 py-2 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Nombre Comercial Corto (ej: Valle Alto)"
                      value={newCompany.shortName}
                      onChange={(e) => setNewCompany({ ...newCompany, shortName: e.target.value })}
                      className="px-3 py-2 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Razón Social Completa"
                      value={newCompany.name}
                      onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                      className="px-3 py-2 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Código Fiduciario (ej: EDV-VALLEALTO)"
                      value={newCompany.code}
                      onChange={(e) => setNewCompany({ ...newCompany, code: e.target.value })}
                      className="px-3 py-2 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                    />
                    <input
                      type="text"
                      placeholder="Ruta del Logo (ej: /logo-vallealto.png)"
                      value={newCompany.logoPath}
                      onChange={(e) => setNewCompany({ ...newCompany, logoPath: e.target.value })}
                      className="px-3 py-2 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                    />
                    <input
                      type="url"
                      placeholder="URL de Webmail Oficial (ej: https://webmail.vallealto.com.ve)"
                      value={newCompany.webmailUrl}
                      onChange={(e) => setNewCompany({ ...newCompany, webmailUrl: e.target.value })}
                      className="px-3 py-2 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setShowNewCompany(false)} className="px-3 py-1.5 text-xs text-[#B4BCC8] hover:text-white">Cancelar</button>
                    <button type="submit" className="px-4 py-1.5 bg-emerald-500 text-[#092332] font-bold text-xs rounded-lg">Guardar Empresa</button>
                  </div>
                </form>
              )}

              {/* Lista de Empresas con Logos */}
              <div className="space-y-3">
                {companies.map((comp) => {
                  const isEditing = editingCompany?.id === comp.id;
                  return (
                    <div key={comp.id} className="p-4 rounded-xl bg-[#0D2535] border border-[#1F3C4D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {isEditing ? (
                        <div className="flex-1 w-full space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-[#8C9BA5] uppercase font-bold">Nombre Comercial Corto</label>
                              <input
                                type="text"
                                value={editingCompany.shortName}
                                onChange={(e) => setEditingCompany({ ...editingCompany, shortName: e.target.value })}
                                className="w-full px-2.5 py-1.5 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-[#8C9BA5] uppercase font-bold">Razón Social Completa</label>
                              <input
                                type="text"
                                value={editingCompany.name}
                                onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                                className="w-full px-2.5 py-1.5 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-[#8C9BA5] uppercase font-bold">Código Institucional</label>
                              <input
                                type="text"
                                value={editingCompany.code}
                                onChange={(e) => setEditingCompany({ ...editingCompany, code: e.target.value })}
                                className="w-full px-2.5 py-1.5 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-[#8C9BA5] uppercase font-bold">Ruta del Logo</label>
                              <input
                                type="text"
                                value={editingCompany.logoPath}
                                onChange={(e) => setEditingCompany({ ...editingCompany, logoPath: e.target.value })}
                                className="w-full px-2.5 py-1.5 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="text-[10px] text-emerald-400 uppercase font-bold flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                <span>URL de Webmail Oficial (Asignado al Colaborador)</span>
                              </label>
                              <input
                                type="url"
                                value={editingCompany.webmailUrl || ''}
                                onChange={(e) => setEditingCompany({ ...editingCompany, webmailUrl: e.target.value })}
                                placeholder="https://webmail.empresa.com.ve"
                                className="w-full px-2.5 py-1.5 bg-[#061219] text-emerald-300 font-mono text-xs rounded-lg border border-[#1F3C4D] focus:border-emerald-500"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button onClick={() => setEditingCompany(null)} className="px-3 py-1 text-xs text-[#B4BCC8]">Cancelar</button>
                            <button onClick={() => handleSaveCompany(editingCompany)} className="px-3 py-1 bg-emerald-500 text-[#092332] font-bold text-xs rounded-lg flex items-center gap-1">
                              <Save className="w-3.5 h-3.5" /> Guardar Cambios
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 border border-white/20 shadow-sm">
                              <img src={comp.logoPath || '/logo-holding.png'} alt={comp.shortName} className="max-h-full max-w-full object-contain" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-white truncate">{comp.shortName}</h4>
                                <span className="text-[10px] bg-[#1A3441] text-[#CFCDBC] px-1.5 py-0.5 rounded font-mono">{comp.code}</span>
                              </div>
                              <p className="text-xs text-[#B4BCC8] truncate">{comp.name}</p>
                              <div className="flex items-center gap-3 mt-1 text-[11px]">
                                <span className="text-[10px] text-[#8C9BA5] font-mono">ID: {comp.id}</span>
                                <div className="flex items-center gap-1 text-emerald-400 font-mono">
                                  <Mail className="w-3 h-3 shrink-0" />
                                  <a href={comp.webmailUrl || '#'} target="_blank" rel="noreferrer" className="hover:underline truncate max-w-xs flex items-center gap-1">
                                    <span>{comp.webmailUrl || 'Webmail no configurado'}</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => setEditingCompany({ ...comp })}
                            className="px-3 py-1.5 rounded-lg bg-[#1F2E54] hover:bg-[#253966] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-amber-300" />
                            <span>Editar</span>
                          </button>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: DEPARTAMENTOS */}
          {activeTab === 'departments' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#B4BCC8]">Filtrar por Empresa:</span>
                  <select
                    value={selectedCompanyFilter}
                    onChange={(e) => setSelectedCompanyFilter(e.target.value)}
                    className="px-3 py-1.5 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                  >
                    <option value="all">Todas las Empresas ({departments.length})</option>
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.shortName}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setShowNewDept(!showNewDept)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#092332] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Nuevo Departamento</span>
                </button>
              </div>

              {/* Formulario Nuevo Departamento */}
              {showNewDept && (
                <form onSubmit={handleCreateDept} className="p-4 rounded-xl bg-[#0D2535] border border-[#1F3C4D] flex flex-col sm:flex-row items-center gap-3">
                  <select
                    value={newDeptCompany}
                    onChange={(e) => setNewDeptCompany(e.target.value)}
                    className="px-3 py-2 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D] w-full sm:w-48"
                  >
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.shortName}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Nombre del nuevo departamento..."
                    value={newDeptName}
                    onChange={(e) => setNewDeptName(e.target.value)}
                    className="flex-1 w-full px-3 py-2 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                    required
                  />
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button type="button" onClick={() => setShowNewDept(false)} className="px-3 py-1.5 text-xs text-[#B4BCC8]">Cancelar</button>
                    <button type="submit" className="px-4 py-1.5 bg-emerald-500 text-[#092332] font-bold text-xs rounded-lg">Guardar</button>
                  </div>
                </form>
              )}

              {/* Lista de Departamentos */}
              <div className="space-y-2">
                {filteredDepts.map((d) => {
                  const isEditing = editingDept?.id === d.id;
                  const companyName = companies.find(c => c.id === d.companyId)?.shortName || d.companyId;

                  return (
                    <div key={d.id} className="p-3 rounded-xl bg-[#0D2535] border border-[#1F3C4D] flex items-center justify-between gap-3">
                      {isEditing ? (
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={editingDept.name}
                            onChange={(e) => setEditingDept({ ...editingDept, name: e.target.value })}
                            className="flex-1 px-3 py-1.5 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                          />
                          <button onClick={() => handleSaveDept(editingDept)} className="px-3 py-1.5 bg-emerald-500 text-[#092332] font-bold text-xs rounded-lg">Guardar</button>
                          <button onClick={() => setEditingDept(null)} className="px-2 py-1.5 text-xs text-[#B4BCC8]">Cancelar</button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1A3441] text-[#CFCDBC] border border-[#40606E]/40 shrink-0">
                              {companyName}
                            </span>
                            <span className="text-xs font-semibold text-white truncate">{d.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => setEditingDept({ ...d })}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#CFCDBC] hover:text-white transition-colors"
                              title="Editar Departamento"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteDept(d.id, d.name)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors"
                              title="Eliminar Departamento"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORÍAS */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs text-[#B4BCC8]">
                  Gestiona las categorías de clasificación documental y cursos.
                </span>
                <button
                  onClick={() => setShowNewCat(!showNewCat)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#092332] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Nueva Categoría</span>
                </button>
              </div>

              {/* Formulario Nueva Categoría */}
              {showNewCat && (
                <form onSubmit={handleCreateCategory} className="p-4 rounded-xl bg-[#0D2535] border border-[#1F3C4D] space-y-3">
                  <input
                    type="text"
                    placeholder="Nombre de la categoría..."
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Descripción o alcance de la categoría..."
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                  />
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowNewCat(false)} className="px-3 py-1.5 text-xs text-[#B4BCC8]">Cancelar</button>
                    <button type="submit" className="px-4 py-1.5 bg-emerald-500 text-[#092332] font-bold text-xs rounded-lg">Guardar Categoría</button>
                  </div>
                </form>
              )}

              {/* Lista de Categorías */}
              <div className="space-y-2">
                {categories.map((c) => {
                  const isEditing = editingCategory?.id === c.id;
                  return (
                    <div key={c.id} className="p-3.5 rounded-xl bg-[#0D2535] border border-[#1F3C4D] flex items-center justify-between gap-3">
                      {isEditing ? (
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={editingCategory.name}
                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                            className="w-full px-3 py-1.5 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                          />
                          <input
                            type="text"
                            value={editingCategory.description || ''}
                            onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                            className="w-full px-3 py-1.5 bg-[#061219] text-white text-xs rounded-lg border border-[#1F3C4D]"
                          />
                          <div className="flex justify-end gap-2">
                            <button onClick={() => setEditingCategory(null)} className="px-3 py-1 text-xs text-[#B4BCC8]">Cancelar</button>
                            <button onClick={() => handleSaveCategory(editingCategory)} className="px-3 py-1 bg-emerald-500 text-[#092332] font-bold text-xs rounded-lg">Guardar</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white truncate">{c.name}</h4>
                              <span className="text-[10px] text-[#8C9BA5] font-mono">({c.id})</span>
                            </div>
                            <p className="text-[11px] text-[#B4BCC8] truncate mt-0.5">{c.description}</p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => setEditingCategory({ ...c })}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#CFCDBC] hover:text-white transition-colors"
                              title="Editar Categoría"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(c.id, c.name)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors"
                              title="Eliminar Categoría"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0D2535] border-t border-[#1A3441] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Todos los cambios se guardan y replican en MariaDB</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
