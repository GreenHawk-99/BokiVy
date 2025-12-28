import React, {ReactNode, useState} from 'react';
import {UserService} from '../services/UserService';
import {UserContext} from "./UserContext.ts";


export const UserProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserProfile = async () => {
    try {
      const name = await UserService.fetchProfile();
      setUsername(name);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const login = async () => {
    setIsLoading(true);
    try {
      await UserService.login();
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
    <UserContext.Provider value={{username, isLoading, login, logout}}>
      {children}
    </UserContext.Provider>
  );
};

