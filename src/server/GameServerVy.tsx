import '../App.css'
import '../Style.scss'
import {Button, Card, List, Typography} from "antd";
import {gameServers} from "../data/data.ts";
import Meta from "antd/es/card/Meta";
import {AppstoreOutlined} from "@ant-design/icons";
import {useState} from "react";

export function GameServerVy() {
    const [listSize, setListSize] = useState<number>(6);

    const imageRender: { [key: string]: string } = {
        "Minecraft":                "https://cdn2.steamgriddb.com/grid/726c858fb9844f1d203177e1bebdff2d.png",
        "Factorio":                 "https://cdn2.steamgriddb.com/grid/7243ae4f43952c53cdf3431a72c6077d.webp",
        "V Rising":                 "https://cdn2.steamgriddb.com/grid/6e229087fceb7bdacb84a0102f33cabe.jpg",
        "Project Zomboid":          "https://cdn2.steamgriddb.com/grid/c885743821cce93ad525c5919aa9faa9.png",
        "Astroneer":                "https://cdn2.steamgriddb.com/grid/4af0e3f08d279f5e0fa660bc86b70c78.png",
        "Core Kepper":              "https://cdn2.steamgriddb.com/grid/dc24c4971d18ed50c7661e5d095f3208.jpg",
        "Abiotic Factor":           "https://cdn2.steamgriddb.com/grid/bf59a016848f7a71e8af3e1ec6bc2a2d.png",
        "Counter Strike 2":         "https://cdn2.steamgriddb.com/grid/0662aa1719017e0efa5fa8daf0880c6e.png",
    };

    const imageChecker = (s:string) => {
        const image = imageRender[s].valueOf()
        return (
            <img alt={s+" Thumbnail"}
                 src={image}/>
        )
    }

    const sizePool: number[] = [2, 4, 6, 8, 12, 16, 20];

    const sizeHandler = () => {
    }

    return (
        <>
            <Typography style={{fontWeight:"bold",fontSize:"large",marginBlock:"1vh"}}>Liste de servers</Typography>
            <Button type={"primary"} style={{marginBlock: "1vh"}}
            onClick={sizeHandler}><AppstoreOutlined /></Button>
            <List grid={{ gutter: 12, column: listSize }}
                  dataSource={gameServers} renderItem={(server) => (
                <List.Item>
                    <Card className={"server-card"}
                          bordered={true}
                          cover={imageChecker(server.name)}>
                        <Meta title={server.name} description={server.ipAddress+":"+server.port} />
                    </Card>
                </List.Item>
            )}/>
        </>
    )
}