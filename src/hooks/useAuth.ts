import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthUser } from "@/types";
import {
  login as authLogin,
  logout as authLogout,
  isAuthenticated,
  getCurrentUser
} from "@/lib/auth";

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    if (isAuthenticated()) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    const authToken = authLogin(username, password);

    if (authToken) {
      setUser(authToken.user);
      return true;
    }

    return false;
  };

  const logout = () => {
    authLogout();
    setUser(null);
    navigate("/login");
  };

  return {
    user,
    loading,
    isAuthenticated: isAuthenticated(),
    login,
    logout,
  };
};
