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
  static async fetchProfile(): Promise<string | null> {
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
      return data.username;
    } catch (error) {
      console.error("UserService: Error fetching profile", error);
      return null;
    }
  }
}
