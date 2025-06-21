  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este time?')) return;
    try {
      await fetch(apiUrl + id + '/', { method: 'DELETE' });
      fetchTeams();
    } catch {}
  };
import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTeam, setNewTeam] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const apiUrl = window.location.hostname.includes('localhost')
    ? 'http://localhost:8000/api/teams/'
    : 'https://super-fishstick-8000.app.github.dev/api/teams/';

  const fetchTeams = () => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(() => setTeams([]));
  };

  useEffect(() => {
    fetchTeams();
    // eslint-disable-next-line
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
    setNewTeam('');
    setError('');
    setSuccess('');
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setError('');
    setSuccess('');
  };
  const handleInputChange = (e) => {
    setNewTeam(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (!newTeam.trim()) {
      setError('O nome do time é obrigatório.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTeam })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erro ao adicionar time.');
      } else {
        setSuccess('Time adicionado com sucesso!');
        setNewTeam('');
        fetchTeams();
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
                <i className="bi bi-people text-info me-2"></i>
                Times Octofit
                <i className="bi bi-flag-fill text-info ms-2"></i>
              </h2>
              <table className="table table-hover align-middle text-center sport-table">
                <thead className="table-primary">
                  <tr>
                    <th className="fs-5">🏆 Nome do Time</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map(team => (
                    <tr key={team.id} className="sport-row">
                      <td className="fw-semibold text-uppercase text-primary">{team.name}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" title="Excluir" onClick={() => handleDelete(team.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-3">
                <button className="btn btn-info btn-lg px-4 shadow-sm sport-btn" onClick={handleShowModal}>
                  <i className="bi bi-plus-circle me-2"></i>Adicionar Novo Time
                </button>
              </div>
              {/* Modal Bootstrap */}
              {showModal && (
                <div className="modal fade show" style={{display:'block'}} tabIndex="-1" role="dialog">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header bg-info text-white">
                        <h5 className="modal-title"><i className="bi bi-plus-circle me-2"></i>Adicionar Novo Time</h5>
                        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleCloseModal}></button>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label htmlFor="teamName" className="form-label">Nome do Time</label>
                            <input type="text" className="form-control" id="teamName" value={newTeam} onChange={handleInputChange} autoFocus />
                          </div>
                          {error && <div className="alert alert-danger py-2">{error}</div>}
                          {success && <div className="alert alert-success py-2">{success}</div>}
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={handleCloseModal} disabled={loading}>Cancelar</button>
                          <button type="submit" className="btn btn-info" disabled={loading}>
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
export default Teams;
