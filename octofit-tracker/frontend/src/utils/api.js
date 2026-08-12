export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && String(codespaceName).trim()) {
    return `https://${String(codespaceName).trim()}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
};

export const normalizeRecords = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && payload.data && Array.isArray(payload.data.results)) {
    return payload.data.results;
  }

  return [];
};
