import {Card, Col, Row, Statistic, Typography} from "antd";
import {ServerService} from "../services/ServerService.ts";
import {CheckCircleOutlined, CloseCircleOutlined, DesktopOutlined, TeamOutlined} from "@ant-design/icons";

export function OverviewVy() {
  const stats = ServerService.getServerStats();

  return (
    <>
      <Typography.Title level={2} style={{marginBlock: "1vh"}}>Overview</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Servers"
              value={stats.total}
              prefix={<DesktopOutlined/>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Online"
              value={stats.online}
              valueStyle={{color: '#3f8600'}}
              prefix={<CheckCircleOutlined/>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Offline"
              value={stats.offline}
              valueStyle={{color: '#cf1322'}}
              prefix={<CloseCircleOutlined/>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Players"
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