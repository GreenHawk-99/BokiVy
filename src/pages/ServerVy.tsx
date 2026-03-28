import {Flex, List, Space, Table, Tag, Typography} from "antd";
import {MinusCircleOutlined, SyncOutlined} from "@ant-design/icons";
import {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import {GameServer} from "../models/gameServer.ts";
import {Multifalt} from "../components/Multifalt.tsx";
import {useDataSammanhang, useMessageSammanhang} from "../hooks/useContext.ts";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";
import {ColumnsType} from "antd/es/table";
import {ViewType} from "../types/component.ts";
import {ServerKord} from "../components/ServerKord.tsx";

/**
 * Component to display a list of game servers.
 */
export const ServerVy = () => {
  const {servers, loading} = useDataSammanhang();
  const location = useLocation();
  const [viewType, setViewType] = useLocalStorage<ViewType>('viewType', 'cart');
  const [filteredServers, setFilteredServers] = useState<GameServer[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const messageApi = useMessageSammanhang();
  const {t} = useTranslation();

  useEffect(() => {
    if (location.state && (location.state as any).filter === 'online') {
      setStatusFilter('online');
    }
  }, [location.state]);

  const applyFilters = useCallback((search: string, status: string, serverList: GameServer[]) => {
    let filtered = serverList.filter(server =>
      server.name.toLowerCase().includes(search.toLowerCase()) ||
      server.ipAddress.includes(search)
    );

    if (status === 'online') {
      filtered = filtered.filter(server => server.status);
    } else if (status === 'offline') {
      filtered = filtered.filter(server => !server.status);
    }

    setFilteredServers(filtered);
  }, []);

  useEffect(() => {
    applyFilters(searchText, statusFilter, servers);
  }, [servers, searchText, statusFilter, applyFilters]);

  /**
   * Filters the server list based on the search term.
   */
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const ipAddressAndPort = (server: GameServer) => (
    server.ipAddress + ":" + server.port
  )

  const columns: ColumnsType<GameServer> = [
    {
      title: t('common.game'),
      dataIndex: 'game',
      key: 'game',
      render: (game) => <Typography.Text strong>{game}</Typography.Text>,
      filters: Array.from(new Set(servers.map(s => s.game))).map(game => ({text: game, value: game})),
      onFilter: (value, record) => record.game === value,
    },
    {
      title: t('common.name'),
      dataIndex: 'name',
      key: 'name',
      render: (name) => <Typography.Text strong>{name}</Typography.Text>,
      sorter: (a: GameServer, b: GameServer) => a.name.localeCompare(b.name),
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Tag icon={status ? <SyncOutlined spin/> : <MinusCircleOutlined/>}
             color={status ? "green" : "red"}>{status ? t('common.running') : t('common.offline')}</Tag>
      ),
      filters: [
        {text: t('common.running'), value: true},
        {text: t('common.offline'), value: false},
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: t('common.players'),
      key: 'players',
      render: (_, record) => (
        <Tag className={"player-count-tag"}>{record.currentPlayer + "/" + record.maxPlayers}</Tag>
      ),
    },
    {
      title: t('common.ipAddress'),
      key: 'ipAddress',
      render: (_, record) => (
        <Space>
          <Typography.Text code={true} copyable={{
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
        <Multifalt
          onSearch={handleSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          viewType={viewType}
          setViewType={setViewType}
        />
      </Flex>
      {viewType === 'table' ? (
        <Table
          loading={loading}
          rowKey={'id'}
          dataSource={filteredServers}
          columns={columns}
          pagination={{pageSize: 10}}
          bordered={true}
        />
      ) : (
        <List grid={{gutter: 16, xs: 4, sm: 4, md: 6, lg: 6, xl: 8, xxl: 8}}
              loading={loading}
              dataSource={filteredServers} renderItem={(server: GameServer) => (
          <List.Item>
            <ServerKord server={server}/>
          </List.Item>
        )}/>
      )}
    </>
  )
}