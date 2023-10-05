import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Drop from './drop'; // Importando um componente chamado 'Drop' do arquivo 'drop.js'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
  },
  button: {
    position: 'absolute',
    top: '10px',
    left: '10px',
  },
  successButton: {
    backgroundColor: 'green',
    color: 'white',
  },
};

function ButtonDrop() {
  const [showComponent, setShowComponent] = useState(false); // Estado para controlar a exibição do componente 'Drop'

  const drop = () => {
    setShowComponent(!showComponent); // Função que inverte o estado de 'showComponent' ao ser chamada
  };

  return (
    <div style={styles.container}>
      <Button
        style={{ ...styles.button, ...styles.successButton }}
        onClick={drop} // Quando o botão é clicado, a função 'drop' é chamada
        variant="contained"
        color="primary"
      >
        Add Node
      </Button>
      {showComponent && <Drop />} {/* Renderiza o componente 'Drop' se 'showComponent' for verdadeiro */}
    </div>
  );
}

export default ButtonDrop; // Exporta o componente 'Botao' para uso em outros lugares do aplicativo
