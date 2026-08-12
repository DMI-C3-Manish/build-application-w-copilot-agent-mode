import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Home() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-uppercase small text-primary fw-semibold mb-2">Octofit Tracker</p>
              <h1 className="display-6 mb-3">Fitness performance dashboard</h1>
              <p className="text-secondary mb-3">
                Track users, team progress, workouts, and leaderboard activity from the backend API.
              </p>
              <div className="alert alert-light border mb-0">
                <strong>API base:</strong>{' '}
                {codespaceName ? `https://${codespaceName}-8000.app.github.dev/api` : 'http://localhost:8000/api'}
              </div>
            </div>
          </div>
        </div>

        {navItems.slice(1).map((item) => (
          <div key={item.to} className="col-md-6 col-xl-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">
                <h2 className="h5 mb-2">{item.label}</h2>
                <p className="text-secondary flex-grow-1 mb-3">
                  Review the latest {item.label.toLowerCase()} data from the Octofit backend.
                </p>
                <NavLink className="btn btn-primary" to={item.to}>
                  Open {item.label}
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">Octofit Tracker</span>
          <div className="navbar-nav ms-auto flex-row flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded ${isActive ? 'bg-primary-subtle text-white' : 'text-light'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
