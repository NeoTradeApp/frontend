import { useNavigate } from "react-router-dom";
import LoginOptionsView from "./LoginOptionsView";

function LoginOptionsController() {
  const navigate = useNavigate();

  return <LoginOptionsView />;
}

export default LoginOptionsController;
