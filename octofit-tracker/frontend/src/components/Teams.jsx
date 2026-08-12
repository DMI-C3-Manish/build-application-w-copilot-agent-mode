import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeRecords } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const codespaceApiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
  const fallbackApiUrl = 'http://localhost:8000/api/teams/';

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const response = await fetch(import.meta.env.VITE_CODESPACE_NAME ? codespaceApiUrl : fallbackApiUrl);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeRecords(payload));
        setError('');
      } catch (err) {
        setError(err.message || 'Unable to load teams.');
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading teams...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h2 className="h4 mb-0">Teams</h2>
      </div>
      <div className="card-body p-0">
        {teams.length === 0 ? (
          <div className="p-3 text-muted">No teams available.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Members</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team._id || team.id || team.name}>
                    <td>{team.name || 'Unnamed team'}</td>
                    <td>{Array.isArray(team.members) ? team.members.length : team.memberCount ?? 0}</td>
                    <td>{team.description || 'No description provided.'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
