import React from "react";
import ReactDOM from "react-dom/client";
import "@picocss/pico/css/pico.css";
import "@hexademo/style";
import {
  applyPolyfills,
  defineCustomElements,
} from "@hexademo/web-components/loader";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

applyPolyfills().then(() => {
  defineCustomElements(window);
});
