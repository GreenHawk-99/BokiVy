/**
 * Service to handle user-related data operations, such as Steam profile integration.
 */
export class UserService {
  static async login(): Promise<void> {
    window.location.href = 'http://localhost:5000/api/auth/steam';
  }

  /**
   * Fetches the user profile from the backend API.
   * Currently, mocks the response if the backend is not available.
   */
  static async fetchProfile(): Promise<{ username: string, avatar: string } | null> {
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status === 401) {
          return null; // Not logged in
        }
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return {
        username: data.username,
        avatar: data.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + data.username
      };
    } catch (error) {
      console.error("UserService: Error fetching profile", error);
      return null;
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
