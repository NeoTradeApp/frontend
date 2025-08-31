import {
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';

export default function DropDown(props) {
  const { label, options = [], defaultValue, onChange: emitChange } = props;

  return (
    <>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue={defaultValue}
        label={label}
        onChange={(event) => {
          event.preventDefault();
          emitChange(event.target.value);
        }}
      >{
          options.map((option, index) => (
            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
          ))
        }
      </Select>
    </>
  )
}
