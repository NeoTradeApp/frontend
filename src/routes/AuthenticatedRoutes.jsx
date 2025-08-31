import { Routes, Route } from "react-router-dom";
import { Authenticated } from "@layouts";
import { Dashboard, Backtest } from "@pages";

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<Authenticated />}>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/backtest" element={<Backtest />} />
      </Route>
    </Routes>
  );
}

export default AuthenticatedRoutes;
