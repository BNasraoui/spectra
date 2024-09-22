'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated (e.g., by checking local storage or a token)
    const checkAuth = () => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setIsAuthenticated(true);
        setUsername(storedUsername);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
    localStorage.setItem('username', username);
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};