import {GameServer} from "../model/gameServer.ts";

export const gameServers: Array<GameServer> = [
    {
        name: "V Rising",
        ipAddress:"192.22.169.12",
        port:"4040",
        status:true,
        currentPlayer: 8,
        maxPlayer: 10
    },
    {
        name: "Abiotic Factor",
        ipAddress:"192.22.169.13",
        port:"4040",
        status:true,
        currentPlayer: 4,
        maxPlayer: 12
    },
    {
        name: "Minecraft",
        ipAddress:"192.22.169.14",
        port:"4040",
        status:true,
        currentPlayer: 16,
        maxPlayer: 24
    },
    {
        name: "Astroneer",
        ipAddress:"192.22.169.15",
        port:"4040",
        status:true,
        currentPlayer: 4,
        maxPlayer: 4
    },
    {
        name: "Core Kepper",
        ipAddress:"192.22.169.16",
        port:"4040",
        status:false,
        currentPlayer: 0,
        maxPlayer: 8
    },
    {
        name: "Project Zomboid",
        ipAddress:"192.22.169.17",
        port:"4040",
        status:false,
        currentPlayer: 0,
        maxPlayer: 40
    },
    {
        name:"Factorio",
        ipAddress:"192.22.169.18",
        port:"4040",
        status:true,
        currentPlayer:6,
        maxPlayer:12

    }
]