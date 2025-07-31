import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/app";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

window.addEventListener("DOMContentLoaded", () => {
  const tempStyle = document.getElementById("temp-theme-style");
  if (tempStyle) {
    tempStyle.remove();
  }
});
