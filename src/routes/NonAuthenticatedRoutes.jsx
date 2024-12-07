import { Routes, Route } from "react-router-dom";
import { NonAuthenticated } from "@layouts";
import { Login, Otp } from "@pages";

function NonAuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<NonAuthenticated />}>
        <Route path="/login" element={<Login />} />
        <Route path="/validate-otp" element={<Otp />} />
      </Route>
    </Routes>
  );
}

export default NonAuthenticatedRoutes;
