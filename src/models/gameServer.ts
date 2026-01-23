export interface GameServer {
  id: string,
  name: string,
  ipAddress: string,
  port: string
  status: boolean
  currentPlayer: number,
  maxPlayer: number
}