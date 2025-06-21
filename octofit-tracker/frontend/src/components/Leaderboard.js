import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEntry, setNewEntry] = useState({ name: '', score: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const apiUrl = window.location.hostname.includes('localhost')
    ? 'http://localhost:8000/api/leaderboard/'
    : 'https://super-fishstick-8000.app.github.dev/api/leaderboard/';

  const fetchLeaderboard = () => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setLeaderboard(data))
      .catch(() => setLeaderboard([]));
  };

  useEffect(() => {
    fetchLeaderboard();
    // eslint-disable-next-line
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
    setNewEntry({ name: '', score: '' });
    setError('');
    setSuccess('');
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setError('');
    setSuccess('');
  };
  const handleInputChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (!newEntry.name.trim() || !newEntry.score.trim()) {
      setError('Nome e pontuação são obrigatórios.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newEntry.name, score: newEntry.score })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erro ao adicionar ao leaderboard.');
      } else {
        setSuccess('Adicionado com sucesso!');
        setNewEntry({ name: '', score: '' });
        fetchLeaderboard();
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
  // Exclusão
  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return;
    try {
      await fetch(apiUrl + id + '/', { method: 'DELETE' });
      fetchLeaderboard();
    } catch {}
  };
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow border-0 bg-light sport-card">
            <div className="card-body">
              <h2 className="mb-4 display-5 text-center text-primary fw-bold" style={{letterSpacing: '2px'}}>
                <i className="bi bi-bar-chart-line-fill text-warning me-2"></i>
                Leaderboard Octofit
                <i className="bi bi-award-fill text-warning ms-2"></i>
              </h2>
              <table className="table table-hover align-middle text-center sport-table">
                <thead className="table-primary">
                  <tr>
                    <th className="fs-5">🥇 Nome</th>
                    <th className="fs-5">🏅 Pontuação</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map(entry => (
                    <tr key={entry.id} className="sport-row">
                      <td className="fw-semibold text-uppercase text-warning">{entry.name}</td>
                      <td className="fw-bold text-dark">{entry.score}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" title="Excluir" onClick={() => handleDelete(entry.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-3">
                <button className="btn btn-warning btn-lg px-4 shadow-sm sport-btn" onClick={handleShowModal}>
                  <i className="bi bi-plus-circle me-2"></i>Adicionar ao Leaderboard
                </button>
              </div>
              {/* Modal Bootstrap */}
              {showModal && (
                <div className="modal fade show" style={{display:'block'}} tabIndex="-1" role="dialog">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header bg-warning text-white">
                        <h5 className="modal-title"><i className="bi bi-plus-circle me-2"></i>Adicionar ao Leaderboard</h5>
                        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleCloseModal}></button>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label htmlFor="entryName" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="entryName" name="name" value={newEntry.name} onChange={handleInputChange} autoFocus />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="entryScore" className="form-label">Pontuação</label>
                            <input type="number" className="form-control" id="entryScore" name="score" value={newEntry.score} onChange={handleInputChange} />
                          </div>
                          {error && <div className="alert alert-danger py-2">{error}</div>}
                          {success && <div className="alert alert-success py-2">{success}</div>}
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={handleCloseModal} disabled={loading}>Cancelar</button>
                          <button type="submit" className="btn btn-warning" disabled={loading}>
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
export default Leaderboard;
