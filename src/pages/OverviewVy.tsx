import {Card, Col, Row, Statistic, Typography} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined, DesktopOutlined, TeamOutlined} from "@ant-design/icons";
import {useDataKrok} from "../hooks/useContext.ts";

export function OverviewVy() {
  const {stats} = useDataKrok();

  return (
    <>
      <Typography.Title level={2} style={{marginBlock: "1vh"}}>Overview</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card variant={"borderless"}>
            <Statistic
              title="Total Servers"
              value={stats.total}
              prefix={<DesktopOutlined/>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant={"borderless"}>
            <Statistic
              title="Online"
              value={stats.online}
              valueStyle={{color: '#3f8600'}}
              prefix={<CheckCircleOutlined/>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant={"borderless"}>
            <Statistic
              title="Offline"
              value={stats.offline}
              valueStyle={{color: '#cf1322'}}
              prefix={<CloseCircleOutlined/>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant={"borderless"}>
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