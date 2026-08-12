import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeRecords } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const codespaceApiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
  const fallbackApiUrl = 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch(import.meta.env.VITE_CODESPACE_NAME ? codespaceApiUrl : fallbackApiUrl);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeRecords(payload));
        setError('');
      } catch (err) {
        setError(err.message || 'Unable to load workouts.');
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading workouts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h2 className="h4 mb-0">Workouts</h2>
      </div>
      <div className="card-body p-0">
        {workouts.length === 0 ? (
          <div className="p-3 text-muted">No workouts available.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Workout</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Assigned To</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout._id || workout.id || workout.name}>
                    <td>{workout.name || 'Unnamed workout'}</td>
                    <td>{workout.category || 'General'}</td>
                    <td>{workout.duration || workout.minutes || 'N/A'}</td>
                    <td>{workout.userId?.name || workout.user || 'General plan'}</td>
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

export default Workouts;
