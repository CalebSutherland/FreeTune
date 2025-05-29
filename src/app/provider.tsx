import { BrowserRouter } from "react-router-dom";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
