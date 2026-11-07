import { store, setSockeStatus } from "@redux";
import { WEB_SOCKET } from "@constants";

const URL = process.env.REACT_APP_BACKEND_SOCKET_URL;

const RECONNECT_INTERVAL = 5000;

function SocketService() {
  this.socket = null;
  this.subscribers = {};

  this.shouldReconnect = false;

  this.connect = () => {
    // if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
    if (this.isOpen()) return;

    this.shouldReconnect = true;

    if (!this.socket) {
      this.socket = new WebSocket(URL);

      this.socket.onopen = () => {
        console.log("WebSocket connected");
        this.setStatus(WEB_SOCKET.STATUS.ONLINE);
      };

      this.socket.onmessage = (event) => {
        try {
          const { type, data } = JSON.parse(event.data);
          notifySubscribers(type, data);
        } catch (error) {
          console.error(error);
        }
      };

      this.socket.onclose = () => {
        console.log("WebSocket disconnected");
        this.socket = null;
        this.setStatus(WEB_SOCKET.STATUS.OFFLINE);

        if (this.shouldReconnect) {
          setTimeout(() => this.reconnect(), RECONNECT_INTERVAL);
        }
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.socket?.close();
      };
    }
  };

  this.isOpen = () => this.socket && this.socket.readyState === WebSocket.OPEN;

  this.disconnect = () => {
    if (this.isOpen()) {
      this.socket.close();
      this.socket = null;
      this.shouldReconnect = false;
    }
  };

  this.subscribe = (type, callback) => {
    this.subscribers[type] ||= [];
    this.subscribers[type].push(callback);
    return () => {
      this.subscribers[type] = this.subscribers[type].filter(
        (cb) => cb !== callback
      );
    };
  };

  const notifySubscribers = (type, data) => {
    Object.entries(this.subscribers).forEach(([regex, callbacks]) => {
      const [firstMatch] = Array.from(type.matchAll(new RegExp(regex, "g")));
      if (!firstMatch) return;

      const [patternIsMatching, ...keys] = firstMatch;
      if (patternIsMatching) {
        callbacks?.forEach((callback) => callback && callback(data, ...keys));
      }
    });
    // this.subscribers[type]?.forEach((callback) => callback(data));
  };

  this.sendMessage = (type, data) => {
    if (this.isOpen()) {
      this.socket.send(JSON.stringify({ type, data }));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  this.reconnect = () => {
    if (!this.shouldReconnect) return;

    this.setStatus(WEB_SOCKET.STATUS.CONNECTING);
    setTimeout(() => this.connect(), 2000);
  };

  this.setStatus = (status) => {
    store.dispatch(setSockeStatus(status));
  }

  this.handleVisibilityChange = () => {
    if (
      this.shouldReconnect &&
      document.visibilityState === "visible" &&
      !this.isOpen()
    ) {
      console.log("Browser active. Checking WebSocket...");
      this.connect();
    }
  };

  this.handleOnline = () => {
    if (this.shouldReconnect && !this.isOpen()) {
      this.connect();
    }
  };

  document.addEventListener("visibilitychange", this.handleVisibilityChange);
  window.addEventListener("online", this.handleOnline);
  window.addEventListener("pageshow", this.handleVisibilityChange);
}

export const socketService = new SocketService();

export default SocketService;
