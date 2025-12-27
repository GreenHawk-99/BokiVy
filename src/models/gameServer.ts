export interface GameServer {
  name: string,
  ipAddress: string,
  port: string
  status: boolean
  currentPlayer: number,
  maxPlayer: number
}