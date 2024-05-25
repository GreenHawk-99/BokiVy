import {useEffect, useState} from 'react';
import {Button, Card, Form, Input, Space, Typography, Upload, UploadProps} from 'antd';
import {ExperimentOutlined, InboxOutlined} from '@ant-design/icons';
import {useMessageSammanhang} from "../hooks/useContext.ts";
import {RcFile} from "antd/es/upload";

const {Title, Paragraph} = Typography;
const {Dragger} = Upload;

interface BenchmarkForm {
  name: string;
  file: RcFile | File;
}

/**
 * FormBenchmark component.
 * Extracted from BenchmarkVy.
 */
export const FormBenchmark = () => {
  const [form] = Form.useForm<BenchmarkForm>();
  const messageApi = useMessageSammanhang();
  const [submittable, setSubmittable] = useState<boolean>(false);

  // Watch all values to trigger re-render on any change
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({validateOnly: true})
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const onFinish = (values: any) => {
    console.log('Submitted values:', values);
    const rawFile = values.file.originFileObj as File;
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('file', rawFile);

    console.log('Final data for Service:', {name: values.name, file: rawFile});
    void messageApi.success('Form submitted successfully!');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    void messageApi.error('Please check the form for errors.');
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    beforeUpload: () => false,
    showUploadList: true,
    listType: "picture",
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e[0];
    }
    return e?.fileList?.[0]; // Extract the first file only
  };

  return (
    <Space direction="vertical" size="large" style={{width: '100%'}}>
      <Card variant="outlined">
        <Title level={2}>
          <ExperimentOutlined/> UI Benchmark Playground (v6.2.0)
        </Title>
        <Paragraph>
          This page is dedicated to testing UI components and benchmarking Ant Design features. Currently showcasing Ant Design v6.2.0 features like Form variants and Dragger upload.
        </Paragraph>
      </Card>

      <Card title="Ant Design Form Benchmark (Vertical Layout)" variant="outlined">
        <Form
          form={form}
          name="benchmark_form"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          variant="filled"
        >
          <Form.Item
            label="Cover Name (TextArea)"
            name="name"
            rules={[{required: true, message: 'Please enter a cover name!'}]}
          >
            <Input
              placeholder="Enter a cover name here..."
              maxLength={20}
            />
          </Form.Item>

          <Form.Item
            label="File Upload (Dragger)"
            name="file"
            getValueProps={(value) => ({fileList: value ? [value] : []})}
            getValueFromEvent={normFile}
            rules={[{required: true, message: 'Please upload one file!'}]}
          >
            <Dragger {...uploadProps} style={{padding: '20px'}}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined/>
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={!submittable}>
              Send
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
};
