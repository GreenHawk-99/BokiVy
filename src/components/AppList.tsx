import '../App.scss'
import {Card, Flex, List, Space, Tag, Tooltip, Typography} from "antd";
import {CopyOutlined, MinusCircleOutlined, SyncOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {imageRender} from "../utils/Checker.tsx";
import {GameServer} from "../models/gameServer.ts";
import {SearchApp} from "./SearchApp.tsx";
import {useMessageVy} from "../hooks/useMessageVy";
import {useDataVy} from "../hooks/useDataVy";

/**
 * Component to display a list of game servers.
 */
export function AppList() {
  const [listSize, setListSize] = useState<number>(8);
  const { servers } = useDataVy();
  const [filteredServers, setFilteredServers] = useState<GameServer[]>([]);
  const messageApi = useMessageVy();

  useEffect(() => {
    setFilteredServers(servers);
  }, [servers]);

  /**
   * Filters the server list based on the search term.
   */
  const handleSearch = (value: string) => {
    const filtered = servers.filter(server =>
      server.name.toLowerCase().includes(value.toLowerCase()) ||
      server.ipAddress.includes(value)
    );
    setFilteredServers(filtered);
  };

  const ipAddressAndPort = (server: GameServer) => (
    server.ipAddress + ":" + server.port
  )

  /**
   * Copies the server IP and port to the clipboard.
   */
  const copyhandler = (ip: string) => {
    void navigator.clipboard.writeText(ip);
    messageApi.info("Copied to clipboard");
  }

  return (
    <>
      <Flex justify={"space-between"} align={"center"}>
        <Typography.Title level={2} style={{marginBlock: "1vh"}}>Server List</Typography.Title>
        <SearchApp listSize={listSize} setListSize={setListSize} onSearch={handleSearch}/>
      </Flex>
      <List grid={{gutter: 16, column: listSize}}
            dataSource={filteredServers} renderItem={(server) => (
        <List.Item>
          {
            listSize < 12 ?
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
                        <Tag icon={server.status ? <SyncOutlined spin/> : <MinusCircleOutlined/>}
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