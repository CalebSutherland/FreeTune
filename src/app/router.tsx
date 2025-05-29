import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import About from "./routes/about";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
