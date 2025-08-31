import {
  backtest
} from "@api";
import BacktestView from "./BacktestView";

function BacktestController() {
  const handleSubmit = async (params) => {
    await backtest(params);
  };

  return <BacktestView onSubmit={handleSubmit} />;
}

export default BacktestController;
