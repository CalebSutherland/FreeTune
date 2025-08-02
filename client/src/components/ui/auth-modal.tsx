import { useState } from "react";

import { Button, Modal, PasswordInput, TextInput } from "@mantine/core";
import "./auth-modal.css";

interface AuthModalProps {
  opened: boolean;
  close: () => void;
}

export default function AuthModal({ opened, close }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Modal
      classNames={{
        content: "modal-content",
        header: "modal-header",
        close: "modal-close",
      }}
      opened={opened}
      onClose={close}
      title="Authentication"
    >
      <TextInput
        classNames={{ input: "text-input" }}
        label="Username"
        withAsterisk
        placeholder="username"
        mb="1rem"
      />
      <PasswordInput
        classNames={{ input: "text-input" }}
        label="Password"
        withAsterisk
        placeholder="password"
        mb={isRegister ? "1rem" : "2rem"}
      />
      {isRegister && (
        <PasswordInput
          classNames={{ input: "text-input" }}
          label="Confirm Password"
          withAsterisk
          placeholder="password"
          mb="2rem"
        />
      )}
      <div className="auth-footer">
        <button
          className="register-button"
          onClick={() => {
            setIsRegister((prev) => !prev);
          }}
        >
          {isRegister
            ? "Have an account? Login"
            : "Don't have an account? Sign up"}
        </button>
        <Button color="var(--accent-color)">
          {isRegister ? "Sign up" : "Login"}
        </Button>
      </div>
    </Modal>
  );
}
