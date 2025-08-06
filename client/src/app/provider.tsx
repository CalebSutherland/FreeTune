import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { UserSettingsProvider } from "@/contexts/user-settings-context";
import { AuthProvider } from "@/contexts/user-auth-context";

interface ProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: ProviderProps) {
  return (
    <MantineProvider>
      <AuthProvider>
        <UserSettingsProvider>{children}</UserSettingsProvider>
      </AuthProvider>
    </MantineProvider>
  );
}
