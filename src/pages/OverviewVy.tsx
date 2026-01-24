import {Card, Col, Row, Statistic, Typography} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined, DesktopOutlined, TeamOutlined} from "@ant-design/icons";
import {useDataSammanhang} from "../hooks/useContext.ts";
import {useTranslation} from "react-i18next";

export function OverviewVy() {
  const {stats} = useDataSammanhang();
  const {t} = useTranslation();

  return (
    <>
      <Typography.Title level={2} style={{marginBlock: "1vh"}}>{t('overview.title')}</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card variant={"borderless"}>
            <Statistic
              title={t('overview.totalServers')}
              value={stats.total}
              prefix={<DesktopOutlined/>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant={"borderless"}>
            <Statistic
              title={t('overview.online')}
              value={stats.online}
              valueStyle={{color: '#3f8600'}}
              prefix={<CheckCircleOutlined/>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant={"borderless"}>
            <Statistic
              title={t('overview.offline')}
              value={stats.offline}
              valueStyle={{color: '#cf1322'}}
              prefix={<CloseCircleOutlined/>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant={"borderless"}>
            <Statistic
              title={t('overview.totalPlayers')}
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