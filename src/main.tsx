import 'daya_cipta_erp/dist/index.cjs.css';
import 'daya_cipta_erp/dist/index.esm.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from './App.tsx';
import { persistor, store } from "./app/store";
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
