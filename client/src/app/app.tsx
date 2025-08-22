import AppProvider from "./provider";
import AppRouter from "./router";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
