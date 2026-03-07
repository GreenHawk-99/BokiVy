import {ReactNode, useEffect, useState} from 'react';
import {UserService} from '../services/UserService';
import {UserSammanhang} from "./AppContext.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {parseJwt} from "../utils/jwt.ts";


export const UserProvider = ({children}: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [steamId, setSteamId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in URL
    const token = searchParams.get('token');
    if (token) {
      const payload = parseJwt(token);
      if (payload) {
        const user = {
          steamId: payload.steam_id,
          username: payload.username || payload.steam_id,
          avatar: payload.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${payload.steam_id}`
        };

        UserService.saveToken(token);
        UserService.saveUser(user);

        setUsername(user.username);
        setAvatar(user.avatar);
        setSteamId(user.steamId);

        // Clean up URL
        navigate('/', {replace: true});
      }
    } else {
      // Check for existing session
      const storedUser = UserService.getStoredUser();
      if (storedUser) {
        setUsername(storedUser.username || storedUser.steamId);
        setAvatar(storedUser.avatar);
        setSteamId(storedUser.steamId);
      }
    }
  }, [searchParams, navigate]);

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
    UserService.logout();
    setUsername(null);
    setAvatar(null);
    setSteamId(null);
  };

  return (
    <UserSammanhang.Provider value={{username, avatar, steamId, isLoading, login, logout}}>
      {children}
    </UserSammanhang.Provider>
  );
};
