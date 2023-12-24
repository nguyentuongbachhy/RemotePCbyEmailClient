// File: index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RequireUser from './components/RequireUser';
import { UseLightModeProvider } from './components/UseLightMode';
import { UserProvider } from './components/UserContext';
import './index.css';

const UserProtectedApp = RequireUser(App)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <UseLightModeProvider>
      <BrowserRouter>
        <UserProtectedApp />
      </BrowserRouter>
    </UseLightModeProvider>
  </UserProvider>
);
