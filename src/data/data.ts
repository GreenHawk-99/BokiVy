import {Game, GameServer} from "../models/gameServer.ts";

export const gameServers: Array<GameServer> = [
  {
    id: "1",
    name: "Goon Rising",
    game: "V Rising",
    ipAddress: "192.22.169.12",
    port: "4040",
    status: true,
    currentPlayer: 8,
    maxPlayers: 10
  },
  {
    id: "2",
    name: "Abiotic Edge",
    game: "Abiotic Factor",
    ipAddress: "192.22.169.13",
    port: "4040",
    status: true,
    currentPlayer: 4,
    maxPlayers: 12
  },
  {
    id: "3",
    name: "3 week hype",
    game: "Minecraft",
    ipAddress: "192.22.169.14",
    port: "4040",
    status: true,
    currentPlayer: 16,
    maxPlayers: 24
  },
  {
    id: "4",
    name: "Astrogoon",
    game: "Astroneer",
    ipAddress: "192.22.169.15",
    port: "4040",
    status: true,
    currentPlayer: 4,
    maxPlayers: 4
  },
  {
    id: "5",
    name: "Edge Kepper",
    game: "Core Kepper",
    ipAddress: "192.22.169.16",
    port: "4040",
    status: false,
    currentPlayer: 0,
    maxPlayers: 8
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