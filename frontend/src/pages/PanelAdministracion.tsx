import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../api/config';
import '../style/PanelAdministracion.css';

// ============================================
// TIPOS (TypeScript)
// ============================================

interface Proyecto {
  id: number;
  title: string;
  description: string;
  icon: string;
  image_url: string | null;
  project_url: string;
  is_active: boolean;
  created_at: string;
}

interface Pedido {
  id: number;
  name: string;
  telefono: string;
  coment: string;
  tipo_pedido: string;
  tipo_pago: string;
  status: 'en espera' | 'aceptado' | 'rechazado';
  stage: 'pendiente' | 'en desarrollo' | 'en produccion';
  is_deleted: boolean;
  created_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Array<{ path: string; message: string }>;
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const PanelAdministracion: React.FC = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'proyectos' | 'pedidos'>('proyectos');
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showProyectoModal, setShowProyectoModal] = useState<boolean>(false);
  const [editingProyecto, setEditingProyecto] = useState<Proyecto | null>(null);
  const [showPedidoModal, setShowPedidoModal] = useState<boolean>(false);
  const [editingPedido, setEditingPedido] = useState<Pedido | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/auth/dashboard`, {
          credentials: 'include',
        });
        if (res.status === 401) {
          navigate('/LoginPanelAdministracion2026');
          return;
        }
        if (!res.ok) throw new Error('Server error');
        setAuthChecked(true);
      } catch {
        setAuthChecked(true);
      }
    };
    checkSession();
  }, [navigate]);

  const getToken = (): string | null => {
    const match = document.cookie.match(/token=([^;]+)/);
    return match ? match[1] : null;
  };

  const apiRequest = async <T,>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    const token = getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (response.status === 401) {
      navigate('/LoginPanelAdministracion2026');
      throw new Error('Sesión expirada.');
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Error en la petición');
    }

    return data;
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchProyectos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRequest<Proyecto[]>('/portfolio');
      if (response.success) {
        setProyectos(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPedidos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRequest<Pedido[]>('/orders');
      if (response.success) {
        setPedidos(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'proyectos') {
      fetchProyectos();
    } else {
      fetchPedidos();
    }
  }, [activeTab, fetchProyectos, fetchPedidos]);

  const toggleProyectoActivo = async (id: number) => {
    try {
      const response = await apiRequest<Proyecto>(`/portfolio/${id}/toggle`, {
        method: 'PATCH',
      });
      if (response.success) {
        setProyectos(prev =>
          prev.map(p => (p.id === id ? response.data : p))
        );
        showNotification(
          `Proyecto ${response.data.is_active ? 'activado' : 'desactivado'} correctamente`,
          'success'
        );
      }
    } catch (err: any) {
      showNotification(err.message, 'error');
    }
  };

  const saveProyecto = async (proyectoData: Partial<Proyecto>) => {
    try {
      if (editingProyecto) {
        const response = await apiRequest<Proyecto>(`/portfolio/${editingProyecto.id}`, {
          method: 'PUT',
          body: JSON.stringify(proyectoData),
        });
        if (response.success) {
          setProyectos(prev =>
            prev.map(p => (p.id === editingProyecto.id ? response.data : p))
          );
          showNotification('Proyecto actualizado correctamente', 'success');
        }
      } else {
        const response = await apiRequest<Proyecto>('/portfolio', {
          method: 'POST',
          body: JSON.stringify(proyectoData),
        });
        if (response.success) {
          setProyectos(prev => [response.data, ...prev]);
          showNotification('Proyecto creado correctamente', 'success');
        }
      }
      setShowProyectoModal(false);
      setEditingProyecto(null);
    } catch (err: any) {
      showNotification(err.message, 'error');
    }
  };

  const updatePedido = async (id: number, updates: Partial<Pedido>) => {
    try {
      const response = await apiRequest<Pedido>(`/orders/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      if (response.success) {
        setPedidos(prev =>
          prev.map(p => (p.id === id ? response.data : p))
        );
        showNotification('Pedido actualizado correctamente', 'success');
      }
    } catch (err: any) {
      showNotification(err.message, 'error');
    }
  };

  const deletePedido = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este pedido?')) return;

    try {
      const response = await apiRequest<Pedido>(`/orders/${id}`, {
        method: 'DELETE',
      });
      if (response.success) {
        setPedidos(prev => prev.filter(p => p.id !== id));
        showNotification('Pedido eliminado correctamente', 'success');
      }
    } catch (err: any) {
      showNotification(err.message, 'error');
    }
  };

  if (!authChecked) {
    return <div className="loading">Verificando sesión...</div>;
  }

  return (
    <div className="panel-container">
      {/* Notificaciones */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Navegación por tabs */}
      <div className="tab-container">
        <button
          onClick={() => setActiveTab('proyectos')}
          className={`tab ${activeTab === 'proyectos' ? 'tab-active' : ''}`}
        >
          📁 Proyectos ({proyectos.length})
        </button>
        <button
          onClick={() => setActiveTab('pedidos')}
          className={`tab ${activeTab === 'pedidos' ? 'tab-active' : ''}`}
        >
          📋 Pedidos ({pedidos.length})
        </button>
      </div>

      {/* Contenido */}
      <main className="main-content">
        {loading ? (
          <div className="loading">Cargando...</div>
        ) : error ? (
          <div className="error-banner">❌ {error}</div>
        ) : activeTab === 'proyectos' ? (
          <ProyectosTab
            proyectos={proyectos}
            onToggleActivo={toggleProyectoActivo}
            onEdit={(proyecto) => {
              setEditingProyecto(proyecto);
              setShowProyectoModal(true);
            }}
            onCreate={() => {
              setEditingProyecto(null);
              setShowProyectoModal(true);
            }}
          />
        ) : (
          <PedidosTab
            pedidos={pedidos}
            onUpdate={updatePedido}
            onDelete={deletePedido}
            onEdit={(pedido) => {
              setEditingPedido(pedido);
              setShowPedidoModal(true);
            }}
          />
        )}
      </main>

      {/* Modal Proyecto */}
      {showProyectoModal && (
        <ProyectoModal
          proyecto={editingProyecto}
          onClose={() => {
            setShowProyectoModal(false);
            setEditingProyecto(null);
          }}
          onSave={saveProyecto}
        />
      )}

      {/* Modal Pedido */}
      {showPedidoModal && editingPedido && (
        <PedidoModal
          pedido={editingPedido}
          onClose={() => {
            setShowPedidoModal(false);
            setEditingPedido(null);
          }}
          onSave={(updates) => {
            updatePedido(editingPedido.id, updates);
            setShowPedidoModal(false);
            setEditingPedido(null);
          }}
        />
      )}
    </div>
  );
};

