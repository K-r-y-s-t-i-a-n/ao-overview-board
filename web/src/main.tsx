import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Update available. Reload?')) {
      updateSW(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// =============================================================================
//. NA TERAZ
// - reset hasla
// - logowanie - zapamietaj (Remember Me)
// - administracja uzytkownikami
// - upload avatarow

//. ==== REACT ====

// Auto PWA update --> to check prompt
// Global server error handling

//. ==== SERVER ====

//* EMAIL..
// Dodac powiadomienie o zmianie hasla przez email (ChangePasswordForm)
// Zmienic glowna strone api na not authorized? Airways Logo? 404?

//. MOZE POZNIEJ
// - Wylogowanie z innych urzadzen

// =============================================================================
