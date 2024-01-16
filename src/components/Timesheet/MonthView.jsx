import React, { useEffect } from 'react'
import dayjs from 'dayjs';
import { useState } from 'react';
import Card from '@mui/material/Card';
var isoWeeksInYear = require('dayjs/plugin/isoWeeksInYear')
var isLeapYear = require('dayjs/plugin/isLeapYear') // dependent on isLeapYear plugin
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)

const dayOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

function MonthView({ date }) {
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    initCalendar();
  }, [date]);

  const initCalendar = () => {
    const calendar = [];
    const startWeek = dayjs(date).startOf('month').week();
    const endWeek = dayjs(date).endOf('month').week() === 1 ? dayjs(date).isoWeeksInYear() + 1 : dayjs(date).endOf('month').week() ;
    for (var week = startWeek; week <= endWeek; week++) {
      calendar.push({
        week: week,
        days: Array(7)
          .fill(0)
          .map((n, i) =>
            dayjs(date).week(week).startOf('week').clone().add(n + i, 'day')
          ),
      });
    }
    setCalendar(calendar);
  };

  return (
    <>
        <table className='w-full'>
            <tbody>
                <tr>
                    {dayOfWeek.map((day) => (
                        <th key={day} className='text-center'>{day}</th>
                    ))}
                </tr>
                {calendar.map((week) => (
                    <tr key={week.week}>
                        {week.days.map((day) => (
                            <td key={day} className='text-center'>
                              {
                                day.format('MM') === dayjs(date).format('MM')?
                                  <Card className='p-2 mb-2 h-28'>
                                    <div className='text-sm text-right'>{day.format('DD')}</div>
                                    <textarea 
                                      className='text-center w-full h-16 border-2 border-gray-200 rounded-lg'
                                    />
                                  </Card>
                                :
                                  <Card className='p-2 mb-2 h-28'>
                                    <div className='text-sm text-right'>{day.format('DD')}</div>
                                  </Card>
                              }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default MonthView