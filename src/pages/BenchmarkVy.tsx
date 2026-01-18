import React from 'react';
import {Button, Card, Form, Input, Select, Space, Typography} from 'antd';
import {ExperimentOutlined} from '@ant-design/icons';
import {useMessageKrok} from "../hooks/useContext.ts";

const {Title, Paragraph} = Typography;

interface BenchmarkForm {
  name: string;
  codex: string;
  select?: string;
}

/**
 * BenchmarkVy Page
 * A playground for testing UI elements and Ant Design features.
 */
export const BenchmarkVy: React.FC = () => {
  const [form] = Form.useForm<BenchmarkForm>();
  const messageApi = useMessageKrok();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    void messageApi.success('Form submitted successfully!');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    void messageApi.error('Please check the form for errors.');
  };

  return (
    <div style={{maxWidth: 800, margin: '0 auto'}}>
      <Space orientation="vertical" size="large" style={{width: '100%'}}>
        <Card variant="outlined">
          <Title level={2}>
            <ExperimentOutlined/> UI Benchmark Playground (v6.2.0)
          </Title>
          <Paragraph>
            This page is dedicated to testing UI components and benchmarking Ant Design features.
            Currently showcasing <b>Ant Design v6.2.0</b> features like Form variants.
          </Paragraph>
        </Card>

        <Card title="Ant Design Form Benchmark (Vertical Layout)" variant="outlined">
          <Form
            form={form}
            name="benchmark_form"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            variant="filled"
          >
            <Form.Item
              label="Input 1 (Filled Variant via Form)"
              name="name"
              rules={[{required: true, message: 'Please input something!'}]}
            >
              <Input placeholder="Enter some text"/>
            </Form.Item>

            <Form.Item
              label="Input 2 (Codex Transformation)"
              name="codex"
              rules={[{required: true, message: 'Please input another thing!'}]}
              getValueFromEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                const rawValue = e.target.value.replace(/\$/g, '');
                return rawValue.split('').map(char => `$${char}`).join('');
              }}
            >
              <Input placeholder="Enter more text"/>
            </Form.Item>

            {/* Optional: Visual Feedback Preview */}
            <Form.Item noStyle shouldUpdate={(prev, curr) => prev.codex !== curr.codex}>
              {({ getFieldValue }) => (
                <div style={{ marginBottom: 24, marginTop: -20, fontSize: '12px', color: '#666' }}>
                  Encoded Value: <code style={{ color: '#1677ff' }}>{getFieldValue('codex') || 'None'}</code>
                </div>
              )}
            </Form.Item>

            <Form.Item label="Select (Inherited Variant)" name="select">
              <Select
                placeholder="Select an option"
                options={[
                  {value: 'v6', label: 'Ant Design v6'},
                  {value: 'v5', label: 'Ant Design v5'},
                ]}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
};
