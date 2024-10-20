import React from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Reveal from 'components/animation/Reveal';

const ValueForMoney = () => {
  return (
    <Container>
      <Stack
        gap={5}
        sx={{
          p: 6,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primaryColor[50]}, ${theme.palette.sectionBackground.main})`,
          borderRadius: 6,
        }}
      >
        <Reveal>
          <Typography variant="bh3" color="text.primary">
            A Value for-money restaurant you must visit
          </Typography>
        </Reveal>
        <Reveal>
          <Typography variant="body1" color="text.primary">
            Do you want to relish the best Punjabi cuisine at an affordable
            price? If cheese & butter melt your heart, then you must hop on a
            taxi to reach us. We have everything from the endless butter-loaded
            cuisines to special Punjabi drinks that make us a dream come true
            destination.
          </Typography>
        </Reveal>
        <Reveal>
          <Typography variant="body1" color="text.primary">
            We are the home for the eateries since we surround you with a rich
            aroma and flavoured food that makes everyone drool. So, are you all
            set to embark on a lip-smacking journey with us? We want to welcome
            you with all the warmth! Say goodbye to all those food cravings with
            our delicious Punjabi dishes.
          </Typography>
        </Reveal>
      </Stack>
    </Container>
  );
};

export default ValueForMoney;
