const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(email: string, password: string) {
  const result = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await result.json();

  if (!result.ok) {
    throw new Error(data.error || "Registration failed");
  }

  return data;
}

export async function loginUser(email: string, password: string) {
  const result = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await result.json();

  if (!result.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data;
}
