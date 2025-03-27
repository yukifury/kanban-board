import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { MainLayout } from './components/layouts/main-layout';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainLayout>
      <App />
    </MainLayout>
  </StrictMode>,
);
