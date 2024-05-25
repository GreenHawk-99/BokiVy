import {BackendApp, Game, GameServer, PlayerHistory} from "../models/gameServer.ts";

export const gameServers: Array<GameServer> = [
  {
    id: "1",
    name: "Goon Rising",
    game: "V Rising",
    ipAddress: "192.22.169.12",
    port: "4040",
    status: true,
    currentPlayer: 8,
    maxPlayers: 10,
    uptime: 98.5,
    lastSeen: new Date().toISOString(),
    cpuUsage: 12.5,
    memoryUsage: 1024,
  },
  {
    id: "2",
    name: "Abiotic Edge",
    game: "Abiotic Factor",
    ipAddress: "192.22.169.13",
    port: "4040",
    status: true,
    currentPlayer: 4,
    maxPlayers: 12,
    uptime: 99.2,
    lastSeen: new Date().toISOString(),
    cpuUsage: 8.1,
    memoryUsage: 512,
  },
  {
    id: "3",
    name: "3 week hype",
    game: "Minecraft",
    ipAddress: "192.22.169.14",
    port: "4040",
    status: true,
    currentPlayer: 16,
    maxPlayers: 24,
    uptime: 95.8,
    lastSeen: new Date().toISOString(),
    cpuUsage: 45.2,
    memoryUsage: 4096,
  },
  {
    id: "4",
    name: "Astrogoon",
    game: "Astroneer",
    ipAddress: "192.22.169.15",
    port: "4040",
    status: true,
    currentPlayer: 4,
    maxPlayers: 4,
    uptime: 100,
    lastSeen: new Date(Date.now() - 3600000).toISOString(),
    cpuUsage: 2.3,
    memoryUsage: 256,
  },
  {
    id: "5",
    name: "Edge Kepper",
    game: "Core Kepper",
    ipAddress: "192.22.169.16",
    port: "4040",
    status: false,
    currentPlayer: 0,
    maxPlayers: 8,
    uptime: 85.0,
    lastSeen: new Date(Date.now() - 86400000).toISOString(),
    cpuUsage: 0,
    memoryUsage: 0,
  },
  {
    id: "6",
    name: "Project Goonoid",
    game: "Project Zomboid",
    ipAddress: "192.22.169.17",
    port: "4040",
    status: false,
    currentPlayer: 0,
    maxPlayers: 40
  },
  {
    id: "7",
    name: "Factory must grow",
    game: "Factorio",
    ipAddress: "192.22.169.18",
    port: "4040",
    status: true,
    currentPlayer: 6,
    maxPlayers: 12
  },
  {
    id: "8",
    name: "Weking",
    game: "Valheim",
    ipAddress: "192.22.169.19",
    port: "4040",
    status: false,
    currentPlayer: 0,
    maxPlayers: 10
  },
  {
    id: "9",
    name: "Starbros",
    game: "Starbound",
    ipAddress: "192.22.169.20",
    port: "4040",
    status: true,
    currentPlayer: 4,
    maxPlayers: 10
  },
  {
    id: "10",
    name: "Dih Exile",
    game: "Conan Exile",
    ipAddress: "192.22.169.21",
    port: "4040",
    status: true,
    currentPlayer: 1,
    maxPlayers: 100
  },
  {
    id: "11",
    name: "Planut",
    game: "Palworld",
    ipAddress: "192.22.169.22",
    port: "4040",
    status: true,
    currentPlayer: 2,
    maxPlayers: 8
  },
  {
    id: "12",
    name: "Rizz surfing",
    game: "Counter Strike 2",
    ipAddress: "192.22.169.23",
    port: "4040",
    status: true,
    currentPlayer: 5,
    maxPlayers: 18
  },
  {
    id: "13",
    name: "Prop hunt: 0 aura",
    game: "Garry's Mod",
    ipAddress: "192.22.169.24",
    port: "4040",
    status: true,
    currentPlayer: 1,
    maxPlayers: 20
  },
  {
    id: "14",
    name: "Fuck_it_we_shroud",
    game: "Enshrouded",
    ipAddress: "192.22.169.25",
    port: "4040",
    status: false,
    currentPlayer: 0,
    maxPlayers: 16
  },
]

