import React from 'react';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'; // Import dayjs for date handling
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

const PAPER_SX = {
  'marginTop': 1,
  '& .MuiPickersCalendarHeader-labelContainer': {
    color: (theme) => theme.palette.text.secondaryText,
  },
  '&& .Mui-selected': {
    backgroundColor: (theme) => theme.palette.primary.main,
    color: (theme) => theme.palette.primary.contrastText,
  },
  '& .MuiButtonBase-root': {
    'borderRadius': 1,
    'color': (theme) => theme.palette.text.dropdown,
    '&:hover': {
      border: 1,
      borderColor: (theme) => theme.palette.primary.main,
    },
  },
  'button[aria-current="date"]': {
    border: 1,
    borderColor: (theme) => theme.palette.primary.main,
  },
};

const TEXT_FIELD_SX = {
  '& :-webkit-autofill': {
    WebkitTextFillColor: (theme) => theme.palette.text.inputText,
    WebkitBoxShadow: (theme) =>
      `0 0 0px 1000px ${theme.palette.background.paper} inset`,
    caretColor: (theme) => theme.palette.text.subText,
  },
  'borderRadius': 1,
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: (theme) => theme.palette.background.border,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
    color: (theme) => theme.palette.text.inputText,
    backgroundColor: 'transparent',
  },
  '& .MuiInputLabel-root': {
    color: (theme) => theme.palette.text.inputText,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: (theme) => theme.palette.text.inputText,
  },
  '& .MuiSelect-icon': {
    color: (theme) => theme.palette.text.selectIcon,
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: (theme) => theme.palette.primary.main,
  },
  '& input[type="time"]::-webkit-calendar-picker-indicator': {
    filter:
      'invert(58%) sepia(8%) saturate(731%) hue-rotate(189deg) brightness(97%) contrast(83%)',
  },
  '& .MuiFormHelperText-root': {
    color: (theme) => theme.palette.text.subText,
    margin: 0,
    marginTop: 1,
  },
  '.MuiOutlinedInput-input': {
    color: (theme) => theme.palette.text.inputText,
  },
  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: (theme) => theme.palette.background.border,
  },
  '& .MuiInputLabel-root.Mui-disabled': {
    color: (theme) => theme.palette.text.inputText,
    backgroundColor: 'transparent',
  },

  '& .MuiSelect-icon.Mui-disabled': {
    color: (theme) => theme.palette.text.selectIcon,
  },
  '& .Mui-disabled': {
    backgroundColor: (theme) => theme.palette.background.select,
  },
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: (theme) => theme.palette.secondary.title,
  },
};

const HookDateField = (props) => {
  const {
    date,
    dateHandler,
    name,
    label,
    maxDate,
    minDate = dayjs(), // Set the default minDate to the current date
    disabled = false,
    onBlur,
    isShowTime = false,
    openTo = 'day',
    control,
    inputFormat = isShowTime ? 'DD-MM-YYYY hh:mm A' : 'DD-MM-YYYY',
    views = isShowTime
      ? ['year', 'month', 'day', 'hours', 'minutes']
      : ['year', 'month', 'day'],
  } = props;
  const [open, setOpen] = React.useState(false);

  const onClickHandler = React.useCallback(() => {
    if (!disabled) {
      setOpen(true);
    }
  }, [setOpen, disabled]);

  return (
    <LocalizationProvider key={1} dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={date}
        render={({ field, fieldState, formState }) => {
          return isShowTime ? (
            <DateTimePicker
              {...field}
              onError={(newError) => field.onChange(field.value, newError)}
              views={views}
              open={open}
              label={label}
              openTo={openTo}
              minDate={minDate} // Apply minDate to disable past dates
              maxDate={maxDate}
              onOpen={onClickHandler}
              onClose={() => setOpen(false)}
              format={inputFormat}
              onChange={(newValue) => {
                field.onChange(newValue);
                return dateHandler(newValue);
              }}
              PopperProps={{
                placement: 'bottom-start',
              }}
              components={{
                OpenPickerIcon: CalendarMonthIcon,
                SwitchViewButton: KeyboardArrowDownIcon,
              }}
              OpenPickerButtonProps={{
                sx: {
                  color: (theme) => theme.palette.secondaryDarkColor[400],
                },
              }}
              sx={{
                width: '100%',
              }}
              PaperProps={{
                sx: PAPER_SX,
              }}
              disabled={disabled}
              onBlur={onBlur}
              slotProps={{
                textField: {
                  name,
                  error:
                    (fieldState?.isTouched || formState?.isSubmitted) &&
                    Boolean(fieldState?.error),
                  helperText:
                    (fieldState?.isTouched || formState?.isSubmitted) &&
                    fieldState?.error?.message,
                  fullWidth: true,
                  InputLabelProps: {
                    shrink: true,
                  },
                  FormHelperTextProps: { style: { margin: 0 } },
                  sx: TEXT_FIELD_SX,
                  ...field,
                },
              }}
            />
          ) : (
            <DatePicker
              {...field}
              onError={(newError) => field.onChange(field.value, newError)}
              views={views}
              open={open}
              label={label}
              openTo={openTo}
              minDate={minDate} // Apply minDate to disable past dates
              maxDate={maxDate}
              onOpen={onClickHandler}
              onClose={() => setOpen(false)}
              format={inputFormat}
              onChange={(newValue) => {
                field.onChange(newValue);
                return dateHandler(newValue);
              }}
              PopperProps={{
                placement: 'bottom-start',
              }}
              components={{
                OpenPickerIcon: CalendarMonthIcon,
                SwitchViewButton: KeyboardArrowDownIcon,
              }}
              OpenPickerButtonProps={{
                sx: {
                  color: (theme) => theme.palette.secondaryDarkColor[400],
                },
              }}
              PaperProps={{
                sx: PAPER_SX,
              }}
              disabled={disabled}
              onBlur={onBlur}
              sx={{
                width: '100%',
              }}
              slotProps={{
                textField: {
                  name,
                  error:
                    (fieldState?.isTouched || formState?.isSubmitted) &&
                    Boolean(fieldState?.error),
                  helperText:
                    (fieldState?.isTouched || formState?.isSubmitted) &&
                    fieldState?.error?.message,
                  fullWidth: true,
                  InputLabelProps: {
                    shrink: true,
                  },
                  FormHelperTextProps: { style: { margin: 0 } },
                  sx: TEXT_FIELD_SX,
                  ...field,
                },
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default HookDateField;

HookDateField.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.any,
  ]),
  dateHandler: PropTypes.func,
  name: PropTypes.node,
  label: PropTypes.string,
  isFormComponent: PropTypes.bool,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  inputFormat: PropTypes.string,
  views: PropTypes.array,
  openTo: PropTypes.string,
  control: PropTypes.any,
  isShowTime: PropTypes.bool,
};
