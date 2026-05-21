import { Routes, Route } from "react-router-dom";
import { Authenticated } from "@layouts";
import { Dashboard, Backtest, Strategies, PnlReports } from "@pages";

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<Authenticated />}>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/active-strategies" element={<Strategies />} />
        <Route path="/reports">
          <Route path="pnl" element={<PnlReports />} />
        </Route>
        <Route path="/backtest" element={<Backtest />} />
      </Route>
    </Routes>
  );
}

export default AuthenticatedRoutes;
