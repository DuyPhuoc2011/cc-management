import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import dayjs from 'dayjs';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
  { field: 'name', headerName: 'Project Name', width: 130 },
  { field: 'start_date', headerName: 'Start Date', width: 130 },
  { field: 'end_date', headerName: 'End Date', width: 130 },
  { field: 'client_name', headerName: 'Client', width: 130},
  { field: 'username', headerName: 'Assignee', width: 130},
  { field: 'budget', headerName: 'Budget (USD)', width: 130}
];

const getProjects = () => {
  return new Promise((resolve, reject)=> {
    axios.get(process.env.REACT_APP_API_URL + '/projects')
      .then(res => {
        console.log("Got project after axios", res);
        var results = res.data;
        if(!!results){
          results.forEach(item => {
            item.start_date = dayjs(item.start_date).format("YYYY-MM-DD");
            item.end_date = dayjs(item.end_date).format("YYYY-MM-DD");
          });
        }
        resolve(results);
      });
  });
}

function Projects() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState();
  const [newProjectStartDate, setNewProjectStartDate] = useState();
  const [newProjectEndDate, setNewProjectEndDate] = useState();
  const [newProjectClient, setNewProjectClient] = useState();
  const [newProjectAssignee, setNewProjectAssignee] = useState();
  const [clientList, setClientList] = useState([]);
  const [userList, setUserList] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const insertProject = (name, startDate, endDate, client, assignee) => {
    axios.post(process.env.REACT_APP_API_URL + '/projects', {
      name: name,
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
      client: client,
      assignee: assignee
    }).then(res => {
      if (res.status === 200) {
        alert('Insert successfully');
        handleClose();
      } else {
        alert('Insert failed');
      }
    });
    setOpen(false);
  }

  useEffect(() => {
    getProjects().then(res => {
      console.log("Got projects",res);
      setRows(res);
    });
    axios.get(process.env.REACT_APP_API_URL + '/clients').then(res => setClientList(res.data));
    axios.get(process.env.REACT_APP_API_URL + '/users').then(res => setUserList(res.data));
  }, []);

  return (
    <>
      <div className="w-44 block ml-auto">
        <Button variant="contained" onClick={handleOpen}>
          Create Project
        </Button>
      </div>
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
          New Project
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
          <div>
            <TextField id="project_name"
            variant="outlined" 
            required
            fullWidth
            label="Project name"
            name="Project Name"
            onChange={e => {setNewProjectName(e.target.value)}}
            />
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Start date" format="YYYY-MM-DD" onChange={(newValue) => {setNewProjectStartDate(newValue)}}/>
            </DemoContainer>
          </LocalizationProvider>

          <div className="pb-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="End date" format="YYYY-MM-DD" onChange={(newValue) => {setNewProjectEndDate(newValue)}}/>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="pb-2">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="project_client">Client</InputLabel>
                <Select
                  labelId="project_client"
                  value={newProjectClient}
                  label="Client"
                  onChange={e => {setNewProjectClient(e.target.value)}}
                >
                  {clientList.map((client) => (
                    <MenuItem key={client.id} value={client.id}>{client.client_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="project_assignee">Assignee</InputLabel>
              <Select
                labelId="project_assignee"
                value={newProjectAssignee}
                label="Assignee"
                onChange={e => {setNewProjectAssignee(e.target.value)}}
              >
                {userList.map((user) => (
                  <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={()=> {insertProject(newProjectName, newProjectStartDate, newProjectEndDate, newProjectClient, newProjectAssignee)}}>
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}

export default Projects