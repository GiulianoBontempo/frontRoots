import React from 'react'; // Importa a biblioteca React
import ReactDOM from 'react-dom/client'; // Importa a biblioteca ReactDOM

import App from './App.jsx'; // Importa o componente App (provavelmente o componente raiz)
import './index.css'; // Importa um arquivo de estilo CSS

// Usa o método createRoot do ReactDOM para renderizar o aplicativo no elemento com o ID "root"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Renderiza o componente App */}
  </React.StrictMode>,
);
