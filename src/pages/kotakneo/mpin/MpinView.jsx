import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardContent, FormHelperText } from "@mui/material";
import { Key as KeyIcon } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { MuiOtpInput } from "mui-one-time-password-input";

const OTP_LENGTH = 6;

function MpinView(props) {
  const { onSubmit: emitSubmit } = props;

  const [mpin, setMpin] = useState("");
  const [enableValidateButton, setEnableValidateButton] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [helperText, setHelperText] = useState("");

  const submitButtonRef = useRef(null);

  useEffect(() => {
    if (enableValidateButton) {
      submitButtonRef.current?.focus();
    }
  }, [enableValidateButton]);

  const handleChange = (newValue) => {
    setMpin(newValue);
    if (newValue.length < OTP_LENGTH) {
      setEnableValidateButton(false);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);

    if (emitSubmit) {
      emitSubmit(mpin)
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

  const handleOtpComplete = () => {
    setEnableValidateButton(true);
    submitButtonRef.current?.focus();
  };

  return (
    <Card variant="blank" sx={{ m: 3, p: 2 }}>
      <CardHeader title="Verify MPIN" />

      <CardContent>
        <MuiOtpInput
          value={mpin}
          onChange={handleChange}
          length={OTP_LENGTH}
          TextFieldsProps={{ type: "password" }}
          validateChar={(text) => !isNaN(Number(text))}
          onComplete={handleOtpComplete}
          autoFocus={true}
          onKeyDown={(event) => {
            if (event.key === "Enter" && enableValidateButton) {
              handleSubmit();
            }
          }}
        />
      </CardContent>

      <CardContent>
        <FormHelperText error={error}>{helperText}</FormHelperText>
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
          ref={submitButtonRef}
        >
          Verify
        </LoadingButton>
      </CardContent>
    </Card>
  );
}

export default MpinView;
