import {GameServer} from "../models/gameServer.ts";
import {gameServers} from "../data/data.ts";

/**
 * A mock service that simulates CRUD operations for game servers.
 * It uses the initial data from data.ts and keeps an in-memory state.
 */
class MockServerService {
  private servers: GameServer[] = [...gameServers];

  /**
   * Retrieves all game servers.
   */
  async getAll(): Promise<GameServer[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.servers]);
      }, 500); // Simulate network delay
    });
  }

  /**
   * Retrieves a game server by ID.
   */
  async getById(id: string): Promise<GameServer | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.servers.find((s: GameServer): boolean => s.id === id));
      }, 300);
    });
  }

  /**
   * Creates a new game server.
   */
  async create(server: GameServer): Promise<GameServer> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newServer: GameServer = {...server};
        if (!newServer.id) {
          newServer.id = Math.random().toString(36).substr(2, 9);
        }
        this.servers.push(newServer);
        resolve(newServer);
      }, 400);
    });
  }

  /**
   * Updates an existing game server.
   */
  async update(id: string, serverData: Partial<GameServer>): Promise<GameServer> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.servers.findIndex(s => s.id === id);
        if (index !== -1) {
          this.servers[index] = {...this.servers[index], ...serverData};
          resolve(this.servers[index]);
        } else {
          reject(new Error(`Server with id ${id} not found`));
        }
      }, 400);
    });
  }

  /**
   * Deletes a game server.
   */
  async delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.servers.findIndex(s => s.id === id);
        if (index !== -1) {
          this.servers.splice(index, 1);
          resolve();
        } else {
          reject(new Error(`Server with id ${id} not found`));
        }
      }, 300);
    });
  }
}

export const mockServerService = new MockServerService();
