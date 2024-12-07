import React from "react";
import NonAuthenticatedRoutes from "./NonAuthenticatedRoutes";
import AuthenticatedRoutes from "./AuthenticatedRoutes";

function AppRoutes() {
  return (
    <>
      <NonAuthenticatedRoutes />
      <AuthenticatedRoutes />
    </>
  );
}

export default AppRoutes;
