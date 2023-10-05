import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
  textAlign: 'center',
};

export default function BasicModal(props) {

  const [error, setError] = React.useState(false);
  const [newName, setNewName] = React.useState(props.name);

  const updateName = async () => {
    try {
        console.log('AAAAAAAAAAABBBBBBBBBBBBB')
      let urlPath = props.type == 'Hub' ? 'hubs' : props.type == "Tank" ? "tank" : props.type == "Valve" ? "valves" : "EntradaESaida"
      let urlPathEnd = props.type == "Tank" ? "Number" : "Name"

      const response = await fetch('https://back-roots.onrender.com/api/v1/' + urlPath + '/update' + urlPathEnd, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentName: props.name,
          currentNumber: props.type == "Tank" ? parseInt(props.name) : 0,
          newName: newName,
          newNumber: props.type == "Tank" ? parseInt(newName) : 0
        }),
      });

      if (response.ok) {
        console.log('Atualizado com sucesso');
        const updatedNodes = props.nodes.map((prevNode) => {
            if (prevNode.data.label === props.name) {
              // Update the node's data with the new name
              return {
                ...prevNode,
                data: {
                  ...prevNode.data,
                  label: newName, // Replace with the new name
                },
              };
            }
            return prevNode;
          });
        props.setNodes(updatedNodes); // Update the state
      } else {
        console.error('Erro ao atualizar o nome do HUB!');
      }
    } catch (error) {
      console.error('Erro ao atualizar o nome do HUB: ', error);
    }
  };

  const handleClose = () => {
    setError(false);
    props.setOpen(false);
  };

  const handleTextFieldChange = (event) => {
    setNewName(event.target.value);
  }

  const handleSubmit = () => {
    if (props.type == "Tank" && /[^0-9]/.test(newName)) {
        setError(true);
    } else {
        updateName();
        handleClose();
    }
    console.log('Form submitted');
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
            color="error"
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom="30px">
            Rename {props.type} "{props.name}"
          </Typography>
          <div>
            <TextField
              id="outlined-basic"
              label="New label"
              variant="outlined"
              defaultValue={props.name}
              onChange={handleTextFieldChange}
              InputLabelProps={{
                style: {
                  color: 'gray',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'green',
                  },
                },
              }}
            />
          </div>
          {error && <div style={{ color: 'red' }}>The Tank's label must be a number</div>}
          <div style={{ marginTop: '20px' }}>
            <Button
              variant="contained"
              style={{ backgroundColor: 'green', color: 'white' }} // Set the background color to green
              onClick={handleSubmit} // Attach the submit function
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
