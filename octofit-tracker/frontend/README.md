# Octofit Tracker Frontend

This presentation tier uses React 19, Vite, Bootstrap, and react-router-dom to display the Octofit Tracker data from the backend API.

## Required environment variable

The frontend builds API URLs with `import.meta.env.VITE_CODESPACE_NAME` and expects it to be defined when running in GitHub Codespaces.

Set it in a local environment file such as `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

If `VITE_CODESPACE_NAME` is not set, the app falls back to `http://localhost:8000/api` so local development still works.

## API URL pattern

When running in GitHub Codespaces, requests are made to:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

Example:

```text
https://my-codespace-8000.app.github.dev/api/users/
```
