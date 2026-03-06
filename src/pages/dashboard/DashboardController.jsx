import DashboardView from "./DashboardView";
import { kotakNeoApis } from "@api";

function DashboardController() {
  const getOptionsChain = () => {
    kotakNeoApis.getOptionsChain("test", "test")
  };

  return (
    <DashboardView />
  );
}

export default DashboardController;
