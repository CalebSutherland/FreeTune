import "./oauth-button.css";

interface OAuthButtonProps {
  icon: React.ReactNode;
  label: string;
  login: () => void;
}

export default function OAuthButton({ icon, label, login }: OAuthButtonProps) {
  return (
    <button className="oauth-button" onClick={login}>
      <div className="oauth-content-wrapper">
        <div className="oauth-icon">{icon}</div>
        <div className="oauth-content">{label}</div>
      </div>
    </button>
  );
}
