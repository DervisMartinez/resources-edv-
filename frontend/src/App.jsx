import React, { useState, useEffect } from 'react';
import LoginView from './components/auth/LoginView.jsx';
import DashboardView from './components/DashboardView.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#092332] text-white flex flex-col items-center justify-center p-6 text-center font-montserrat">
          <div className="max-w-md w-full bg-[#0D2535] p-8 rounded-2xl border border-[#1F3C4D] shadow-2xl space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl font-bold">
              ⚠️
            </div>
            <h2 className="text-xl font-black text-white">Aviso de Interfaz Fiduciaria</h2>
            <p className="text-xs text-[#B4BCC8] leading-relaxed">
              {this.state.error?.message || 'Error inesperado al renderizar los módulos corporativos.'}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  localStorage.removeItem('edv_active_user');
                  window.location.reload();
                }}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#092332] font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
              >
                Ir a Pantalla de Acceso
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Recargar Aplicación
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('edv_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [resources, setResources] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [stats, setStats] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial load
  const fetchData = async () => {
    try {
      // Divisions
      const divRes = await fetch('/api/divisions');
      if (divRes.ok) {
        const divs = await divRes.json();
        setDivisions(divs);
      }

      // Resources
      const resRes = await fetch('/api/resources');
      if (resRes.ok) {
        const resList = await resRes.json();
        setResources(resList);
      }

      // Stats
      const statRes = await fetch('/api/stats');
      if (statRes.ok) {
        const statData = await statRes.json();
        setStats(statData);
      }

      // Audit Logs
      const auditRes = await fetch('/api/audit-logs');
      if (auditRes.ok) {
        const logs = await auditRes.json();
        setAuditLogs(logs);
      }
    } catch (err) {
      console.log('Using local client state for initial load');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('edv_active_user', JSON.stringify(user));
    fetchData(); // Refresh data with new user context
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('edv_active_user');
  };

  return (
    <ErrorBoundary>
      <div className="font-['Montserrat'] min-h-screen">
        {!currentUser ? (
          <LoginView onLogin={handleLogin} divisions={divisions} />
        ) : (
          <DashboardView
            currentUser={currentUser}
            onLogout={handleLogout}
            resources={resources}
            setResources={setResources}
            divisions={divisions}
            stats={stats}
            auditLogs={auditLogs}
            refreshResources={fetchData}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
