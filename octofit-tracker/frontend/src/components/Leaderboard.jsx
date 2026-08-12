import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeRecords } from '../utils/api';

function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getApiBaseUrl()}/leaderboard/`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setRows(normalizeRecords(payload));
        setError('');
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard.');
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h2 className="h4 mb-0">Leaderboard</h2>
      </div>
      <div className="card-body p-0">
        {rows.length === 0 ? (
          <div className="p-3 text-muted">No leaderboard entries available.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((entry, index) => (
                  <tr key={entry._id || entry.id || `${entry.userId?.name || 'user'}-${index}`}>
                    <td>{entry.rank ?? index + 1}</td>
                    <td>{entry.userId?.name || entry.user || 'Unknown user'}</td>
                    <td>{entry.teamId?.name || entry.team || 'Unknown team'}</td>
                    <td>{entry.score ?? entry.points ?? 0}</td>
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

export default Leaderboard;
