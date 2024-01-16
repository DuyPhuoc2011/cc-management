import React from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function Timesheet() {
  const [view, setView] = useState('month');
  const [calendarValue, setCalendarValue] = useState(dayjs());
  const [calendarView, setCalendarView] = useState(['month', 'year']);

  const handleViewChange = (newView) => {
    switch (newView) {
      case 'month':
        setCalendarView(['month', 'year']);
        break;
      case 'week':
        setCalendarView(['day', 'month', 'year']);
        break;
      case 'day':
        setCalendarView(['day', 'month', 'year']);
        break;
      default:
        break;
    }
    setView(newView);
  };

  const renderCalendar = () => {
    switch (view) {
      case 'month':
        return <MonthView  date={calendarValue} />;
      case 'week':
        return <WeekView date={calendarValue}/>;
      case 'day':
        return <DayView />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="">
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => handleViewChange('month')}>Month</Button>
          <Button onClick={() => handleViewChange('week')}>Week</Button>
          <Button onClick={() => handleViewChange('day')}>Day</Button>
        </ButtonGroup>
      </div>
      <div className='pb-10 w-64 block ml-auto mr-auto'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label=""
              views={calendarView}
              value={calendarValue}
              onChange={(newValue) => {
                setCalendarValue(newValue);
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      {renderCalendar()}
    </>
  );
};

export default Timesheet