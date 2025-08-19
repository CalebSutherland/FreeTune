import type { User } from "@/types/user-types";

const API_URL = import.meta.env.VITE_API_URL;

export function googleLogin() {
  window.location.href = `${API_URL}/api/auth/google`;
}

export function githubLogin() {
  window.location.href = `${API_URL}/api/auth/github`;
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
