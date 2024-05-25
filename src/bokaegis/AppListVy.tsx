import '../App.scss'
import {Card, Flex, List, message, Space, Tag, Tooltip, Typography} from "antd";
import {gameServers} from "../data/data.ts";
import {CopyOutlined, MinusCircleOutlined, SyncOutlined} from "@ant-design/icons";
import {useState} from "react";
import {imageRender} from "../utils/Checker.tsx";
import {GameServer} from "../model/gameServer.ts";
import {SearchAppVy} from "./SearchAppVy.tsx";

export function AppListVy() {
    const [listSize, setListSize] = useState<number>(6);
    const [messageApi, contextHolder] = message.useMessage();

    const ipAddressAndPort = (server: GameServer) => (
        server.ipAddress + ":" + server.port
    )

    const copyhandler = (ip: string) => {
        navigator.clipboard.writeText(ip);
        messageApi.info("Copied to clipboard");
    }

    return (
        <>
            <Flex justify={"space-between"} align={"center"}>
                <Typography.Title level={2} style={{marginBlock: "1vh"}}>Server List</Typography.Title>
                <SearchAppVy listSize={listSize} setListSize={setListSize}/>
            </Flex>
            <List grid={{gutter: 16, column: listSize}}
                  dataSource={gameServers} renderItem={(server) => (
                <List.Item>
                    {
                        listSize < 8 ?
                            <Card className={"server-card"}
                                  bordered={true}
                                  cover={imageRender(server.name)
                                  }>
                                <div>
                                    <Typography.Title level={3} style={{marginTop: "0"}}>{server.name}</Typography.Title>
                                    <Flex vertical={true} gap={"1vh"}>
                                        <Flex justify={"space-between"}>
                                            <Space>
                                                <Typography.Text strong={true}>
                                                    Status:
                                                </Typography.Text>
                                                <Tag icon={server.status ? <SyncOutlined spin /> : <MinusCircleOutlined />}
                                                    color={server.status ? "green" : "red"}>{server.status ? "Running" : "Closed"}</Tag>
                                            </Space>
                                            <Space>
                                                <Typography.Text strong={true}>Player Count:</Typography.Text>
                                                <Tag
                                                    className={"player-count-tag"}>{server.currentPlayer + "/" + server.maxPlayer}</Tag>
                                            </Space>
                                        </Flex>
                                        <Space>
                                            <Typography.Text strong={true}>
                                                Ip Address:
                                            </Typography.Text>
                                            <Typography.Text italic={true}>
                                                {ipAddressAndPort(server)}
                                            </Typography.Text>
                                            {contextHolder}
                                            <CopyOutlined className={"copy-icon"} onClick={() => {
                                                copyhandler(ipAddressAndPort(server))
                                            }}/>
                                        </Space>
                                    </Flex>
                                </div>
                            </Card> : <Flex className={"image-card"}>
                                <Tooltip title={server.name} color={"#87d068"} placement={"bottom"}>{imageRender(server.name)}</Tooltip>
                            </Flex>
                    }
                </List.Item>
            )}/>
        </>
    )
}