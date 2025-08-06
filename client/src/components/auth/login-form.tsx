import { useForm } from "react-hook-form";
import { loginUser, OAuthLogin } from "@/api/auth";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useAuth } from "@/contexts/user-auth-context";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm({
  close,
  switchForm,
}: {
  close: () => void;
  switchForm: () => void;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await loginUser(data.email, data.password);
      login(user);
      close();
    } catch (err) {
      console.error("Login error:", err);

      const message = "Invalid credentials";
      setError("email", { type: "manual", message });
      setError("password", { type: "manual", message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Email"
        withAsterisk
        placeholder="you@example.com"
        {...register("email")}
        error={errors.email?.message}
        mb="1rem"
      />

      <PasswordInput
        label="Password"
        withAsterisk
        placeholder="password"
        {...register("password")}
        error={errors.password?.message}
        mb="2rem"
      />

      <Button color="var(--accent-color)" onClick={() => OAuthLogin()}>
        Google
      </Button>

      <div className="auth-footer">
        <button className="register-button" type="button" onClick={switchForm}>
          Don't have an account? Sign up
        </button>
        <Button color="var(--accent-color)" type="submit">
          Login
        </Button>
      </div>
    </form>
  );
}
