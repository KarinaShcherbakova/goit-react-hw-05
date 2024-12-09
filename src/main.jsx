import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import styles from './styles.module.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className={styles.container}>
      <App />
    </div>
  </StrictMode>,
);
