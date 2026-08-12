import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeRecords } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getApiBaseUrl()}/activities/`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeRecords(payload));
        setError('');
      } catch (err) {
        setError(err.message || 'Unable to load activities.');
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading activities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h2 className="h4 mb-0">Activities</h2>
      </div>
      <div className="card-body p-0">
        {activities.length === 0 ? (
          <div className="p-3 text-muted">No activities available.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || activity.id || activity.type}>
                    <td>{activity.userId?.name || activity.user || 'Unknown user'}</td>
                    <td>{activity.type || 'N/A'}</td>
                    <td>{activity.duration || activity.minutes || 'N/A'}</td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
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

export default Activities;
