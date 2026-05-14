import {
  store,
  updateAllPositions,
  updatePosition,
  updateOrder,
  updateAllOrders,
  openSnackbar,
} from "@redux";
import { socketService } from "./socketService";
import { WEB_SOCKET } from "@constants";
import { getStrategies } from "@api";
import { alarmService } from "@services";
import { debounceWithBurst } from "@utils";

export const subscribePositionUpdate = () => {
  getStrategies().then((response) => {
    const { data: strategies } = response || {};
    if (!strategies) return;

    const allPositions = [];
    const allOrders = [];

    strategies?.forEach((strategy) => {
      strategy.positions?.forEach((position) => {
        allPositions.push(position);
        position.orders?.forEach((order) => allOrders.push(order));
      });
    });

    store.dispatch(updateAllPositions(allPositions));
    store.dispatch(updateAllOrders(allOrders));
  });

  const dispatchPositions = debounceWithBurst((positions) => {
    store.dispatch(updatePosition(positions))
  }, 1000);

  const dispatchOrders = debounceWithBurst((orders) => {
    store.dispatch(updateOrder(orders))
  }, 1000);

  const unsubscribePositionUpdate = socketService.subscribe(
    WEB_SOCKET.MESSAGE_TYPE.POSITION.UPDATE("([\\w-_]+)", "([\\w-_]+)"),
    (position) => {
      if (!position?.id) return;

      if (position.status === "CLOSED") {
        if (position.pnl > 0) {
          store.dispatch(openSnackbar(`Trade exit with profit: ₹ ${position.pnl?.toFixed(2)}`));
          alarmService.playProfitSound()
        } else {
          store.dispatch(openSnackbar(`Trade exit with loss: ₹ ${position.pnl?.toFixed(2)}`));
          alarmService.playLossSound();
        }
      }

      dispatchPositions((prevPositions) => prevPositions ? [...prevPositions, position] : [position]);

      const orders = position.orders || [];
      dispatchOrders((prevOrders) => prevOrders ? [...prevOrders, ...orders] : orders);
    }
  );

  const unsubscribePositionNew = socketService.subscribe(
    WEB_SOCKET.MESSAGE_TYPE.POSITION.NEW(`([\\w-_]+)`),
    (newPosition) => {
      if (!newPosition?.id) return;

      store.dispatch(openSnackbar(`New trade entry: ${newPosition.name}`));
      alarmService.playOrderPlaceSound();
    }
  );

  return () => {
    unsubscribePositionUpdate();
    unsubscribePositionNew();
  };
};
