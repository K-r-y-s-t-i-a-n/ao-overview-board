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
// - correct wide screen --> DONE
// - no team - no adding notes or anhything --> DONE
// - poprawic wylogowanie po czasie (mutate) --> DONE in HeaderInfo (useUser())
//* - H - logowanie - zapamietaj (Remember Me)
//* - H - administracja uzytkownikami
//* - H - upload avatarow
//* - H - reset hasla
//* - H - block users route

//. ==== REACT ====
// Prompt PWA update --> DONE
//* Preload on hover (sidebar links)
//* Dodac slidy zdjec na loginie
//* Global server error handling for erros > 500

//. ==== SERVER ====
//* EMAIL..
// Zmienic glowna strone api na not authorized? Airways Logo? 404? --> 404 DONE
//* Dodac powiadomienie o zmianie hasla przez email (ChangePasswordForm)

//. MOZE POZNIEJ
//* - Wylogowanie z innych urzadzen

// =============================================================================
