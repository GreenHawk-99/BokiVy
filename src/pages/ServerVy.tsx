import {Card, Flex, List, Space, Table, Tag, Tooltip, Typography} from "antd";
import {CopyOutlined, MinusCircleOutlined, SyncOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {imageRender} from "../utils/cover.tsx";
import {GameServer} from "../models/gameServer.ts";
import {Multifalt, ViewType} from "../components/Multifalt.tsx";
import {useDataKrok, useMessageKrok} from "../hooks/useContext.ts";
import {ColumnsType} from "antd/es/table";

/**
 * Component to display a list of game servers.
 */
export function ServerVy() {
  const [listSize, setListSize] = useState<number>(8);
  const [viewType, setViewType] = useState<ViewType>('kort');
  const {servers} = useDataKrok();
  const [filteredServers, setFilteredServers] = useState<GameServer[]>([]);
  const messageApi = useMessageKrok();
  const {t} = useTranslation();

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
    void messageApi.info(t('common.copyToClipboard'));
  }

  const columns: ColumnsType<GameServer> = [
    {
      title: t('common.name'),
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Tag icon={status ? <SyncOutlined spin/> : <MinusCircleOutlined/>}
             color={status ? "green" : "red"}>{status ? t('common.running') : t('common.offline')}</Tag>
      ),
    },
    {
      title: t('common.players'),
      key: 'players',
      render: (_, record) => (
        <Tag className={"player-count-tag"}>{record.currentPlayer + "/" + record.maxPlayer}</Tag>
      ),
    },
    {
      title: t('common.ipAddress'),
      key: 'ipAddress',
      render: (_, record) => (
        <Space>
          <Typography.Text copyable={{ text: ipAddressAndPort(record), onCopy: () => void messageApi.info(t('common.copyToClipboard')) }}>
            {ipAddressAndPort(record)}
          </Typography.Text>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Flex justify={"space-between"} align={"flex-end"}>
        <Multifalt listSize={listSize} setListSize={setListSize} onSearch={handleSearch} viewType={viewType} setViewType={setViewType}/>
      </Flex>
      {viewType === 'tabell' ? (
        <Table
          dataSource={filteredServers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          style={{ marginTop: '2vh' }}
        />
      ) : (
        <List grid={{gutter: 16, column: listSize}}
              dataSource={filteredServers} renderItem={(server) => (
          <List.Item>
            {
              listSize < 12 ?
                <Card className={"server-card"}
                      variant={'outlined'}
                      cover={imageRender(server.name)
                      }>
                  <div>
                    <Typography.Title level={3} style={{marginTop: "0"}}>{server.name}</Typography.Title>
                    <Flex vertical={true} gap={"1vh"}>
                      <Flex justify={"space-between"}>
                        <Space>
                          <Typography.Text strong={true}>
                            {t('common.status')}:
                          </Typography.Text>
                          <Tag icon={server.status ? <SyncOutlined spin/> : <MinusCircleOutlined/>}
                               color={server.status ? "green" : "red"}>{server.status ? t('common.running') : t('common.offline')}</Tag>
                        </Space>
                        <Space>
                          <Typography.Text strong={true}>{t('common.playerCount')}:</Typography.Text>
                          <Tag
                            className={"player-count-tag"}>{server.currentPlayer + "/" + server.maxPlayer}</Tag>
                        </Space>
                      </Flex>
                      <Space>
                        <Typography.Text strong={true}>
                          {t('common.ipAddress')}:
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
      )}
    </>
  )
}