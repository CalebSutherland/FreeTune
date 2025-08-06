import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { UserSettingsProvider } from "@/contexts/user-settings-context";

interface ProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: ProviderProps) {
  return (
    <MantineProvider>
      <UserSettingsProvider>{children}</UserSettingsProvider>
    </MantineProvider>
  );
}
