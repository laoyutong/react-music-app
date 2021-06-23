import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FastClick } from "fastclick";

FastClick.attach(document.body);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
