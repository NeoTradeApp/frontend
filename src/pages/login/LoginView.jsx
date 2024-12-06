import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { Fingerprint } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { MuiTelInput } from "mui-tel-input";
import Password from "./components/Password";

function Login(props) {
  const {
    mobileNumber = "",
    password = "",
    onChange: emitChange,
    onSubmit: emitSubmit,
  } = props;

  const [formData, setFormData] = useState({ mobileNumber, password });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const enableSubmit = formData.mobileNumber && formData.password;

  const handleChange = (data) => {
    const newData = { ...formData, ...data };

    setFormData(newData);
    emitChange && emitChange(newData);
  };

  const handleSubmit = () => {
    setIsLoading(true);

    if (emitSubmit) {
      emitSubmit(formData)
        .then((message) => {
          setHelperText(message);
          setIsLoading(false);
          setError(false);
        })
        .catch((error) => {
          setHelperText(error);
          setIsLoading(false);
          setError(true);
        });
    }
  };

  const parseMobileNumber = (mobileString) =>
    mobileString.replace(/[^\d\+]/g, "");

  return (
    <Card variant="blank" sx={{ m: 3, p: 2 }}>
      <CardHeader title="Login" />

      <CardContent>
        <FormControl>
          <MuiTelInput
            label="Mobile number"
            id="mobileNumber"
            name="mobileNumber"
            placeholder="+91xxxxxxxxxx"
            required={true}
            defaultCountry="IN"
            value={formData.mobileNumber}
            onChange={(value) =>
              handleChange({
                mobileNumber: parseMobileNumber(value),
              })
            }
          />
        </FormControl>
      </CardContent>

      <CardContent>
        <Password
          value={formData.password}
          onChange={(value) => handleChange({ password: value })}
        />
      </CardContent>

      <CardContent>
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </CardContent>

      <CardContent>
        <LoadingButton
          variant="contained"
          startIcon={<Fingerprint />}
          loading={isLoading}
          loadingPosition="start"
          onClick={handleSubmit}
          disabled={!enableSubmit}
          fullWidth
        >
          Login
        </LoadingButton>
      </CardContent>
    </Card>
  );
}

export default Login;
