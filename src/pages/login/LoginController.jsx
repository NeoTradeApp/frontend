import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/services/authService";
import LoginView from "./LoginView";

function LoginController() {
  const navigate = useNavigate();

  const handleSubmit = (data) =>
    new Promise((resolve, reject) => {
      const { mobileNumber, password } = data;

      loginApi(mobileNumber, password)
        .then((data) => {
          resolve(data.message);
          navigate("/validate-otp");
        })
        .catch((error) => reject(error.message));
    });

  return <LoginView onSubmit={handleSubmit} />;
}

export default LoginController;
