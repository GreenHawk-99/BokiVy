import {Card, Col, Row, Statistic, theme, Typography} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined, DesktopOutlined, TeamOutlined} from "@ant-design/icons";
import {useDataSammanhang} from "../hooks/useContext.ts";
import {useTranslation} from "react-i18next";

export const OverviewVy = () => {
  const {stats, loading} = useDataSammanhang();
  const {token} = theme.useToken();
  const {t} = useTranslation();

  return (
    <>
      <Typography.Title level={2} style={{marginBlock: "1vh"}}>{t('overview.title')}</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card variant={"borderless"}>
            <Statistic
              title={t('overview.totalServers')}
              loading={loading}
              value={stats.total}
              prefix={<DesktopOutlined/>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant={"borderless"}>
            <Statistic
              title={t('overview.online')}
              loading={loading}
              value={stats.online}
              styles={{content: {color: token.colorSuccess}}}
              prefix={<CheckCircleOutlined/>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant={"borderless"}>
            <Statistic
              title={t('overview.offline')}
              loading={loading}
              value={stats.offline}
              styles={{content: {color: token.colorError}}}
              prefix={<CloseCircleOutlined/>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant={"borderless"}>
            <Statistic
              title={t('overview.totalPlayers')}
              loading={loading}
              value={stats.totalPlayers}
              suffix={`/ ${stats.maxPlayers}`}
              prefix={<TeamOutlined/>}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}