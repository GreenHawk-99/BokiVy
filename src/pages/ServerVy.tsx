import {Flex, List, Space, Table, Tag, Typography} from "antd";
import {MinusCircleOutlined, SyncOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {GameServer} from "../models/gameServer.ts";
import {Multifalt} from "../components/Multifalt.tsx";
import {useDataSammanhang, useMessageSammanhang} from "../hooks/useContext.ts";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";
import {ColumnsType} from "antd/es/table";
import {ViewType} from "../type/component.ts";
import {ServerKord} from "../components/ServerKord.tsx";

/**
 * Component to display a list of game servers.
 */
export const ServerVy = () => {
  const {servers} = useDataSammanhang();
  const [viewType, setViewType] = useLocalStorage<ViewType>('viewType', 'cart');
  const [filteredServers, setFilteredServers] = useState<GameServer[]>([]);
  const messageApi = useMessageSammanhang();
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
          <Typography.Text copyable={{
            text: ipAddressAndPort(record),
            onCopy: () => void messageApi.info(t('common.copyToClipboard'))
          }}>
            {ipAddressAndPort(record)}
          </Typography.Text>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Flex justify={"space-between"} align={"flex-end"}>
        <Multifalt onSearch={handleSearch} viewType={viewType}
                   setViewType={setViewType}/>
      </Flex>
      {viewType === 'table' ? (
        <Table
          rowKey={'id'}
          dataSource={filteredServers}
          columns={columns}
          pagination={{pageSize: 10}}
          bordered={true}
        />
      ) : (
        <List grid={{gutter: 16, xs: 4, sm: 4, md: 6, lg: 6, xl: 8, xxl: 8}}
              dataSource={filteredServers} renderItem={(server:GameServer) => (
          <List.Item>
            <ServerKord server={server}/>
          </List.Item>
        )}/>
      )}
    </>
  )
}