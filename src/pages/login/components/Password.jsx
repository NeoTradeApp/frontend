import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControlInput } from "../../../components";

function Password(props) {
  const { value, onChange: emitChange } = props;
  const [password, setPassword] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const targetValue = event.target.value;

    setPassword(targetValue);
    emitChange && emitChange(targetValue);
  };

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  return (
    <FormControlInput
      label="Password"
      id="password"
      name="password"
      placeholder="Enter password"
      type={showPassword ? "text" : "password"}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label={
              showPassword ? "hide the password" : "display the password"
            }
            // onClick={handleClickShowPassword}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      fullWidth
      required={true}
      value={password}
      onChange={handleChange}
    />
  );
}

export default Password;
