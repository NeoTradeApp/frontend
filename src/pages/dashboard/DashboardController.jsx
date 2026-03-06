import DashboardView from "./DashboardView";
import { kotakNeoApis } from "@api";

function DashboardController() {
  const getOptionsChain = () => {
    kotakNeoApis.getOptionsChain("test", "test")
  };

  return (
    <>
      <DashboardView />;
      <button onClick={getOptionsChain}> Get optoin chain </button>
    </>
  );
}

export default DashboardController;
