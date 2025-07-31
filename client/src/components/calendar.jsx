import React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function MUIDatePicker({ inputData, handleInputChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Select Date"
        value={inputData.date ? new Date(inputData.date) : null}
        onChange={(newValue) => {
          // Convert JavaScript Date to yyyy-mm-dd string to store
          const isoDate = newValue ? newValue.toISOString().split('T')[0] : '';
          handleInputChange({ target: { name: 'date', value: isoDate } });
        }}
        renderInput={(params) => (
          <TextField {...params} fullWidth />
        )}
      />
    </LocalizationProvider>
  );
}
