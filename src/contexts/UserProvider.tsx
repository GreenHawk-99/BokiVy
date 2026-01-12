import React, {ReactNode, useState} from 'react';
import {UserService} from '../services/UserService';
import {UserContext} from "./UserContext.ts";


export const UserProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setAvatar(null);
  };

  return (
    <UserContext.Provider value={{username, avatar, isLoading, login, logout}}>
      {children}
    </UserContext.Provider>
  );
};

/*
suggestions

import React, { useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserService } from '../services/UserService';
import { UserContext } from './UserContext';

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  const verifyAndLogin = async (steamId: string) => {
    setIsLoading(true);
    const profile = await UserService.fetchProfile(steamId);
    if (profile) {
      UserService.saveSteamId(steamId);
      setUsername(profile.username);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // 1. Extract from URL if we are on the success page
    const params = new URLSearchParams(location.search);
    const steamIdFromUrl = params.get('steamid');

    if (location.pathname === '/login/success' && steamIdFromUrl) {
      verifyAndLogin(steamIdFromUrl).then(() => {
        navigate('/', { replace: true }); // Clean up the URL
      });
    } else {
      // 2. Otherwise, check localStorage for existing session
      const storedId = UserService.getStoredSteamId();
      if (storedId) {
        verifyAndLogin(storedId);
      } else {
        setIsLoading(false);
      }
    }
  }, [location.pathname]); // Re-run when path changes

  const logout = () => {
    UserService.logout();
    setUsername(null);
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ username, isLoading, logout, login: async () => { window.location.href = 'http://localhost:5000/api/auth/steam'; } }}>
      {children}
    </UserContext.Provider>
  );
};
 */