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
    },
    {
        name:"Valheim",
        ipAddress:"192.22.169.19",
        port:"4040",
        status:false,
        currentPlayer:0,
        maxPlayer:10
    },
    {
        name:"Starbound",
        ipAddress:"192.22.169.20",
        port:"4040",
        status:true,
        currentPlayer:4,
        maxPlayer:10
    },
    {
        name:"Conan Exile",
        ipAddress:"192.22.169.21",
        port:"4040",
        status:true,
        currentPlayer:1,
        maxPlayer:100
    },
    {
        name:"Palworld",
        ipAddress:"192.22.169.22",
        port:"4040",
        status:true,
        currentPlayer:2,
        maxPlayer:8
    },
    {
        name:"Counter Strike 2",
        ipAddress:"192.22.169.23",
        port:"4040",
        status:true,
        currentPlayer:5,
        maxPlayer:18
    },
    {
        name:"Garry's Mod",
        ipAddress:"192.22.169.24",
        port:"4040",
        status:true,
        currentPlayer:1,
        maxPlayer:20
    },
    {
        name:"Enshrouded",
        ipAddress:"192.22.169.25",
        port:"4040",
        status:false,
        currentPlayer:0,
        maxPlayer:16
    },
]

interface HemmaCard {
    name: string,
    description: string,
    image: string,
}

export const hemmaCards: Array<HemmaCard> =[
    {
        name:"Applications",
        description:"See the servers tab",
        image:"https://placehold.co/600x400"
    },
    {
        name:"Overview",
        description:"Go to test",
        image:"https://placehold.co/600x400"
    },
    {
        name:"Test",
        description:"Go to test",
        image:"https://placehold.co/600x400"
    },
    {
        name:"Test",
        description:"Go to test",
        image:"https://placehold.co/600x400"
    },
    {
        name:"Test",
        description:"Go to test",
        image:"https://placehold.co/600x400"
    },
    {
        name:"Test",
        description:"Go to test",
        image:"https://placehold.co/600x400"
    }
]