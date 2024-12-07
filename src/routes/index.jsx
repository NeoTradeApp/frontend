import React from "react";
import { Routes, Route } from "react-router-dom";
import { NonAuthenticated, Authenticated } from "@layouts";
import { Login, Otp, Dashboard } from "@pages";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<NonAuthenticated />}>
        <Route path="/login" element={<Login />} />
        <Route path="/validate-otp" element={<Otp />} />
      </Route>
      <Route element={<Authenticated />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
