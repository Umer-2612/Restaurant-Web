import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { Banner } from 'components/common/Banner';
import useToast from 'components/common/CustomToastMessage';
import HookTextField from 'components/common/form-components/HookTextField';
import { usePutPostContactUsMutation } from 'store/apis/contactUs';
import { LIGHT } from 'store/theme/colors';
import { validationSchema } from 'utils/validation';

const RESERVATION_FORM_VALIDATION = Yup.object().shape({
  firstName: validationSchema.firstName,
  lastName: validationSchema.lastName,
  phoneNo: validationSchema.phoneNo,
  email: validationSchema.email,
  message: validationSchema.message,
});
const theme = createTheme({
  palette: LIGHT,
});
const ContactUs = () => {
  const { control, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(RESERVATION_FORM_VALIDATION),
  });

  const [contactUs] = usePutPostContactUsMutation();

  const { showToast } = useToast();

  const onSubmit = async (data) => {
    try {
      const response = await contactUs(data);
      if (response?.data) {
        showToast(response?.data?.message, 'success');
      } else {
        showToast(response?.data?.message, 'error');
      }
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Banner />
      <Container>
        <Box sx={{ textAlign: 'center', mt: 4, px: 2 }}>
          <Typography
            variant="h4"
            sx={{ color: 'red', fontWeight: 'bold' }}
            textAlign={'left'}
          >
            CONTACT US
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }} textAlign={'left'}>
            Do you want to renew yourself with a lavish meal after a long day
            that will set your mood? We promise our lavish meal can set your
            mood and force you to lick your fingers. Enjoy our delicious food &
            for any more queries, reach out to us. Feel free to contact us!
          </Typography>

          <Typography variant="body1" sx={{ mt: 4 }} textAlign={'left'}>
            <Typography>📞 0721421728</Typography>
            <Typography mt={1}>
              📧 info@punjabitouchindianrestaurant.com.au
            </Typography>
            <Typography mt={1}>📍 T2/356 Middle Road, Greenbank</Typography>
          </Typography>
        </Box>
      </Container>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: '60%',
          margin: '0 auto',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <Grid container spacing={2}>
          {/* First Name Field */}
          <Grid item xs={12} sm={6}>
            <HookTextField
              control={control}
              label="First Name*"
              name="firstName"
              fullWidth
              // autoFocuss
            />
          </Grid>

          {/* Last Name Field */}
          <Grid item xs={12} sm={6}>
            <HookTextField
              control={control}
              label="Last Name*"
              name="lastName"
              fullWidth
            />
          </Grid>

          {/* Phone Field */}
          <Grid item xs={12} sm={6}>
            <HookTextField
              control={control}
              label="Phone no*"
              name="phoneNo"
              fullWidth
            />
          </Grid>

          {/* Email Field */}
          <Grid item xs={12} sm={6}>
            <HookTextField
              control={control}
              label="Email*"
              name="email"
              fullWidth
            />
          </Grid>

          {/* Message Field */}
          <Grid item xs={12}>
            <HookTextField
              control={control}
              label="Message*"
              name="message"
              fullWidth
            />{' '}
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              sx={{
                'display': 'block',
                'marginLeft': 'auto',
                'backgroundColor': (theme) => theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default ContactUs;
