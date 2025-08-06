import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/types/auth-schemas";
import { registerUser } from "@/api/auth";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useAuth } from "@/contexts/user-auth-context";

export default function RegisterForm({
  close,
  switchForm,
}: {
  close: () => void;
  switchForm: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { login } = useAuth();

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const user = await registerUser(data.email, data.password);
      login(user);
      close();
    } catch (err) {
      console.error("Register error:", err);

      if (err instanceof Error && err.message.includes("User already exists")) {
        setError("email", {
          type: "manual",
          message: "This email is already registered.",
        });
      }
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
        mb="1rem"
      />

      <PasswordInput
        label="Confirm Password"
        withAsterisk
        placeholder="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
        mb="2rem"
      />

      <div className="auth-footer">
        <button className="register-button" type="button" onClick={switchForm}>
          Have an account? Login
        </button>
        <Button color="var(--accent-color)" type="submit">
          Sign Up
        </Button>
      </div>
    </form>
  );
}
