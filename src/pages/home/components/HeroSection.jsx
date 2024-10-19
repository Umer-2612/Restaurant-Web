import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import ButterChickenImg from 'assets/images/butter-chicken.jpg';
import { pxToRem } from 'store/theme/typography';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Stack
      size={12}
      sx={{
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '3 / 2',
        maxHeight: '100vh',
        background: `url(${ButterChickenImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Background Image */}
      {/* <img
        src={ButterChickenImg}
        alt="Butter Chicken"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      /> */}

      {/* Overlay with Content */}
      <Stack
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          px: { xs: 2, sm: 5, md: 10, lg: 16 },
          color: (theme) => theme.palette.common.white,
        }}
      >
        <Stack gap={{ xs: 3, sm: 5, md: 10 }}>
          {/* Hero Title */}
          <Typography
            component="h1"
            variant="h1"
            textAlign="center"
            sx={{
              fontSize: { xs: pxToRem(24), sm: pxToRem(50), md: pxToRem(72) },
              lineHeight: 1,
            }}
          >
            Relish The Flavours Of{' '}
            <Typography
              component="span"
              fontSize="inherit"
              variant="h1"
              sx={{ color: (theme) => theme.palette.subColor.main }}
            >
              India
            </Typography>{' '}
            With Us!
          </Typography>

          {/* Content Area */}
          <Stack alignItems={{ xs: 'center', md: 'end' }} width="100%">
            <Stack
              alignItems={{ xs: 'center', md: 'start' }}
              sx={{ width: { xs: '95%', sm: '90%', md: 500 }, gap: 2 }}
            >
              {/* Description Text */}
              <Typography
                variant="subtitle2"
                textAlign="justify"
                sx={{
                  fontSize: {
                    xs: pxToRem(14),
                    sm: pxToRem(16),
                    md: pxToRem(18),
                  },
                  lineHeight: {
                    xs: pxToRem(20),
                    sm: pxToRem(24),
                    md: pxToRem(27),
                  },
                }}
              >
                Bring the lover of your life here and romanticize your date with
                our lip-smacking foods. Book your table now in advance to get
                rid of any hassle or order online.
              </Typography>

              {/* Buttons Section */}
              <Stack direction="row" gap={1}>
                <Button variant="contained" onClick={() => navigate('/menu')}>
                  Order Online
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/reservation')}
                  sx={{
                    backgroundColor: 'white',
                    color: (theme) => theme.palette.text.primary,
                  }}
                >
                  Reserve a Table
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HeroSection;
