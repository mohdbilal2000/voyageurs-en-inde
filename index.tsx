
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AdminApp from './components/admin/AdminApp';
import ErrorBoundary from './components/ErrorBoundary';
import { ADMIN_PATH } from './components/admin/config';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Route to the admin panel when the path is /admin (any sub-path), else the site.
const path = window.location.pathname.replace(/\/+$/, '') || '/';
const isAdmin = path === ADMIN_PATH || path.startsWith(ADMIN_PATH + '/');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      {isAdmin ? (
        <AdminApp />
      ) : (
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )}
    </ErrorBoundary>
  </React.StrictMode>
);