// ============================================
// SUB-COMPONENTE: TABLA DE PROYECTOS
// ============================================

interface ProyectosTabProps {
  proyectos: Proyecto[];
  onToggleActivo: (id: number) => void;
  onEdit: (proyecto: Proyecto) => void;
  onCreate: () => void;
}

const ProyectosTab: React.FC<ProyectosTabProps> = ({
  proyectos,
  onToggleActivo,
  onEdit,
  onCreate,
}) => {
  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">📁 Gestión de Proyectos</h2>
        <button onClick={onCreate} className="btn btn-primary">
          + Nuevo Proyecto
        </button>
      </div>

      {proyectos.length === 0 ? (
        <div className="empty-state">No hay proyectos registrados</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr className="table-header">
                <th>ID</th>
                <th>Icono</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>URL</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto) => (
                <tr key={proyecto.id} className="table-row">
                  <td>#{proyecto.id}</td>
                  <td>
                    <span className="project-icon">{proyecto.icon}</span>
                  </td>
                  <td>
                    <strong>{proyecto.title}</strong>
                  </td>
                  <td>
                    <span className="truncate">{proyecto.description}</span>
                  </td>
                  <td>
                    {proyecto.project_url ? (
                      <a
                        href={proyecto.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        Ver proyecto ↗
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => onToggleActivo(proyecto.id)}
                      className={`status-badge ${proyecto.is_active ? 'status-active' : 'status-inactive'}`}
                    >
                      {proyecto.is_active ? '✅ Activo' : '⏸️ Inactivo'}
                    </button>
                  </td>
                  <td>
                    {new Date(proyecto.created_at).toLocaleDateString('es-ES')}
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        onClick={() => onEdit(proyecto)}
                        className="btn btn-secondary btn-sm"
                      >
                        ✏️ Editar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ============================================
// SUB-COMPONENTE: TABLA DE PEDIDOS
// ============================================

interface PedidosTabProps {
  pedidos: Pedido[];
  onUpdate: (id: number, updates: Partial<Pedido>) => void;
  onDelete: (id: number) => void;
  onEdit: (pedido: Pedido) => void;
}

const PedidosTab: React.FC<PedidosTabProps> = ({ pedidos, onUpdate, onDelete, onEdit }) => {
  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">📋 Gestión de Pedidos</h2>
      </div>

      {pedidos.length === 0 ? (
        <div className="empty-state">No hay pedidos registrados</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr className="table-header">
                <th>ID</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Comentario</th>
                <th>Tipo Pedido</th>
                <th>Tipo Pago</th>
                <th>Estado</th>
                <th>Etapa</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id} className="table-row">
                  <td>#{pedido.id}</td>
                  <td>
                    <strong>{pedido.name}</strong>
                  </td>
                  <td>
                    {pedido.telefono}
                  </td>
                  <td>
                    <span className="truncate">{pedido.coment}</span>
                  </td>
                  <td>
                    {pedido.tipo_pedido}
                  </td>
                  <td>
                    {pedido.tipo_pago}
                  </td>
                  <td>
                    <select
                      value={pedido.status}
                      onChange={(e) =>
                        onUpdate(pedido.id, { status: e.target.value as Pedido['status'] })
                      }
                      className={`status-select status-${pedido.status.replace(/\s/g, '-')}`}
                    >
                      <option value="en espera">⏳ En espera</option>
                      <option value="aceptado">✅ Aceptado</option>
                      <option value="rechazado">❌ Rechazado</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={pedido.stage}
                      onChange={(e) =>
                        onUpdate(pedido.id, { stage: e.target.value as Pedido['stage'] })
                      }
                      className={`status-select stage-${pedido.stage.replace(/\s/g, '-')}`}
                    >
                      <option value="pendiente">📝 Pendiente</option>
                      <option value="en desarrollo">🛠️ En desarrollo</option>
                      <option value="en produccion">🚀 En producción</option>
                    </select>
                  </td>
                  <td>
                    {new Date(pedido.created_at).toLocaleDateString('es-ES')}
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        onClick={() => onEdit(pedido)}
                        className="btn btn-secondary btn-sm"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => onDelete(pedido.id)}
                        className="btn btn-danger btn-sm"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ============================================
// SUB-COMPONENTE: MODAL PROYECTO
// ============================================

interface ProyectoModalProps {
  proyecto: Proyecto | null;
  onClose: () => void;
  onSave: (data: Partial<Proyecto>) => void;
}

const ProyectoModal: React.FC<ProyectoModalProps> = ({ proyecto, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Proyecto>>({
    title: proyecto?.title || '',
    description: proyecto?.description || '',
    icon: proyecto?.icon || '🌐',
    image_url: proyecto?.image_url || '',
    project_url: proyecto?.project_url || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {proyecto ? '✏️ Editar Proyecto' : '➕ Nuevo Proyecto'}
          </h3>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Título *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descripción *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-input form-textarea"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Icono (emoji) *</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="form-input"
              placeholder="Ej: 🌐"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">URL de imagen</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="form-input"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="form-group">
            <label className="form-label">URL del proyecto *</label>
            <input
              type="url"
              value={formData.project_url}
              onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
              className="form-input"
              placeholder="https://midominio.com"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {proyecto ? 'Guardar Cambios' : 'Crear Proyecto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================
// SUB-COMPONENTE: MODAL PEDIDO
// ============================================

interface PedidoModalProps {
  pedido: Pedido;
  onClose: () => void;
  onSave: (data: Partial<Pedido>) => void;
}

const PedidoModal: React.FC<PedidoModalProps> = ({ pedido, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Pedido>>({
    name: pedido.name,
    telefono: pedido.telefono,
    coment: pedido.coment,
    tipo_pedido: pedido.tipo_pedido,
    tipo_pago: pedido.tipo_pago,
    status: pedido.status,
    stage: pedido.stage,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">✏️ Editar Pedido #{pedido.id}</h3>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Comentario</label>
            <textarea
              value={formData.coment}
              onChange={(e) => setFormData({ ...formData, coment: e.target.value })}
              className="form-input form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tipo de Pedido</label>
            <input
              type="text"
              value={formData.tipo_pedido}
              onChange={(e) => setFormData({ ...formData, tipo_pedido: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tipo de Pago</label>
            <input
              type="text"
              value={formData.tipo_pago}
              onChange={(e) => setFormData({ ...formData, tipo_pago: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group form-group-half">
              <label className="form-label">Estado</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Pedido['status'] })}
                className="form-input"
              >
                <option value="en espera">⏳ En espera</option>
                <option value="aceptado">✅ Aceptado</option>
                <option value="rechazado">❌ Rechazado</option>
              </select>
            </div>

            <div className="form-group form-group-half">
              <label className="form-label">Etapa</label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value as Pedido['stage'] })}
                className="form-input"
              >
                <option value="pendiente">📝 Pendiente</option>
                <option value="en desarrollo">🛠️ En desarrollo</option>
                <option value="en produccion">🚀 En producción</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PanelAdministracion;
