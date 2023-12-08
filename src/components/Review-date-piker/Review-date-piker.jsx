import React, { useState } from 'react';
import datePikerIcon from '../../img/date-piker.png';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './review-date-piker.css';

export default function ReviewDatePiker() {
  function MuiIcon() {
    return <img src={datePikerIcon} alt='Date picker opening icon' width={32} />;
  }

  const [pikedDate, setPikerDate] = useState();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slots={{ openPickerIcon: MuiIcon }}
        value={pikedDate}
        onChange={(newValue) => setPikerDate(newValue)}
      />
    </LocalizationProvider>
  );
}
