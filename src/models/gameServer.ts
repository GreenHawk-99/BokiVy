/**
 * Base properties common to all game server representations.
 */
export interface BaseGameServer {
  name: string;
  game: string;
  maxPlayers: number;
}

/**
 * Model used when creating a new game server.
 * Only includes fields that the user or client provides.
 */
export type CreateGameServer = BaseGameServer

/*
export interface CreateGameServer extends BaseGameServer {
  // Additional fields for creation can be added here (e.g., ownerId)
}
*/

/**
 * Full model representing a game server as returned by the API or used for display.
 * Includes server-side generated fields and real-time status.
 */
export interface GameServer extends BaseGameServer {
  id: string;
  ipAddress: string;
  port: string;
  status: boolean;
  currentPlayer: number;
  uptime?: number; // percentage
  lastSeen?: string; // ISO date
  cpuUsage?: number; // percentage
  memoryUsage?: number; // MB
}

export interface PlayerHistory {
  timestamp: string;
  count: number;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface BackendApp {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'degraded';
  version: string;
  uptime: string;
  lastBackup?: string;
  endpoints: number;
  errorRate: number;
  responseTime: number; // ms
}