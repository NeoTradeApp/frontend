const URL = process.env.REACT_APP_BACKEND_SOCKET_URL;

function SocketService() {
  this.socket = null;
  this.subscribers = {};

  this.connect = () => {
    // if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
    if (!this.socket) {
      this.socket = new WebSocket(URL);

      this.socket.onopen = () => {
        console.log("WebSocket connected");
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
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }
  };

  this.isOpen = () => this.socket && this.socket.readyState === WebSocket.OPEN;

  this.disconnect = () => {
    if (this.isOpen()) {
      this.socket.close();
      this.socket = null;
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
}

export const socketService = new SocketService();

export default SocketService;
