import {apiRegistry} from './api';
import {CreateGameServer, GameServer} from "../models/gameServer.ts";
import {mockServerService} from "../mock/MockServerService.ts";

/**
 * Service to handle game server data operations.
 */
export class ServerService {
  private static USE_MOCK: boolean = true; // Toggle this to switch between mock and real API

  private static get api() {
    return apiRegistry.get('yggdrasil');
  }

  /**
   * Retrieves all game servers.
   */
  static async getServers(): Promise<GameServer[]> {
    if (this.USE_MOCK) {
      return mockServerService.getAll();
    }
    const response = await this.api.get('/servers');
    return response.data;
  }

  /**
   * Creates a new game server.
   */
  static async createServer(server: CreateGameServer): Promise<GameServer> {
    if (this.USE_MOCK) {
      return mockServerService.create(server);
    }
    const response = await this.api.post('/servers', server);
    return response.data;
  }

  /**
   * Updates an existing game server.
   */
  static async updateServer(id: string, server: Partial<GameServer>): Promise<GameServer> {
    if (this.USE_MOCK) {
      return mockServerService.update(id, server);
    }
    const response = await this.api.put(`/servers/${id}`, server);
    return response.data;
  }

  /**
   * Deletes a game server.
   */
  static async deleteServer(id: string): Promise<void> {
    if (this.USE_MOCK) {
      return mockServerService.delete(id);
    }
    await this.api.delete(`/servers/${id}`);
  }

  /**
   * Calculates statistics for a given set of game servers.
   */
  static calculateStats(servers: GameServer[]) {
    const onlineServers = servers.filter(s => s.status).length;
    const totalPlayers = servers.reduce((acc, s) => acc + s.currentPlayer, 0);
    const maxPlayers = servers.reduce((acc, s) => acc + s.maxPlayers, 0);

    return {
      total: servers.length,
      online: onlineServers,
      offline: servers.length - onlineServers,
      totalPlayers,
      maxPlayers
    };
  }
}
