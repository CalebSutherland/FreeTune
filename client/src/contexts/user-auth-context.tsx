import React, { createContext, useContext, useState, useEffect } from "react";

import type { AuthContextType, User } from "@/types/user-types";
import { checkSession, logoutUser } from "@/api/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isFirstAlert, setIsFirstAlert] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession()
      .then((user) => {
        setUser(user);
        if (user) setIsFirstAlert(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsFirstAlert(false);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    window.location.href = "/";
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    isFirstAlert,
    setIsFirstAlert,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