export const playerHistory: PlayerHistory[] = [
  { timestamp: "12:00", count: 12 },
  { timestamp: "13:00", count: 15 },
  { timestamp: "14:00", count: 18 },
  { timestamp: "15:00", count: 25 },
  { timestamp: "16:00", count: 32 },
  { timestamp: "17:00", count: 45 },
  { timestamp: "18:00", count: 50 },
  { timestamp: "19:00", count: 48 },
  { timestamp: "20:00", count: 55 },
  { timestamp: "21:00", count: 60 },
  { timestamp: "22:00", count: 58 },
  { timestamp: "23:00", count: 40 },
];

export const supportedGames: Game[] = [
  {
    id: "1",
    name: "Minecraft",
    description: "Build, explore, and survive in a vast open world.",
    image: "https://cdn2.steamgriddb.com/grid/726c858fb9844f1d203177e1bebdff2d.png"
  },
  {
    id: "2",
    name: "Factorio",
    description: "A sandbox game in which you build and maintain factories.",
    image: "https://cdn2.steamgriddb.com/grid/7243ae4f43952c53cdf3431a72c6077d.webp"
  },
  {
    id: "3",
    name: "Starbound",
    description: "An adventure game where you explore space and build your own world.",
    image: "https://cdn2.steamgriddb.com/grid/b4811a39a9a0d9464b7f0957014efa13.webp"
  },
  {
    id: "4",
    name: "Project Zomboid",
    description: "An open-ended zombie-infested sandbox.",
    image: "https://cdn2.steamgriddb.com/grid/13837b20f1b3dc94dad85700535f1bbd.png"
  },
  {
    id: "5",
    name: "V Rising",
    description: "Awaken as a vampire. Hunt for blood and build your castle.",
    image: "https://cdn2.steamgriddb.com/grid/6e229087fceb7bdacb84a0102f33cabe.jpg"
  },
  {
    id: "6",
    name: "Astroneer",
    description: "Explore and reshape distant worlds!",
    image: "https://cdn2.steamgriddb.com/grid/4af0e3f08d279f5e0fa660bc86b70c78.png"
  },
  {
    id: "7",
    name: "Core Keeper",
    description: "Explore an endless cavern of creatures, relics and resources.",
    image: "https://cdn2.steamgriddb.com/grid/dc24c4971d18ed50c7661e5d095f3208.jpg"
  },
  {
    id: "8",
    name: "Abiotic Factor",
    description: "A survival crafting game for 1-6 players set in an underground research facility.",
    image: "https://cdn2.steamgriddb.com/grid/bf59a016848f7a71e8af3e1ec6bc2a2d.png"
  },
  {
    id: "9",
    name: "Valheim",
    description: "A brutal exploration and survival game for 1-10 players.",
    image: "https://cdn2.steamgriddb.com/grid/4d3c78c76d23605bcb78a135cef357ae.webp"
  },
  {
    id: "10",
    name: "Counter Strike 2",
    description: "The next installment in the legendary Counter-Strike series.",
    image: "https://cdn2.steamgriddb.com/grid/0662aa1719017e0efa5fa8daf0880c6e.png"
  }
]

export const backendApps: BackendApp[] = [
  {
    id: "b1",
    name: "Yggdrasil API",
    status: 'online',
    version: "1.4.2",
    uptime: "15d 4h",
    lastBackup: new Date().toISOString(),
    endpoints: 24,
    errorRate: 0.02,
    responseTime: 45
  },
  {
    id: "b2",
    name: "Bifrost Auth",
    status: 'online',
    version: "2.1.0",
    uptime: "45d 12h",
    lastBackup: new Date(Date.now() - 3600000).toISOString(),
    endpoints: 12,
    errorRate: 0.001,
    responseTime: 12
  },
  {
    id: "b3",
    name: "Mimir Analytics",
    status: 'degraded',
    version: "0.9.5-beta",
    uptime: "2d 1h",
    endpoints: 8,
    errorRate: 4.5,
    responseTime: 350
  },
  {
    id: "b4",
    name: "Heimdall Logs",
    status: 'offline',
    version: "1.0.1",
    uptime: "0s",
    endpoints: 5,
    errorRate: 100,
    responseTime: 0
  }
];