
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminApp from './components/admin/AdminApp';
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
    {isAdmin ? <AdminApp /> : <App />}
  </React.StrictMode>
);
