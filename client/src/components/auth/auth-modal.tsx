import { useState } from "react";

import RegisterForm from "./register-form";
import LoginForm from "./login-form";
import GoogleLogin from "./google-login";

import { Modal, Divider } from "@mantine/core";
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
      title={isRegister ? "Sign Up" : "Login"}
    >
      <div className="google-wrapper">
        <GoogleLogin />
      </div>

      <Divider
        classNames={{ root: "divider", label: "divider-label" }}
        size="xs"
        label="or"
        labelPosition="center"
        pb="0.5rem"
      />

      {isRegister ? (
        <RegisterForm close={close} switchForm={() => setIsRegister(false)} />
      ) : (
        <LoginForm close={close} switchForm={() => setIsRegister(true)} />
      )}
    </Modal>
  );
}
