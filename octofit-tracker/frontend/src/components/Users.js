  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;
    try {
      await fetch(apiUrl + id + '/', { method: 'DELETE' });
      fetchUsers();
    } catch {}
  };
import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const apiUrl = window.location.hostname.includes('localhost')
    ? 'http://localhost:8000/api/users/'
    : 'https://super-fishstick-8000.app.github.dev/api/users/';

  const fetchUsers = () => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setUsers([]));
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
    setNewUser({ name: '', email: '' });
    setError('');
    setSuccess('');
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setError('');
    setSuccess('');
  };
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (!newUser.name.trim() || !newUser.email.trim()) {
      setError('Nome e email são obrigatórios.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erro ao adicionar usuário.');
      } else {
        setSuccess('Usuário adicionado com sucesso!');
        setNewUser({ name: '', email: '' });
        fetchUsers();
        setTimeout(() => {
          setShowModal(false);
          setSuccess('');
        }, 1000);
      }
    } catch (err) {
      setError('Erro de conexão.');
    }
    setLoading(false);
  };
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow border-0 bg-light sport-card">
            <div className="card-body">
              <h2 className="mb-4 display-5 text-center text-primary fw-bold" style={{letterSpacing: '2px'}}>
                <i className="bi bi-people-fill text-success me-2"></i>
                Usuários Octofit
                <i className="bi bi-person-badge-fill text-success ms-2"></i>
              </h2>
              <table className="table table-hover align-middle text-center sport-table">
                <thead className="table-primary">
                  <tr>
                    <th className="fs-5">👤 Nome</th>
                    <th className="fs-5">✉️ Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="sport-row">
                      <td className="fw-semibold text-uppercase text-success">{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" title="Excluir" onClick={() => handleDelete(user.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-3">
                <button className="btn btn-success btn-lg px-4 shadow-sm sport-btn" onClick={handleShowModal}>
                  <i className="bi bi-plus-circle me-2"></i>Adicionar Novo Usuário
                </button>
              </div>
              {/* Modal Bootstrap */}
              {showModal && (
                <div className="modal fade show" style={{display:'block'}} tabIndex="-1" role="dialog">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header bg-success text-white">
                        <h5 className="modal-title"><i className="bi bi-plus-circle me-2"></i>Adicionar Novo Usuário</h5>
                        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleCloseModal}></button>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="userName" name="name" value={newUser.name} onChange={handleInputChange} autoFocus />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="userEmail" className="form-label">Email</label>
                            <input type="email" className="form-control" id="userEmail" name="email" value={newUser.email} onChange={handleInputChange} />
                          </div>
                          {error && <div className="alert alert-danger py-2">{error}</div>}
                          {success && <div className="alert alert-success py-2">{success}</div>}
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={handleCloseModal} disabled={loading}>Cancelar</button>
                          <button type="submit" className="btn btn-success" disabled={loading}>
                            {loading ? 'Adicionando...' : 'Adicionar'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* Backdrop */}
                  <div className="modal-backdrop fade show"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .sport-card {
          border-radius: 1.5rem;
          background: linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%);
        }
        .sport-table th {
          background: #1976d2;
          color: #fff;
        }
        .sport-row td {
          font-size: 1.2rem;
          letter-spacing: 1px;
        }
        .sport-btn {
          background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
          border: none;
        }
        .sport-btn:disabled {
          opacity: 0.7;
        }
        .modal-backdrop {
          z-index: 1040;
        }
        .modal {
          z-index: 1050;
        }
      `}</style>
    </div>
  );
}
export default Users;
