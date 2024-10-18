import { LoadingButton } from '@mui/lab';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const RHFButton = ({
  isLoading,
  title,
  onClick,
  customStyle,
  color,
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
