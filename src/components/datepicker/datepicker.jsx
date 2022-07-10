import React, { useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const MuiDatepicker = ({ selectedDate, handleDateChange }) => {
  return (
    <Stack spacing={4} sx={{ width: '180px' }}>
      <DatePicker
        label={'בחרו תאריך'}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={null}
            sx={{
              svg: { color: '#fff', fontSize: '35px' },
              input: { color: '#fff' },
              label: { color: 'transparent', fontSize: '20px' },
            }}
            inputProps={{
              ...params.inputProps,
              placeholder: 'בחרו תאריך',
            }}
          />
        )}
        value={selectedDate}
        onChange={() => undefined}
        onAccept={(e, value) => handleDateChange(value)}
        minDate={new Date('2022-01-01')}
        maxDate={new Date('2030-06-01')}
        views={['month', 'year']}
      />
    </Stack>
  );
};

export default MuiDatepicker;
