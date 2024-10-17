import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

const StyledTextField = styled(TextField)(({ theme, novalidation }) => ({
  '& :-webkit-autofill': {
    WebkitTextFillColor: theme.palette.text.inputText,
    WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset`,
    caretColor: theme.palette.text.subText,
  },
  'borderRadius': 1,
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.background.border,
    borderRadius: 12,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
    color: theme.palette.text.inputText,
    backgroundColor: 'transparent',
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.inputText,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.inputText,
  },
  '& .MuiSelect-icon': {
    color: theme.palette.text.selectIcon,
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.primary,
  },
  '& input[type="time"]::-webkit-calendar-picker-indicator': {
    filter:
      'invert(58%) sepia(8%) saturate(731%) hue-rotate(189deg) brightness(97%) contrast(83%)',
  },
  '& .MuiFormHelperText-root': {
    color: (theme) => theme.palette.text.subText,
    margin: 0,
    marginTop: 1,
    display: novalidation && 'none',
  },
  '.MuiOutlinedInput-input': {
    color: theme.palette.text.inputText,
  },
  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.background.border,
  },
  '& .MuiInputLabel-root.Mui-disabled': {
    color: theme.palette.text.inputText,
    backgroundColor: 'transparent',
  },
  '& .MuiSelect-icon.Mui-disabled': {
    color: theme.palette.text.selectIcon,
  },
  '& .Mui-disabled': {
    backgroundColor: theme.palette.background.select,
  },
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: theme.palette.secondary.title,
  },
}));

export default function HookTextField(props) {
  const { field, fieldState, formState } = useController(props);
  const [count, setCount] = useState(field.value ? field.value.length : 0);

  const { isNoOfQuestion, showCount, ...textFieldProps } = props;

  const handleChange = (event) => {
    const { value } = event.target;

    if (isNoOfQuestion) {
      // Check if the input matches the desired pattern
      if (/^\d*$/.test(value) && value.length <= 2) {
        field.onChange(event);
        setCount(value.length);
      }
    } else {
      setCount(value.length);
      field.onChange(event);
    }
  };

  return (
    <Stack width={'100%'}>
      <StyledTextField
        sx={{
          input: { color: (theme) => theme.palette.text.secondary },
          fieldset: {
            borderColor: (theme) => theme.palette.background.border,
          },
        }}
        {...field}
        placeholder={props.label?.replace(/\*/g, '')}
        InputLabelProps={{
          shrink: true,
        }}
        value={field.value || ''}
        onChange={handleChange}
        {...textFieldProps} // Spread remaining props here
        error={
          (fieldState.isTouched || formState.isSubmitted) &&
          Boolean(fieldState.error)
        }
        helperText={
          (fieldState.isTouched || formState.isSubmitted) &&
          fieldState.error?.message
        }
      />

      {showCount && (
        <Typography
          textAlign="right"
          variant="caption1"
          mb={1}
          sx={{ color: (theme) => theme.palette.text.secondaryText }}
        >
          {`${count}/${props.inputProps?.maxLength}`}
        </Typography>
      )}
    </Stack>
  );
}

HookTextField.propTypes = {
  label: PropTypes.string,
  inputProps: PropTypes.object,
  showCount: PropTypes.bool,
  isNoOfQuestion: PropTypes.bool,
};
