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
        const { type, data } = JSON.parse(event.data);
        notifySubscribers(type, data);
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

  this.subscribe = (callback, type = "message") => {
    this.subscribers[type] ||= [];
    this.subscribers[type].push(callback);
    return () => {
      this.subscribers[type] = this.subscribers[type].filter(
        (cb) => cb !== callback
      );
    };
  };

  const notifySubscribers = (type, data) => {
    this.subscribers[type] ||= [];
    this.subscribers[type].forEach((callback) => callback(data));
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
