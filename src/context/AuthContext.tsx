'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'editor' | 'user';

interface User {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  loginWithCredentials: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const roleMockUsers: Record<UserRole, User> = {
  admin: {
    name: 'Karthik R',
    email: 'karthik@youngdemocrats.org',
    role: 'admin'
  },
  editor: {
    name: 'Anitha V',
    email: 'anitha@youngdemocrats.org',
    role: 'editor'
  },
  user: {
    name: 'Selvam K',
    email: 'selvam@gmail.com',
    role: 'user'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let initialUser: User | null = null;
    const savedUserJson = localStorage.getItem('yd_user_session');
    if (savedUserJson) {
      try {
        const parsed = JSON.parse(savedUserJson);
        if (parsed && parsed.role) {
          initialUser = parsed;
        }
      } catch {
        // ignore parse error
      }
    }
    if (!initialUser) {
      const savedRole = localStorage.getItem('yd_user_role') as UserRole;
      if (savedRole === 'admin' || savedRole === 'editor' || savedRole === 'user') {
        initialUser = roleMockUsers[savedRole];
      }
    }
    setUser(initialUser);
    setIsLoading(false);
  }, []);

  const login = (role: UserRole) => {
    const mockUser = roleMockUsers[role];
    setUser(mockUser);
    localStorage.setItem('yd_user_role', role);
    localStorage.setItem('yd_user_session', JSON.stringify(mockUser));
  };

  const loginWithCredentials = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        localStorage.setItem('yd_user_role', data.user.role);
        localStorage.setItem('yd_user_session', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Authentication failed' };
      }
    } catch {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yd_user_role');
    localStorage.removeItem('yd_user_session');
  };

  const setRole = (role: UserRole) => {
    login(role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithCredentials,
        logout,
        setRole,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
