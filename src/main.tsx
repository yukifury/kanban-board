import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { MainLayout } from './components/layouts/main-layout';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <MainLayout>
    <App />
  </MainLayout>,
  // </StrictMode>,
);
