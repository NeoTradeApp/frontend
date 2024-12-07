import { Routes, Route } from "react-router-dom";
import { Authenticated } from "@layouts";
import { Dashboard } from "@pages";

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<Authenticated />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AuthenticatedRoutes;
