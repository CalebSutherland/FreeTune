import { useForm } from "react-hook-form";
import { loginUser } from "@/api/auth";
import { Button, PasswordInput, TextInput } from "@mantine/core";

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

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data.email, data.password);
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
