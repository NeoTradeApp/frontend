import { Routes, Route } from "react-router-dom";
import { NonAuthenticated, KotakNeoTheme } from "@layouts";
import { LoginOptions, KotakNeoLogin, KotakNeoOtp } from "@pages";

function NonAuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<NonAuthenticated />}>
        <Route path="/kotakneo" element={<KotakNeoTheme />}>
          <Route path="login" element={<KotakNeoLogin />} />
          <Route path="validate-otp" element={<KotakNeoOtp />} />
        </Route>

        <Route path="/login" element={<LoginOptions />} />
      </Route>
    </Routes>
  );
}

export default NonAuthenticatedRoutes;
