import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3" to="/">Octofit</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/users">Usuários</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Times</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/activities">Atividades</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Treinos</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={
            <div className="card text-center">
              <div className="card-body">
                <h1 className="display-4 mb-3">Bem-vindo ao <span className="text-primary">Octofit</span>!</h1>
                <p className="lead">Acompanhe treinos, atividades, times e o ranking dos alunos de Mergington High School.</p>
                <Link to="/users" className="btn btn-primary m-2">Ver Usuários</Link>
                <Link to="/teams" className="btn btn-secondary m-2">Ver Times</Link>
                <Link to="/activities" className="btn btn-success m-2">Ver Atividades</Link>
                <Link to="/leaderboard" className="btn btn-warning m-2">Ver Leaderboard</Link>
                <Link to="/workouts" className="btn btn-info m-2">Ver Treinos</Link>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
