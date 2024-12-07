import 'daya_cipta_erp/dist/index.cjs.css';
import 'daya_cipta_erp/dist/index.esm.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
