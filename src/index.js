import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "@redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { setAuthInterceptors } from "./api/interceptors";
import { subscribeMarketFeed } from "./services/marketFeedService";

setAuthInterceptors();
subscribeMarketFeed();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
