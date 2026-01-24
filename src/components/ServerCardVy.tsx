import {Card, Flex, Tag, Typography} from "antd";
import {MinusCircleOutlined, SyncOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {GameServer} from "../models/gameServer.ts";
import {useMessageSammanhang} from "../hooks/useContext.ts";
import {SmartCover} from "./SmartCover.tsx";

interface ServerCardVyProps {
  server: GameServer;
}

/**
 * A reusable card component to display game server information.
 */
export function ServerCardVy({server}: ServerCardVyProps) {
  const {t} = useTranslation();
  const messageApi = useMessageSammanhang();

  const ipAddressAndPort = `${server.ipAddress}:${server.port}`;

  return (
    <Card
      className="server-card"
      hoverable
      cover={<SmartCover gameName={server.name}/>}
      styles={{body: {padding: '16px'}}}
    >
      <Typography.Title level={4} style={{marginTop: 0, marginBottom: '12px'}} ellipsis={{tooltip: server.name}}>
        {server.name}
      </Typography.Title>

      <Flex vertical gap="small">
        <Flex justify="space-between" align="center">
          <Typography.Text type="secondary">{t('common.status')}:</Typography.Text>
          <Tag
            icon={server.status ? <SyncOutlined spin/> : <MinusCircleOutlined/>}
            color={server.status ? "green" : "red"}
            style={{marginRight: 0}}
          >
            {server.status ? t('common.running') : t('common.offline')}
          </Tag>
        </Flex>

        <Flex justify="space-between" align="center">
          <Typography.Text type="secondary">{t('common.players')}:</Typography.Text>
          <Tag className="player-count-tag" style={{marginRight: 0}}>
            {server.currentPlayer} / {server.maxPlayer}
          </Tag>
        </Flex>

        <Flex justify="space-between" align="center">
          <Typography.Text type="secondary">{t('common.ipAddress')}:</Typography.Text>
          <Typography.Text
            copyable={{
              text: ipAddressAndPort,
              onCopy: () => void messageApi.info(t('common.copyToClipboard'))
            }}
            code
          >
            {ipAddressAndPort}
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
}
