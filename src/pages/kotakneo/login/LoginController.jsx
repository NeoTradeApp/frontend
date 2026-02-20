import { useNavigate } from "react-router-dom";
import { kotakNeoApis } from "@api";
import LoginView from "./LoginView";

function LoginController() {
  const navigate = useNavigate();

  const handleSubmit = (data) =>
    new Promise((resolve, reject) => {
      const { mobileNumber, password } = data;

      kotakNeoApis.loginApi(mobileNumber, password)
        .then((data) => {
          resolve(data.message);
          navigate("/kotakneo/validate-otp");
        })
        .catch((error) => reject(error.message));
    });

  return <LoginView onSubmit={handleSubmit} />;
}

export default LoginController;
