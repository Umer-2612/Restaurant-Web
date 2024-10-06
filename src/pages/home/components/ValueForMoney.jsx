import React from 'react';

import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ValueForMoney = () => {
  return (
    <Grid container size={{ xs: 11, md: 10 }}>
      <Stack
        gap={2}
        bgcolor={(theme) => theme.palette.other.bgColor}
        p={2}
        borderRadius={3}
      >
        <Typography variant="bh2" color="primary">
          A Value for-money restaurant you must visit
        </Typography>
        <Typography variant="body1" color="text.primary">
          Do you want to relish the best Punjabi cuisine at an affordable price?
          If cheese & butter melt your heart, then you must hop on a taxi to
          reach us. We have everything from the endless butter-loaded cuisines
          to special Punjabi drinks that make us a dream come true destination.
        </Typography>
        <Typography variant="body1" color="text.primary">
          We are the home for the eateries since we surround you with a rich
          aroma and flavoured food that makes everyone drool. So, are you all
          set to embark on a lip-smacking journey with us? We want to welcome
          you with all the warmth! Say goodbye to all those food cravings with
          our delicious Punjabi dishes.
        </Typography>
      </Stack>
    </Grid>
  );
};

export default ValueForMoney;
