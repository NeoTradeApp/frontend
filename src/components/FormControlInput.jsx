import { FormControl, InputLabel, FormHelperText, OutlinedInput } from "@mui/material";

function FormControlInput(props) {
  const { label, helperText, fullWidth, ...restProps } = props;

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput {...restProps} variant="outlined" label={label} />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default FormControlInput;
