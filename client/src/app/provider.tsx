import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";
import { UserSettingsProvider } from "@/contexts/user-settings-context";
import { AuthProvider } from "@/contexts/user-auth-context";
import { Notifications } from "@mantine/notifications";

interface ProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: ProviderProps) {
  return (
    <MantineProvider>
      <Notifications />
      <AuthProvider>
        <UserSettingsProvider>{children}</UserSettingsProvider>
      </AuthProvider>
    </MantineProvider>
  );
}
