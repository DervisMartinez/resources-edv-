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
    <div className="space-y-5 font-montserrat select-none text-white">
      {/* Encabezado estilo macOS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#142C3B]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Gestión y Control de Usuarios
          </h2>
          <p className="text-[12px] text-[#8C9BA5] mt-0.5">
            Directorio corporativo y control de accesos por filial y departamento en MariaDB.
          </p>
        </div>

        {/* Botón macOS Push Button: Crear Nuevo Usuario */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="h-8 px-3.5 bg-emerald-500 hover:bg-emerald-400 text-[#092332] text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-3.5 h-3.5 text-[#092332]" />
          <span>+ Nuevo Colaborador</span>
        </button>
      </div>

      {feedbackMsg.text && (
        <div className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
          feedbackMsg.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-red-500/20 border border-red-500/40 text-red-300'
        }`}>
          {feedbackMsg.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Barra de Filtros y Búsqueda estilo macOS Toolbar */}
      <div className="bg-[#0D2535] p-2.5 sm:p-3 rounded-xl border border-[#1F3C4D] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Buscador Inset */}
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C9BA5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar colaborador por nombre, correo o departamento..."
            className="w-full h-8 pl-8 pr-4 bg-[#091E2A] text-white placeholder:text-[#8C9BA5] text-xs font-medium rounded-lg border border-[#1F3C4D] focus:border-[#40606E] focus:outline-none focus:ring-1 focus:ring-[#CFCDBC]/20"
          />
        </div>

        {/* Filtro por Empresa */}
        <div className="flex items-center bg-[#091E2A] rounded-lg border border-[#1F3C4D] px-2.5 h-8 w-full sm:w-auto">
          <Building className="w-3.5 h-3.5 text-[#8C9BA5] mr-1.5" />
          <select
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="bg-transparent text-[11px] font-semibold text-[#B4BCC8] focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-[#091E2A] text-white">Todas las Empresas (Holding)</option>
            <option value="corp" className="bg-[#091E2A] text-white">Corporativo General – Casa Matriz</option>
            <option value="cerezera" className="bg-[#091E2A] text-white">Inversiones Cerezera S.A.</option>
            <option value="america" className="bg-[#091E2A] text-white">Radio América Multimedios</option>
            <option value="daleo" className="bg-[#091E2A] text-white">Daleo Desarrollos Inmobiliarios</option>
            <option value="advision" className="bg-[#091E2A] text-white">Advision Publicidad y Medios</option>
            <option value="vallealto" className="bg-[#091E2A] text-white">Desarrollos Valle Alto</option>
          </select>
        </div>
      </div>

      {/* Tabla de Usuarios Registrados en MariaDB estilo macOS List */}
      <div className="bg-[#0D2535] rounded-xl border border-[#1F3C4D] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#091E2A] text-[#8C9BA5] font-semibold uppercase tracking-wider border-b border-[#1F3C4D] text-[10px]">
              <tr>
                <th className="py-2.5 px-3.5">Colaborador / Correo</th>
                <th className="py-2.5 px-3.5">Empresa</th>
                <th className="py-2.5 px-3.5">Departamento</th>
                <th className="py-2.5 px-3.5">Rol Asignado</th>
                <th className="py-2.5 px-3.5">Seguridad</th>
                <th className="py-2.5 px-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F3C4D]/60 text-white">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-xs text-[#8C9BA5]">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-400" />
                    <span>Consultando directorio fiduciario en MariaDB...</span>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-xs text-[#8C9BA5]">
                    No se encontraron colaboradores registrados con los criterios seleccionados.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-3.5">
                      <div className="font-semibold text-white text-[13px]">{u.name}</div>
                      <div className="text-[11px] text-[#8C9BA5]">{u.email}</div>
                    </td>
                    <td className="py-2.5 px-3.5 font-semibold text-emerald-400 text-[12px]">
                      {u.divisionName || u.division}
                    </td>
                    <td className="py-2.5 px-3.5 text-[#B4BCC8] font-medium text-[12px]">
                      {u.department || 'Gobernanza General'}
                    </td>
                    <td className="py-2.5 px-3.5">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.2 rounded-md border ${
                        u.role === 'Super Administrador'
                          ? 'bg-[#1F2E54] text-white border-white/20'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5 font-mono text-[11px] text-emerald-400">
                      ISO 27001
                    </td>
                    <td className="py-2.5 px-3.5 text-right">
                      {u.email !== 'admin@empresasdelvalle.com.ve' ? (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.email)}
                          className="p-1.5 rounded-md text-rose-400 hover:text-white hover:bg-rose-500/20 transition-colors cursor-pointer"
                          title="Revocar acceso"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.2 rounded-md border border-amber-500/40">
                          Super Admin
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

      {/* Modal para Crear Nuevo Usuario estilo macOS Sheet Dialog */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#092332] text-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#1F3C4D] animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#1A3441]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1F2E54] text-white flex items-center justify-center border border-white/20 shadow-xs">
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Alta de Nuevo Colaborador</h3>
                  <p className="text-[11px] text-[#8C9BA5]">Registro seguro en MariaDB</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-[#8C9BA5] hover:text-white rounded-md hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="mt-4 space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-white text-[12px] block">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="Ej. Carlos Mendoza"
                  className="w-full h-8 px-3 bg-[#0D2535] text-white rounded-lg border border-[#1F3C4D] font-medium focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-white text-[12px] block">Correo Corporativo *</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="usuario@empresasdelvalle.com.ve"
                    className="w-full h-8 px-3 bg-[#0D2535] text-white rounded-lg border border-[#1F3C4D] font-medium focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-white text-[12px] block">Contraseña Inicial *</label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-8 px-3 bg-[#0D2535] text-white rounded-lg border border-[#1F3C4D] font-medium font-mono focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-white text-[12px] block">Filial / Empresa *</label>
                  <select
                    value={newDivision}
                    onChange={(e) => handleDivisionChange(e.target.value)}
                    className="w-full h-8 px-2.5 bg-[#0D2535] text-white rounded-lg border border-[#1F3C4D] font-medium focus:outline-none focus:ring-1 focus:ring-emerald-400/40 cursor-pointer"
                  >
                    <option value="corp">Holding Del Valle (Casa Matriz)</option>
                    <option value="cerezera">Inversiones Cerezera</option>
                    <option value="america">Radio América 95.5 FM</option>
                    <option value="daleo">Daleo Construcciones</option>
                    <option value="advision">Advision DOOH</option>
                    <option value="vallealto">Desarrollos Valle Alto</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-white text-[12px] block">Rol Asignado *</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full h-8 px-2.5 bg-[#0D2535] text-white rounded-lg border border-[#1F3C4D] font-medium focus:outline-none focus:ring-1 focus:ring-emerald-400/40 cursor-pointer"
                  >
                    <option value="Colaborador Fiduciario">Colaborador Fiduciario</option>
                    <option value="Super Administrador">Super Administrador</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-white text-[12px] block">Departamento Oficial *</label>
                <select
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  className="w-full h-8 px-2.5 bg-[#0D2535] text-white rounded-lg border border-[#1F3C4D] font-medium focus:outline-none focus:ring-1 focus:ring-emerald-400/40 cursor-pointer"
                >
                  {(corporateDepartments[newDivision] || []).map((dept, idx) => (
                    <option key={idx} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Botones de acción macOS Sheet (Cancel a la izquierda, Confirm a la derecha) */}
              <div className="pt-3 border-t border-[#1A3441] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="h-8 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-[#CFCDBC] text-xs font-medium border border-white/10 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-8 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#092332] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Guardar en MariaDB</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
