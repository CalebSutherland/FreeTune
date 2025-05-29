import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Provider from "./app/provider";
import App from "./app/app";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
