import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Переконайтеся, що шлях до вашого CSS правильний
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"></link>

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);