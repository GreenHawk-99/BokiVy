import {Badge, Card, Col, Modal, Progress, Row, Statistic, Table, theme, Tooltip, Typography} from "antd";
import {
  CheckCircleOutlined,
  CloudServerOutlined,
  DashboardOutlined, DeliveredProcedureOutlined,
  DesktopOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  TeamOutlined
} from "@ant-design/icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDataSammanhang} from "../hooks/useContext.ts";
import {useTranslation} from "react-i18next";
import {BackendApp, GameServer} from "../models/gameServer.ts";

export const OverviewVy = () => {
  const {stats, servers, playerHistory, backendApps, loading} = useDataSammanhang();
  const {token} = theme.useToken();
  const {t} = useTranslation();
  const navigate = useNavigate();

  const [selectedApp, setSelectedApp] = useState<BackendApp | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return token.colorSuccess;
      case 'degraded':
        return token.colorWarning;
      case 'offline':
        return token.colorError;
      default:
        return token.colorTextDescription;
    }
  };

  const columns = [
    {
      title: t('overview.serverName'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: GameServer) => (
        <span>
          <Badge status={record.status ? 'success' : 'error'} style={{marginRight: 8}}/>
          {text}
        </span>
      ),
    },
    {
      title: t('overview.game'),
      dataIndex: 'game',
      key: 'game',
    },
    {
      title: t('overview.players'),
      key: 'players',
      render: (_: any, record: GameServer) => (
        <Progress
          percent={(record.currentPlayer / record.maxPlayers) * 100}
          size="small"
          format={() => `${record.currentPlayer}/${record.maxPlayers}`}
          status={record.status ? 'active' : 'exception'}
        />
      ),
    },
    {
      title: t('overview.cpu'),
      dataIndex: 'cpuUsage',
      key: 'cpu',
      render: (cpu?: number) => cpu !== undefined ? `${cpu}%` : '-',
    },
    {
      title: t('overview.memory'),
      dataIndex: 'memoryUsage',
      key: 'memory',
      render: (mem?: number) => mem !== undefined ? `${mem} MB` : '-',
    },
    {
      title: t('overview.uptime'),
      dataIndex: 'uptime',
      key: 'uptime',
      render: (uptime?: number) => uptime !== undefined ? (
        <Progress percent={uptime} size="small" steps={5} strokeColor={token.colorSuccess}/>
      ) : '-',
    },
  ];

  return (
    <div style={{padding: '24px'}}>
      <Typography.Title level={2} style={{marginBottom: "24px"}}>
        <DashboardOutlined style={{marginRight: 12}}/>
        {t('overview.title')}
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card variant={"borderless"} hoverable onClick={() => navigate('/')}>
            <Statistic
              title={t('overview.totalServers')}
              loading={loading}
              value={stats.total}
              prefix={<DesktopOutlined/>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Tooltip title={t('overview.onlineTooltip')}>
            <Card variant={"borderless"} hoverable onClick={() => navigate('/', {state: {filter: 'online'}})}>
              <Statistic
                title={t('overview.online')}
                loading={loading}
                value={stats.online}
                styles={{content: {color: token.colorSuccess}}}
                prefix={<CheckCircleOutlined/>}
              />
            </Card>
          </Tooltip>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant={"borderless"}>
            <Statistic
              title={t('overview.avgUptime')}
              loading={loading}
              value={stats.avgUptime}
              precision={1}
              suffix="%"
              prefix={<CloudServerOutlined/>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
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

      <Row gutter={[16, 16]} style={{marginTop: '24px'}}>
        <Col span={24}>
          <Card
            title={<span><CloudServerOutlined style={{marginRight: 8}}/> {t('overview.backendSystems')}</span>}
            variant={"borderless"}
          >
            <Row gutter={[16, 16]}>
              {backendApps.map(app => (
                <Col key={app.id} xs={12} sm={8} md={6} lg={4}>
                  <Card
                    hoverable
                    size="small"
                    style={{
                      borderColor: getStatusColor(app.status),
                      borderWidth: '2px',
                      backgroundColor: token.colorBgContainer,
                      textAlign: 'center'
                    }}
                    onClick={() => setSelectedApp(app)}
                  >
                    <Typography.Text strong>{app.name}</Typography.Text>
                    <div style={{marginTop: 8}}>
                      <Badge color={getStatusColor(app.status)} text={t(`overview.statusTypes.${app.status}`)}/>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{marginTop: '24px'}}>
        <Col span={16}>
          <Card
            title={<span><DesktopOutlined style={{marginRight: 8}}/> {t('overview.serverSupervision')}</span>}
            variant={"borderless"}
          >
            <Table
              dataSource={servers}
              columns={columns}
              rowKey="id"
              loading={loading}
              pagination={{pageSize: 5}}
              size="middle"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<span><DeliveredProcedureOutlined style={{marginRight: 8}}/> {t('overview.resourceUsage')}</span>}
            variant={"borderless"}
          >
            <Typography.Text type="secondary">{t('overview.totalCpu')}</Typography.Text>
            <Progress percent={Math.min(100, stats.totalCPU)} status="active" strokeColor={token.colorInfo}/>
            <div style={{marginTop: 24}}>
              <Typography.Text type="secondary">{t('overview.totalMemory')}</Typography.Text>
              <Progress
                percent={Math.min(100, (stats.totalMemory / 16384) * 100)}
                format={() => `${stats.totalMemory} MB / 16GB`}
                strokeColor={token.colorWarning}
              />
            </div>
          </Card>

          <Card
            title={<span><HistoryOutlined style={{marginRight: 8}}/> {t('overview.playerActivity')}</span>}
            variant={"borderless"}
            style={{marginTop: 16}}
          >
            <div style={{display: 'flex', alignItems: 'flex-end', height: '100px', gap: '4px'}}>
              {playerHistory.map((h, i) => (
                <Tooltip key={i} title={`${h.timestamp}: ${h.count} ${t('common.players').toLowerCase()}`}>
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: token.colorPrimary,
                      height: `${(h.count / 60) * 100}%`,
                      borderRadius: '2px 2px 0 0',
                      opacity: 0.6 + (h.count / 60) * 0.4
                    }}
                  />
                </Tooltip>
              ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 8}}>
              <Typography.Text type="secondary" style={{fontSize: '12px'}}>{playerHistory[0]?.timestamp}</Typography.Text>
              <Typography.Text type="secondary" style={{fontSize: '12px'}}>{playerHistory[playerHistory.length - 1]?.timestamp}</Typography.Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Modal
        title={<span><InfoCircleOutlined style={{marginRight: 8}}/> {selectedApp?.name} - {t('overview.details')}</span>}
        open={!!selectedApp}
        onCancel={() => setSelectedApp(null)}
        footer={null}
        destroyOnClose
      >
        {selectedApp && (
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Statistic title={t('overview.status')} value={t(`overview.statusTypes.${selectedApp.status}`)} valueStyle={{color: getStatusColor(selectedApp.status), fontSize: '18px'}} />
            </Col>
            <Col span={12}>
              <Statistic title={t('overview.version')} value={selectedApp.version} valueStyle={{fontSize: '18px'}} />
            </Col>
            <Col span={12}>
              <Statistic title={t('overview.uptime')} value={selectedApp.uptime} valueStyle={{fontSize: '18px'}} />
            </Col>
            <Col span={12}>
              <Statistic title={t('overview.responseTime')} value={selectedApp.responseTime} suffix="ms" valueStyle={{fontSize: '18px'}} />
            </Col>
            <Col span={24}>
              <Typography.Text type="secondary">{t('overview.errorRate')}</Typography.Text>
              <Progress
                percent={selectedApp.errorRate}
                status={selectedApp.errorRate > 5 ? 'exception' : 'active'}
                strokeColor={selectedApp.errorRate > 1 ? token.colorWarning : token.colorSuccess}
                format={(percent) => `${percent}%`}
              />
            </Col>
            <Col span={24}>
              <Typography.Text type="secondary">{t('overview.endpoints')}</Typography.Text>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px'}}>
                <LineChartOutlined style={{color: token.colorPrimary}} />
                <Typography.Text>{selectedApp.endpoints} {t('overview.endpointsCount')}</Typography.Text>
              </div>
            </Col>
            {selectedApp.lastBackup && (
              <Col span={24}>
                <Typography.Text type="secondary">{t('overview.lastBackup')}</Typography.Text>
                <div>{new Date(selectedApp.lastBackup).toLocaleString()}</div>
              </Col>
            )}
          </Row>
        )}
      </Modal>
    </div>
  );
};
