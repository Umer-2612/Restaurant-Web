import React, { useLayoutEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
// import { useToast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { useSignInMutation } from 'store/apis/signIn';
import { setUserInfo } from 'store/slices/user';
import useAuth from 'utils/authUtils';
import { validationSchema } from 'utils/validation';

const RESERVATION_FORM_VALIDATION = Yup.object().shape({
  email: validationSchema.email,
  password: validationSchema.lastName,
});

const SignIn = () => {
  //   const { showToast } = useToast();
  const auth = useAuth();
  console.log(auth);
  const dispatch = useDispatch();

  const [signInGet, { data, isLoading, isSuccess, isError, error }] =
    useSignInMutation();

  useLayoutEffect(() => {
    if (isSuccess) {
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

  const onSubmit = async (data) => {
    const body = {
      email: data.email.trim(),
      password: data.password.trim(),
    };
    const response = await signInGet(body);
    console.log({ response });
    // try {
    //   if (response?.data) {
    //     showToast(response?.data?.message, 'success');
    //   } else {
    //     showToast(response?.data?.message, 'error');
    //   }
    // } catch (error) {
    //   console.log('error');
    // }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '60%',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: (theme) => theme.palette.grey[100],
        borderRadius: '8px',
      }}
    >
      {/* Email Field */}
      <Grid item xs={12} sm={6}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              InputProps={{
                style: {
                  backgroundColor: (theme) => theme.palette.grey[200],
                },
              }}
            />
          )}
        />
      </Grid>

      {/* Last Name Field */}
      <Grid item xs={12} sm={6}>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              fullWidth
              variant="outlined"
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ''}
              InputProps={{
                style: {
                  backgroundColor: (theme) => theme.palette.grey[200],
                },
              }}
            />
          )}
        />
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
    </Box>
  );
};

export default SignIn;
