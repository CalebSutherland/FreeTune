import { useAuth } from "@/contexts/user-auth-context";
import { Button, Avatar, Menu } from "@mantine/core";
import { MdLogout } from "react-icons/md";
import "./login-button.css";

interface LoginButtonProps {
  open: () => void;
}

export default function LoginButton({ open }: LoginButtonProps) {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <div>
      {!isLoggedIn ? (
        <Button color="var(--accent-color)" variant="filled" onClick={open}>
          Sign In
        </Button>
      ) : (
        <Menu
          trigger="click-hover"
          openDelay={100}
          closeDelay={400}
          shadow="xs"
          width={200}
          position="bottom"
          classNames={{
            dropdown: "avatar-menu",
          }}
        >
          <Menu.Target>
            <Avatar
              classNames={{
                root: "avatar-root",
                placeholder: "avatar-placeholder",
              }}
              src={user?.picture}
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              color="red"
              rightSection={<MdLogout size={16} />}
              onClick={logout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </div>
  );
}
