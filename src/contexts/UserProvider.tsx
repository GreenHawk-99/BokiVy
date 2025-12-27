import React, {ReactNode, useEffect, useState} from 'react';
import {UserService} from '../services/UserService';
import {UserContext} from "./UserContext.ts";


export const UserProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkProfile = async () => {
      const name = await UserService.fetchProfile();
      setUsername(name);
      setIsLoading(false);
    };
    checkProfile();
  }, []);

  const login = async () => {
    setIsLoading(true);
    try {
      await UserService.login();
    } catch (err) {
      console.error("Login failed", err);
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

