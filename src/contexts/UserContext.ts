import {createContext} from "react";

interface UserContextType {
  username: string | null;
  avatar: string | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

