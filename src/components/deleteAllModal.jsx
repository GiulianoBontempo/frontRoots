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

export default function DeleteAllModal(props) {

  const [error, setError] = React.useState(false);
  const [input, setInput] = React.useState('');

  const deleteAllNodesAndConnections = async () => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/general/deleteAll', {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('All nodes and connections deleted successfully.');
        window.location.reload();
      } else {
        console.error('Failed to delete all nodes and connections.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleClose = () => {
    setError(false);
    props.setOpen(false);
  };

  const handleTextFieldChange = (event) => {
    setInput(event.target.value);
  }

  const handleSubmit = () => {
    if (input != "DELETE") {
        setError(true);
    } else {
        deleteAllNodesAndConnections()
        handleClose();
    }
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
            To delete all nodes, type DELETE and click the button below.
          </Typography>
          <div>
            <TextField
              id="outlined-basic"
              label="Delete"
              variant="outlined"
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
          {error && <div style={{ color: 'red' }}>You must type DELETE.</div>}
          <div style={{ marginTop: '20px' }}>
            <Button
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white' }} // Set the background color to green
              onClick={handleSubmit} // Attach the submit function
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
