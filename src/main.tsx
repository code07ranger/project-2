import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/common/ErrorBoundary';
import './index.css';

// Automatically reload if a dynamic import fails due to new code deployment
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  console.warn('New deployment bundle detected. Refreshing...');
  window.location.reload();
});

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
