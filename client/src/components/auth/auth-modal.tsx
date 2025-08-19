import GoogleLogin from "./google-login";

import { Modal, Button } from "@mantine/core";
import { githubLogin } from "@/api/auth";
import "./auth-modal.css";

interface AuthModalProps {
  opened: boolean;
  close: () => void;
}

export default function AuthModal({ opened, close }: AuthModalProps) {
  return (
    <Modal
      classNames={{
        content: "modal-content",
        header: "modal-header",
        close: "modal-close",
      }}
      opened={opened}
      onClose={close}
      title="Sign in"
    >
      <div className="google-wrapper">
        <GoogleLogin />
      </div>

      <Button onClick={githubLogin}>Github</Button>
    </Modal>
  );
}
