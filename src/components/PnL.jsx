import Typography from "./Typography"

function PnL(props) {
  const { label, value, variant = "subtitle1", disabled } = props;
  const parsedValue = parseFloat(value) || 0;

  const colorByValue = (value) => value >= 0 ? "success" : "error";

  const valueWithSign = (value) => {
    const sign = value >= 0 ? "+" : "";
    return value ? `${sign}${value.toFixed(2)}` : "00.00";
  };

  return (
    <>
      <Typography variant="subtitle2" component="span" disabled={disabled}> {label} </Typography>
      <Typography
        variant={variant}
        component="div"
        sx={{ flexGrow: 1, ...(disabled && { opacity: "0.7" }) }}
        color={colorByValue(parsedValue)}
      >
        {valueWithSign(parsedValue)}
      </Typography>
    </>
  );
}

export default PnL;
