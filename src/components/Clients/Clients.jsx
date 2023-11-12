import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import './clients.css';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

const API_URL = process.env.REACT_APP_API_URL;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'client_name', headerName: 'Client Name', width: 130 },
  { field: 'created_date', headerName: 'Created Date', width: 130 },
  { field: 'created_by', headerName: 'Created By', width: 130 },
  { field: 'description', headerName: 'Description'}
];

const getClients = () => {
  return new Promise((resolve, reject)=> {
    fetch(API_URL + '/clients', {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json'
    }}).then(async res => {
      var results = await res.json();
      resolve(results);
    });
  });
}


function Clients() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [newClientName, setNewClientName] = useState();
  const [newClientDes, setNewClientDes] = useState();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=> {
    getClients().then(res => {
      setRows(res);
    });
  }, [open]);

  const insertClient = (clientName, clientDes) => {
    var data = {
      clientName: clientName,
      clientDes: clientDes
    };
    fetch(API_URL + '/clients', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)}).then(res => {
      handleClose();

    });
  }

  return (
    <>
      <Button id="create_client_button" variant="contained" onClick={handleOpen}>
        Create Client
      </Button>
      <div style={{ width: '100%' }}>
        <br />
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          New Client
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField id="client_name"
          variant="outlined" 
          required
          fullWidth
          label="Client name"
          name="Client Name"
          onChange={e => {setNewClientName(e.target.value)}}
          />
          <br />
          <TextField id="client_description"
          variant="outlined" 
          required
          fullWidth
          label="Client description"
          name="Client description"
          onChange={e => {setNewClientDes(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={()=> {insertClient(newClientName, newClientDes)}}>
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}

export default Clients