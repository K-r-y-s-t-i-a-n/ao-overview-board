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
//! - poprawic wylogowanie po czasie (mutate) --> DONE TO CHECK useUserStore.ts --> moze uczyc mutate zamiast useEffect i sprawdzac co pol minuty?
//* no team - no adding notes or anhything
//* - reset hasla
//* - logowanie - zapamietaj (Remember Me)
//* - administracja uzytkownikami
//* - upload avatarow
//* - correct wide screen

//. ==== REACT ====
// Prompt PWA update --> DONE
//* Global server error handling
//* Dodac slidy zdjec na loginie

//. ==== SERVER ====

//* EMAIL..
//* Dodac powiadomienie o zmianie hasla przez email (ChangePasswordForm)
// Zmienic glowna strone api na not authorized? Airways Logo? 404? --> 404 DONE

//. MOZE POZNIEJ
//* - Wylogowanie z innych urzadzen

// =============================================================================
