import React from 'react';
import Sidebar from './components/sidebar'; // Importa o componente Sidebar
import DnDFlow from './components/graphs'; // Importa o componente DnDFlow

function App() {
  return (
    <div className="app-container">
      <DnDFlow/> {/* Renderiza o componente DnDFlow */}
      <Sidebar/> {/* Renderiza o componente Sidebar */}
    </div>
  );
}

export default App; // Exporta o componente App como o ponto de entrada principal do aplicativo
