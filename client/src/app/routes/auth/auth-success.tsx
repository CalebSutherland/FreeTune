import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/user-auth-context";
import { checkSession } from "@/api/auth";

export default function AuthSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    async function verify() {
      const user = await checkSession();
      if (user) {
        login(user);
        navigate("/");
      } else {
        navigate("/");
      }
    }
    verify();
  }, [navigate, login]);

  return <p>Logging you in...</p>;
}
