import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Building,
  Mail,
  Phone,
  Shield,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
  Layers
} from 'lucide-react';

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

export default function UsersSection({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState({ text: '', type: '' });

  // Form states for creating a new user
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('Valle2026*');
  const [newRole, setNewRole] = useState('Colaborador Fiduciario');
  const [newDivision, setNewDivision] = useState('corp');
  const [newDepartment, setNewDepartment] = useState('Gobernanza, Legal & Cumplimiento');
  const [customDepartment, setCustomDepartment] = useState('');
  const [newPhone, setNewPhone] = useState('+58 (241) 850-');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar usuarios de MariaDB
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Actualizar departamentos sugeridos al cambiar la división
  const handleDivisionChange = (div) => {
    setNewDivision(div);
    const available = corporateDepartments[div] || [];
    if (available.length > 0) {
      setNewDepartment(available[0]);
    }
    setCustomDepartment('');
  };

  // Crear nuevo usuario en MariaDB
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newFullName || !newEmail || !newPassword) {
      setFeedbackMsg({ text: 'Por favor complete los campos obligatorios.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    const finalDepartment = customDepartment.trim() || newDepartment;

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-name': currentUser?.name || 'Super Administrador'
        },
        body: JSON.stringify({
          name: newFullName.trim(),
          email: newEmail.trim().toLowerCase(),
          password: newPassword,
          role: newRole,
          division: newDivision,
          department: finalDepartment,
          phone: newPhone
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al crear usuario.');
      }

      setUsers(prev => [data.user, ...prev]);
      setShowCreateModal(false);
      setFeedbackMsg({ text: `Usuario ${data.user.email} registrado y activado en MariaDB con éxito.`, type: 'success' });

      // Limpiar formulario
      setNewFullName('');
      setNewEmail('');
      setNewPassword('Valle2026*');
      setCustomDepartment('');
      setTimeout(() => setFeedbackMsg({ text: '', type: '' }), 4000);
    } catch (err) {
      setFeedbackMsg({ text: err.message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Eliminar usuario
  const handleDeleteUser = async (userId, userEmail) => {
    if (!confirm(`¿Está seguro de revocar el acceso y eliminar al usuario ${userEmail}?`)) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'x-user-name': currentUser?.name || 'Super Administrador'
        }
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'No se pudo eliminar el usuario.');

      setUsers(prev => prev.filter(u => u.id !== userId));
      setFeedbackMsg({ text: `Usuario ${userEmail} revocado correctamente de la base de datos.`, type: 'success' });
      setTimeout(() => setFeedbackMsg({ text: '', type: '' }), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  // Filtrado de usuarios
  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.department && u.department.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDivision = divisionFilter === 'all' || u.division === divisionFilter;

    return matchesSearch && matchesDivision;
  });

  return (
    <div className="space-y-6 font-montserrat">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#CFCDBC]">
        <div>
          <h2 className="text-2xl font-black text-[#092332] tracking-tight">
            Gestión y Control de Usuarios
          </h2>
          <p className="text-xs text-[#40606E] mt-0.5">
            Administración centralizada de cuentas de colaboradores y accesos por empresa y departamento.
          </p>
        </div>

        {/* Botón Destacado: Crear Nuevo Usuario */}
        <button
          onClick={() => setShowCreateModal(true)}
          style={{ backgroundColor: '#1F2E54', color: '#FFFFFF' }}
          className="px-5 py-2.5 bg-[#1F2E54] hover:bg-[#092332] !text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4 text-white" />
          <span>Crear Nuevo Usuario</span>
        </button>
      </div>

      {feedbackMsg.text && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
          feedbackMsg.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {feedbackMsg.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#CFCDBC] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Buscador */}
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#73787c]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, correo o departamento..."
            className="w-full h-10 pl-10 pr-4 bg-[#FBFBF5] text-[#092332] text-xs font-medium rounded-xl border border-[#CFCDBC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20"
          />
        </div>

        {/* Filtro por Empresa / Unidad de Negocio */}
        <div className="flex items-center bg-[#FBFBF5] rounded-xl border border-[#CFCDBC] px-3 h-10 w-full sm:w-auto">
          <Building className="w-3.5 h-3.5 text-[#40606E] mr-2" />
          <select
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="bg-transparent text-xs font-semibold text-[#092332] focus:outline-none cursor-pointer"
          >
            <option value="all">Todas las Empresas (Holding)</option>
            <option value="corp">Corporativo General – Casa Matriz</option>
            <option value="cerezera">Inversiones Cerezera S.A.</option>
            <option value="america">Radio América Multimedios</option>
            <option value="daleo">Daleo Desarrollos Inmobiliarios</option>
            <option value="advision">Advision Publicidad y Medios</option>
          </select>
        </div>
      </div>

      {/* Tabla de Usuarios Registrados en MariaDB */}
      <div className="bg-white rounded-2xl border border-[#CFCDBC] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FBFBF5] text-[#092332] font-bold uppercase tracking-wider border-b border-[#CFCDBC]">
              <tr>
                <th className="py-3.5 px-4">Colaborador / Correo</th>
                <th className="py-3.5 px-4">Empresa</th>
                <th className="py-3.5 px-4">Departamento</th>
                <th className="py-3.5 px-4">Rol Asignado</th>
                <th className="py-3.5 px-4">Seguridad</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FBFBF5] text-[#40606E]">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-xs text-edv-steel">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1F2E54]" />
                    <span>Cargando usuarios desde la base de datos...</span>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-xs text-edv-steel">
                    No se encontraron usuarios registrados con los criterios seleccionados.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#FBFBF5] transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#092332]">{u.name}</div>
                      <div className="text-[11px] text-[#73787c]">{u.email}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#092332]">
                      {u.divisionName || u.division}
                    </td>
                    <td className="py-3 px-4 text-[#40606E] font-medium">
                      {u.department || 'Gobernanza General'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        u.role === 'Super Administrador'
                          ? 'bg-[#1F2E54] text-white border-[#1F2E54]'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-emerald-700">
                      ISO 27001
                    </td>
                    <td className="py-3 px-4 text-right">
                      {u.email !== 'admin@empresasdelvalle.com.ve' ? (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.email)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                          title="Revocar acceso"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Principal
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Crear Nuevo Usuario */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#CFCDBC] animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#CFCDBC]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1F2E54] text-white flex items-center justify-center shadow-sm">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#092332]">Crear Nuevo Usuario</h3>
                  <p className="text-xs text-[#40606E]">Alta de cuenta autorizada en la base de datos MariaDB</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="mt-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#092332] block">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="Ej. Roberto Gómez Cerezera"
                  className="w-full h-10 px-3.5 bg-[#FBFBF5] text-[#092332] rounded-xl border border-[#CFCDBC] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#092332] block">Correo Corporativo *</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="usuario@empresasdelvalle.com.ve"
                    className="w-full h-10 px-3.5 bg-[#FBFBF5] text-[#092332] rounded-xl border border-[#CFCDBC] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#092332] block">Contraseña Inicial *</label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-10 px-3.5 bg-[#FBFBF5] text-[#092332] rounded-xl border border-[#CFCDBC] font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20"
                  />
                </div>
              </div>

              {/* Selección de Empresa y Departamento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#092332] block">Empresa / Unidad de Negocio *</label>
                  <select
                    value={newDivision}
                    onChange={(e) => handleDivisionChange(e.target.value)}
                    className="w-full h-10 px-3 bg-[#FBFBF5] text-[#092332] rounded-xl border border-[#CFCDBC] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20 cursor-pointer"
                  >
                    <option value="corp">Corporativo General – Casa Matriz</option>
                    <option value="cerezera">Inversiones Cerezera S.A.</option>
                    <option value="america">Radio América Multimedios</option>
                    <option value="daleo">Daleo Desarrollos Inmobiliarios</option>
                    <option value="advision">Advision Publicidad y Medios</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#092332] block">Departamento Sugerido *</label>
                  <select
                    value={newDepartment}
                    onChange={(e) => {
                      setNewDepartment(e.target.value);
                      setCustomDepartment('');
                    }}
                    className="w-full h-10 px-3 bg-[#FBFBF5] text-[#092332] rounded-xl border border-[#CFCDBC] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20 cursor-pointer"
                  >
                    {(corporateDepartments[newDivision] || []).map((dept, i) => (
                      <option key={i} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Opción de Departamento Personalizado desde cero */}
              <div className="space-y-1">
                <label className="font-semibold text-[#40606E] block text-[11px]">
                  O ingrese un departamento personalizado desde cero (opcional):
                </label>
                <input
                  type="text"
                  value={customDepartment}
                  onChange={(e) => setCustomDepartment(e.target.value)}
                  placeholder="Ej. Auditoría Forense y Riesgos Especiales"
                  className="w-full h-9 px-3 bg-[#FBFBF5] text-[#092332] rounded-lg border border-[#CFCDBC] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#092332] block">Rol de Acceso *</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full h-10 px-3 bg-[#FBFBF5] text-[#092332] rounded-xl border border-[#CFCDBC] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20 cursor-pointer"
                  >
                    <option value="Colaborador Fiduciario">Colaborador Fiduciario (Estándar)</option>
                    <option value="Administrador de División">Administrador de División</option>
                    <option value="Auditor de Cumplimiento">Auditor de Cumplimiento ISO</option>
                    <option value="Super Administrador">Super Administrador</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#092332] block">Teléfono / Extensión</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+58 (241) 850-8255"
                    className="w-full h-10 px-3.5 bg-[#FBFBF5] text-[#092332] rounded-xl border border-[#CFCDBC] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F2E54]/20"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#CFCDBC] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#CFCDBC] text-[#40606E] hover:bg-gray-100 font-bold uppercase tracking-wider"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: '#1F2E54', color: '#FFFFFF' }}
                  className="px-5 py-2.5 bg-[#1F2E54] hover:bg-[#092332] !text-white font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <UserPlus className="w-4 h-4 text-white" />}
                  <span>Registrar en MariaDB</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
