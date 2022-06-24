import React, { useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const MuiDatepicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

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
              label: { color: '#fff', fontSize: '20px' },
            }}
            inputProps={{
              ...params.inputProps,
              placeholder: 'MM/YYYY',
            }}
          />
        )}
        value={selectedDate}
        onChange={(value) => setSelectedDate(value)}
        minDate={new Date('2022-01-01')}
        maxDate={new Date('2023-06-01')}
        views={['month', 'year']}
      />
    </Stack>
  );
};

export default MuiDatepicker;
