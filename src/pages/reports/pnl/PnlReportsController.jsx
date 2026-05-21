import { useState, useEffect } from "react";
import { WEB_SOCKET } from "@constants";
import useWebSocket from "@hooks/useWebSocket";
import PnlReportsView from "./PnlReportsView";

function PnlReportsController() {
  return <PnlReportsView />;
}

export default PnlReportsController;
