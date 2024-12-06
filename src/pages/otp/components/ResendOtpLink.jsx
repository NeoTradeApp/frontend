import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormHelperText, Link } from "@mui/material";

function ResendOtpLink(props) {
  const navigate = useNavigate();
  const { onClick: emitClick, interval = 30 } = props;

  const [isClickable, setIsClickable] = useState(false);
  const [resendText, setResendText] = useState("Resend");

  const startResendTimer = (seconds) => {
    if (seconds <= 0) {
      setResendText("Resend");
      setIsClickable(true);
      return;
    }

    setIsClickable(false);
    setResendText(`Resend OTP in ${seconds} seconds`);

    setTimeout(() => startResendTimer(seconds - 1), 1000);
  };

  const handleClick = () => {
    startResendTimer(interval);

    if (emitClick) {
      emitClick().catch(() => navigate("/login"));
    }
  };

  useEffect(() => {
    startResendTimer(interval);
  }, []);

  return (
    <FormHelperText>
      {isClickable ? (
        <Link href="#" onClick={handleClick}>
          {resendText}
        </Link>
      ) : (
        resendText
      )}
    </FormHelperText>
  );
}

export default ResendOtpLink;
