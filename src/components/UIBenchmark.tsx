import {Card, Col, Row, Statistic, Typography} from 'antd';
import {ArrowDownOutlined, ArrowUpOutlined, LikeOutlined} from '@ant-design/icons';

const {Title} = Typography;

/**
 * UIBenchmark component.
 * A placeholder for another benchmark tab.
 */
export const UIBenchmark = () => {
  return (
    <Card variant="outlined">
      <Title level={2}>UI Components Benchmark</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Active Users" value={112893} />
        </Col>
        <Col span={12}>
          <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card variant="borderless">
            <Statistic
              title="Feedback"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card variant="borderless">
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Statistic title="Unmerged" value={93} suffix="/ 100" />
        </Col>
        <Col span={12}>
          <Statistic title="Likes" value={1128} prefix={<LikeOutlined />} />
        </Col>
      </Row>
    </Card>
  );
};
