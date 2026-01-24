import React from 'react';
import {Button, Card, Form, Input, Space, Typography, Upload, UploadProps} from 'antd';
import {ExperimentOutlined, InboxOutlined} from '@ant-design/icons';
import {useMessageSammanhang} from "../hooks/useContext.ts";
import {RcFile} from "antd/es/upload";
import {useTranslation} from "react-i18next";

const {Title, Paragraph} = Typography;
const {Dragger} = Upload;

interface BenchmarkForm {
  name: string;
  file: RcFile | File;
}

/**
 * BenchmarkVy Page
 * A playground for testing UI elements and Ant Design features.
 */
export const BenchmarkVy: React.FC = () => {
  const [form] = Form.useForm<BenchmarkForm>();
  const messageApi = useMessageSammanhang();
  const {t} = useTranslation();
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values to trigger re-render on any change
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({validateOnly: true})
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const onFinish = (values: any) => {
    console.log('Submitted values:', values);
    // Step 1: Extract the binary data from the Ant Design wrapper
    const rawFile = values.file.originFileObj as File;
    // Step 2: Prepare the data for the backend
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('file', rawFile);

    console.log('Final data for Service:', {name: values.name, file: rawFile});
    // Example: void ServerService.uploadCover(formData);
    console.log('formData', formData.get('name'))
    console.log('formData', formData.get('file'))
    void messageApi.success(t('benchmark.formSuccess'));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    void messageApi.error(t('benchmark.formError'));
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
    <div style={{maxWidth: 800, margin: '0 auto'}}>
      <Space orientation="vertical" size="large" style={{width: '100%'}}>
        <Card variant="outlined">
          <Title level={2}>
            <ExperimentOutlined/> {t('benchmark.title')} (v6.2.0)
          </Title>
          <Paragraph>
            {t('benchmark.description')}
            Currently showcasing <b>Ant Design v6.2.0</b> features like Form variants and Dragger upload.
          </Paragraph>
        </Card>

        <Card title={t('benchmark.formTitle')} variant="outlined">
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
              label={t('benchmark.coverName')}
              name="name"
              rules={[{required: true, message: t('benchmark.coverNameRequired')}]}
            >
              <Input
                placeholder={t('benchmark.coverNamePlaceholder')}
                maxLength={20}
              />
            </Form.Item>

            <Form.Item
              label={t('benchmark.fileUpload')}
              name="file"
              // Important: We must tell the form how to pass the value BACK to the Dragger
              // Since Dragger expects an array, but our form now stores a single object
              getValueProps={(value) => ({fileList: value ? [value] : []})}
              getValueFromEvent={normFile}
              rules={[{required: true, message: t('benchmark.fileUploadRequired')}]}
            >
              <Dragger {...uploadProps} style={{padding: '20px'}}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined/>
                </p>
                <p className="ant-upload-text">{t('benchmark.fileUploadText')}</p>
                <p className="ant-upload-hint">
                  {t('benchmark.fileUploadHint')}
                </p>
              </Dragger>
            </Form.Item>


            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={!submittable}>
                {t('common.send')}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
};
