import { styled } from "@mui/material/styles";
import { Typography as MuiTypography } from '@mui/material';

const Typography = styled(MuiTypography, {
  shouldForwardProp: (prop) => prop !== "disabled",
})(({ theme, disabled }) => ({
  ...(disabled && {
    color: theme.palette.text.disabled,
  }),
}));

export default Typography;
