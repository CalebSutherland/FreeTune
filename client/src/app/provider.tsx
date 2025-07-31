import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

interface ProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: ProviderProps) {
  return <MantineProvider>{children}</MantineProvider>;
}
