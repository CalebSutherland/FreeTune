import type { User } from "@/types/user-types";

const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(email: string, password: string) {
  const result = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await result.json();

  if (!result.ok) {
    throw new Error(data.error || "Registration failed");
  }

  return data as User;
}

export async function loginUser(email: string, password: string) {
  const result = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await result.json();

  if (!result.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data as User;
}

export function OAuthLogin() {
  window.location.href = `${API_URL}/api/auth/google`;
}

export async function logoutUser() {
  await fetch(`${API_URL}/api/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function checkSession() {
  try {
    const user = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
      credentials: "include",
    });

    if (user.ok) {
      const userData: User = await user.json();
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error checking session:", error);
    return null;
  }
}
