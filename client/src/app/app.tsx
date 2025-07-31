import AppProvider from "./provider";
import AppRouter from "./router";
import "./app.css";

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
