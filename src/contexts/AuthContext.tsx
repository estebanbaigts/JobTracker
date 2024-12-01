import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/api';
import { toast } from 'react-hot-toast';

interface User {
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await auth.login(email, password);
      setUser(data);
      toast.success('Successfully signed in!');
    } catch (error) {
      toast.error('Invalid credentials');
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const data = await auth.register(email, password, name);
      setUser(data);
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Registration failed');
      throw error;
    }
  };

  const logout = () => {
    auth.logout();
    setUser(null);
    toast.success('Successfully signed out!');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}