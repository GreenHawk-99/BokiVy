import api from './api';
import {gameServers} from "../data/data.ts";
import {GameServer} from "../models/gameServer.ts";

/**
 * Service to handle game server data operations.
 */
export class ServerService {
  /**
   * Retrieves all game servers from the mock data.
   */
  static getMockServers(): GameServer[] {
    return gameServers;
  }

  /**
   * Retrieves all game servers from the backend API.
   */
  static async getServers(): Promise<GameServer[]> {
    const response = await api.get('/servers');
    return response.data;
  }

  /**
   * Creates a new game server.
   */
  static async createServer(server: GameServer): Promise<GameServer> {
    const response = await api.post('/servers', server);
    return response.data;
  }

  /**
   * Updates an existing game server.
   * Note: Assumes the server object has an 'id' or one is provided.
   * Since GameServer interface doesn't have an ID, we use IP as a placeholder or expect it in the URL.
   */
  static async updateServer(id: string, server: Partial<GameServer>): Promise<GameServer> {
    const response = await api.put(`/servers/${id}`, server);
    return response.data;
  }

  /**
   * Deletes a game server.
   */
  static async deleteServer(id: string): Promise<void> {
    await api.delete(`/servers/${id}`);
  }

  /**
   * Calculates statistics for a given set of game servers.
   */
  static calculateStats(servers: GameServer[]) {
    const onlineServers = servers.filter(s => s.status).length;
    const totalPlayers = servers.reduce((acc, s) => acc + s.currentPlayer, 0);
    const maxPlayers = servers.reduce((acc, s) => acc + s.maxPlayer, 0);

    return {
      total: servers.length,
      online: onlineServers,
      offline: servers.length - onlineServers,
      totalPlayers,
      maxPlayers
    };
  }
}

/*
suggestions

import { UserService } from './UserService';

// ... existing code ...

export const ServerService = {
  getServers: async () => {
    const steamId = UserService.getStoredSteamId();

    const response = await fetch('http://localhost:5000/api/servers', {
      headers: {
        'Authorization': `Bearer ${steamId}`, // Header version
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  },

  // ... existing code ...
};
 */
