import { LoadingButton } from '@mui/lab';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const RHFButton = ({
  isLoading,
  title,
  onClick,
  customStyle,
  color = 'white',
  size,
  variant,
  disabled = false,
  changeVariantTo,
  noDisableStyle = false,
  ...other
}) => {
  return (
    <LoadingButton
      size={size ? size : 'large'}
      sx={{
        ':disabled': {
          opacity: noDisableStyle ? 1 : 0.6,
          backgroundColor: (theme) =>
            !noDisableStyle && variant !== 'text' && theme.palette.grey[300],
        },
        'borderRadius': 2,
        'transition': 'background 0.3s ease, transform 0.3s ease',
        '&:hover': {
          background: 'linear-gradient(135deg, #d32f2f, #ffc04d)', // Inverse gradient on hover
          transform: 'scale(1.05)', // Adds a slight zoom effect on hover
        },
        'background': 'linear-gradient(135deg, #b22222, #ffb84d)',
        ...customStyle,
      }}
      {...other}
      disabled={isLoading || disabled}
      onClick={onClick}
      variant={variant}
      color={color}
    >
      <Typography color={color} variant="body1">
        {title}
      </Typography>
      {isLoading ? (
        <CircularProgress sx={{ ml: 1 }} size={15} color={color} />
      ) : null}
    </LoadingButton>
  );
};

RHFButton.propTypes = {
  changeVariantTo: PropTypes.string,
  color: PropTypes.string,
  customStyle: PropTypes.object,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  noDisableStyle: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.any,
  title: PropTypes.any,
  variant: PropTypes.string,
};

export default RHFButton;
