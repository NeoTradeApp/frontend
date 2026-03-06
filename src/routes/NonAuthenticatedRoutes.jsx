import { Routes, Route } from "react-router-dom";
import { NonAuthenticated, KotakNeoTheme } from "@layouts";
import { LoginOptions, KotakNeoLogin, KotakNeoMpin } from "@pages";

function NonAuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<NonAuthenticated />}>
        <Route path="/kotakneo" element={<KotakNeoTheme />}>
          <Route path="login" element={<KotakNeoLogin />} />
          <Route path="validate-mpin" element={<KotakNeoMpin />} />
        </Route>

        <Route path="/login" element={<LoginOptions />} />
      </Route>
    </Routes>
  );
}

export default NonAuthenticatedRoutes;
