import React, { useEffect } from 'react'
import dayjs from 'dayjs';
import { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import BootstrapDialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const dayOfWeek = ['PROJECT','SUN','MON','TUE','WED','THU','FRI','SAT','TOTAL'];

const getProjects = () => {
  return new Promise((resolve, reject)=> { 
    fetch(process.env.REACT_APP_API_URL + '/projects', {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json'
    }}).then(async res => {
      var results = await res.json();
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


function WeekView({date}) {
  const [week, setWeek] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('projectTime');
  const [project, setProject] = useState();
  const [projectList, setProjectList] = useState([]);
  const [timeOffType, setTimeOffType] = useState();

  useEffect(() => {
    initWeekCalendar();
  }, [date]);

  useEffect(() => {
    getProjects().then((results) => {
      setProjectList(results);
    });
  }, []);

  const initWeekCalendar = () => {
    const currentDay = dayjs(date);
    const startOfWeek = currentDay.startOf('week');
    const endOfWeek = currentDay.endOf('week');
    const weekArray = [];
    
    for (let day = startOfWeek; day <= endOfWeek; day = day.add(1, 'day')) {
      weekArray.push(day);
    }
    
    setWeek([...weekArray, totalHours]);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const handleTypeChange = (value) => {
    setType(value);
  }
  

  return (
    <>
      <table className='w-full'>
        <thead>
          <tr>
            {dayOfWeek.map((day, index) => (
              <th className='text-center' key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            </td>
            {
              week.map((item, index) => (
                <td key={index} className='text-center'>
                  <div className='text-sm border-b'>{typeof item === 'number' ? item : item.format('DD/MM')}</div>
                </td>
              ))
            }
            <td>
            </td>
          </tr>
          <tr>
            <td>
            <Button variant="contained" startIcon={<AddIcon />} onClick={openDialog} > 
              Add
            </Button>
            </td>
          </tr>
        </tbody>
      </table>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          New Time Row
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
          <Box className="w-96 pb-2">
            <FormControl fullWidth>
              <InputLabel id="time_row_type">Type</InputLabel>
              <Select
                labelId="time_row_type"
                value={type}
                label="Type"
                onChange={e => {handleTypeChange(e.target.value)}}
              >
                <MenuItem key="projectTime" value="projectTime" >Project Time</MenuItem>
                <MenuItem key="timeOff" value="timeOff" >Time Off</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {type === 'projectTime' && (
            <Box className="w-96 pb-2">
              <FormControl fullWidth>
                <InputLabel id="project">Project</InputLabel>
                <Select
                  labelId="project"
                  value={project ? project: ''}
                  label="Project"
                  onChange={e => {setProject(e.target.value)}}
                >
                  {projectList.map((project) => (
                    <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          {type === 'timeOff' && (
            <Box className="w-96">
              <FormControl fullWidth>
                <InputLabel id="time_off_type">Time Off Type</InputLabel>
                <Select
                  labelId="time_off_type"
                  value={timeOffType ? timeOffType: ''}
                  label="Time Off Type"
                  onChange={e => {setTimeOffType(e.target.value)}}
                >
                  <MenuItem key="vacation" value="vacation" >Vacation</MenuItem>
                  <MenuItem key="sick" value="sick" >Sick</MenuItem>
                  <MenuItem key="personal" value="personal" >Personal</MenuItem>
                  <MenuItem key="other" value="other" >Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={()=> {}}>
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}

export default WeekView