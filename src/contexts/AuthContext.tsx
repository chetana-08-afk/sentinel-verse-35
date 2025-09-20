import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  digitalId: string;
  portalType: 'tourist' | 'parent' | 'authority';
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (digitalId: string, portalType: User['portalType']) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication on app load
    const storedUser = localStorage.getItem('stse-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('stse-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (digitalId: string, portalType: User['portalType']) => {
    const newUser: User = {
      digitalId,
      portalType,
      name: `User ${digitalId.split('-')[1]}`
    };
    setUser(newUser);
    localStorage.setItem('stse-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stse-user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};