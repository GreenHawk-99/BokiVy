import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserService } from '../services/UserService';

interface UserContextType {
  username: string | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    UserService.fetchProfile()
      .then(name => {
        setUsername(name);
      })
      .catch(err => {
        console.error("Failed to fetch profile", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async () => {
    setIsLoading(true);
    try {
      const name = await UserService.fetchProfile();
      setUsername(name);
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUsername(null);
  };

  return (
    <UserContext.Provider value={{ username, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserVy = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserVy must be used within a UserProvider');
  }
  return context;
};
