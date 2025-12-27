import {gameServers} from "../data/data.ts";
import {GameServer} from "../models/gameServer.ts";

/**
 * Service to handle game server data operations.
 */
export class ServerService {
  /**
   * Retrieves all game servers.
   */
  static getServers(): GameServer[] {
    return gameServers;
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
