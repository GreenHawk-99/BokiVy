import api from './api';
import axios from 'axios';

/**
 * Service to handle user-related data operations, such as Steam profile integration.
 */
export class UserService {
  static async login(): Promise<void> {
    // Note: This relies on the backend being at the same base URL or redirected.
    // Since we don't have the auth URL in the new config structure yet, 
    // we use a relative path if possible or keep it hardcoded for now if it's different.
    window.location.href = (api.defaults.baseURL || 'http://localhost:5000/api/v1') + '/auth/steam';
  }

  /**
   * Fetches the user profile from the backend API.
   * Currently, mocks the response if the backend is not available.
   */
  static async fetchProfile(): Promise<{ username: string, avatar: string } | null> {
    try {
      const response = await api.get('/auth/profile');
      const data = response.data;
      return {
        username: data.username,
        avatar: data.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + data.username
      };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return null; // Not logged in
      }
      throw new Error('Network response was not ok');
    }
  }
}


/*
suggestions

const BASE_URL = 'http://localhost:5000/api';
const STEAM_ID_KEY = 'bokivy_steam_id';

export const UserService = {
  // Get the ID from localStorage
  getStoredSteamId: (): string | null => {
    return localStorage.getItem(STEAM_ID_KEY);
  },

  // Save the ID to localStorage
  saveSteamId: (steamId: string) => {
    localStorage.setItem(STEAM_ID_KEY, steamId);
  },

  // Verify the user with the backend
  fetchProfile: async (steamId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/user/profile?steamid=${steamId}`);
      if (!response.ok) throw new Error('Failed to fetch profile');
      return await response.json(); // Assuming this returns { username: "..." }
    } catch (error) {
      console.error("Profile verification failed", error);
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem(STEAM_ID_KEY);
  }
};
 */
