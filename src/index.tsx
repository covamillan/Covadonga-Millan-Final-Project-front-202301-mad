import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import Provider from "react-redux/es/components/Provider";
import { store } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
