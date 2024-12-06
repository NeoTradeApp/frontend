import { useState } from "react";
import { Card, CardHeader, CardContent, FormHelperText } from "@mui/material";
import { Key as KeyIcon } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { MuiOtpInput } from "mui-one-time-password-input";
import ResendOtpLink from "./components/ResendOtpLink";

function OtpView(props) {
  const { onSubmit: emitSubmit, onResend: emitResend } = props;

  const [otp, setOtp] = useState("");
  const [enableValidateButton, setEnableValidateButton] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [helperText, setHelperText] = useState(
    "OTP has been sent on the mobile number"
  );

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleSubmit = () => {
    setIsLoading(true);

    if (emitSubmit) {
      emitSubmit(otp)
        .then((message) => {
          setHelperText(message);
          setIsLoading(false);
          setError(true);
        })
        .catch((error) => {
          setHelperText(error);
          setError(true);
          setIsLoading(false);
        });
    }
  };

  return (
    <Card variant="blank" sx={{ m: 3, p: 2 }}>
      <CardHeader title="Verify OTP" />

      <CardContent>
        <MuiOtpInput
          value={otp}
          onChange={handleChange}
          length={4}
          TextFieldsProps={{ type: "password" }}
          validateChar={(text) => !isNaN(Number(text))}
          onComplete={() => setEnableValidateButton(true)}
        />
      </CardContent>

      <CardContent>
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </CardContent>

      <CardContent>
        <ResendOtpLink onClick={emitResend} />
      </CardContent>

      <CardContent>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          startIcon={<KeyIcon />}
          loadingPosition="start"
          disabled={!enableValidateButton}
          fullWidth
          onClick={handleSubmit}
        >
          Verify
        </LoadingButton>
      </CardContent>
    </Card>
  );
}

export default OtpView;
