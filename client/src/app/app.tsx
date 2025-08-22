import AppProvider from "./provider";
import AppRouter from "./router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./app.css";

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
      <Analytics />
      <SpeedInsights />
    </AppProvider>
  );
}
