import React, { useLayoutEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useSignInMutation } from 'store/apis/signIn';
import { setUserInfo } from 'store/slices/user';
import useAuth from 'utils/authUtils';
import { validationSchema } from 'utils/validation';
import { themeSelector } from 'store/theme';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import logo from '../../assets/brand-image/punjabi-touch-logo.png';
import Grid from '@mui/material/Grid2';

const RESERVATION_FORM_VALIDATION = Yup.object().shape({
  email: validationSchema.email,
  password: validationSchema.password,
});

const SignIn = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);

  const [signInGet, { data, isLoading, isSuccess, isError, error }] =
    useSignInMutation();

  useLayoutEffect(() => {
    if (isSuccess && data) {
      dispatch(setUserInfo(data?.user));
      auth.setAuth(data);
    }
  }, [auth, data, dispatch, isSuccess]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(RESERVATION_FORM_VALIDATION),
  });

  const onSubmit = async (formData) => {
    const body = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };
    try {
      const response = await signInGet(body);
      console.log(response); // Check the response here
    } catch (apiError) {
      console.error('Error during sign-in:', apiError);
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh', backgroundColor: '#F4F6F8' }}>
      {/* Left Panel */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          background: 'linear-gradient(to bottom right, #FF1744, #FF616F)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#FFFFFF',
          textAlign: 'center',
          padding: 3,
        }}
      >
        <Box>
          <img
            src={logo}
            alt="Company Logo"
            style={{
              width: '150px',
              height: 'auto',
              marginBottom: theme.spacing(3),
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              fontFamily: 'Roboto, sans-serif',
              color: '#FFFFFF',
              marginBottom: theme.spacing(2),
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontFamily: 'Roboto, sans-serif',
              color: '#FFFFFF',
              marginBottom: theme.spacing(4),
              opacity: 0.8,
            }}
          >
            Sign in to continue to your dashboard
          </Typography>
        </Box>
      </Grid>

      {/* Right Panel - Form Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // width: '81%',
          flexGrow: 1, // Take remaining width
          padding: theme.spacing(5),
          backgroundColor: '#FFFFFF',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: theme.spacing(4),
            maxWidth: 400,
            // width: '100%',
            borderRadius: '12px',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              textAlign: 'center',
              marginBottom: theme.spacing(4),
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Sign In to Your Account
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  sx={{
                    marginBottom: theme.spacing(3),
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  sx={{
                    marginBottom: theme.spacing(4),
                  }}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                'padding': theme.spacing(1.5),
                'borderRadius': '8px',
                'backgroundColor': '#FF1744',
                'color': '#FFFFFF',
                'fontWeight': 500,
                'fontFamily': 'Roboto, sans-serif',
                'boxShadow': '0px 4px 12px rgba(255, 23, 68, 0.3)',
                '&:hover': {
                  backgroundColor: '#D50000',
                },
              }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignIn;
