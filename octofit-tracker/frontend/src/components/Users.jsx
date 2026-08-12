import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeRecords } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const codespaceApiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
  const fallbackApiUrl = 'http://localhost:8000/api/users/';

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(import.meta.env.VITE_CODESPACE_NAME ? codespaceApiUrl : fallbackApiUrl);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setUsers(normalizeRecords(payload));
        setError('');
      } catch (err) {
        setError(err.message || 'Unable to load users.');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading users...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h2 className="h4 mb-0">Users</h2>
      </div>
      <div className="card-body p-0">
        {users.length === 0 ? (
          <div className="p-3 text-muted">No users available.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Team</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.id || `${user.name}-${user.email}`}>
                    <td>{user.name || 'Unnamed user'}</td>
                    <td>{user.email || 'N/A'}</td>
                    <td>{user.teamName || user.teamId?.name || 'Unassigned'}</td>
                    <td>{user.points ?? user.totalPoints ?? 0}</td>
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

export default Users;
