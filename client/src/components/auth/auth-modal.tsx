import { Modal } from "@mantine/core";
import { googleLogin, githubLogin, twitterLogin } from "@/api/auth";
import OAuthButton from "./oauth-button";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./auth-modal.css";
import GoogleIcon from "./google-icon";

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
      <div className="oauth-wrapper">
        <OAuthButton
          label="Sign in with Google"
          login={googleLogin}
          icon={<GoogleIcon />}
        />

        <OAuthButton
          label="Sign in with GitHub"
          login={githubLogin}
          icon={<FaGithub size={20} />}
        />

        <OAuthButton
          label="Sign in with X"
          login={twitterLogin}
          icon={<FaXTwitter size={20} />}
        />
      </div>
    </Modal>
  );
}
