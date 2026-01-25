import {useState} from 'react';
import {Form, Input, InputNumberProps, Modal, Slider} from 'antd';
import {useTranslation} from 'react-i18next';
import {CreateGameServer} from '../models/gameServer.ts';
import {ServerService} from '../services/ServerService.ts';
import {useDataSammanhang, useMessageSammanhang} from '../hooks/useContext.ts';

interface CreateServerModalVyProps {
  open: boolean;
  onCancel: () => void;
}

/**
 * Modal component for creating a new game server.
 */
export const CreateServerModalVy = ({open, onCancel}:CreateServerModalVyProps) => {
  const {refreshData} = useDataSammanhang();
  const [form] = Form.useForm<CreateGameServer>();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(1);
  const messageApi = useMessageSammanhang();
  const {t} = useTranslation();

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setInputValue(newValue as number);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await ServerService.createServer(values);
      await refreshData();
      messageApi.success(t('common.success')); // Assuming common.success exists
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('Failed to create server:', error);
      // messageApi.error(t('common.error')); // Error handling if needed
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={t('multifalt.createServer')}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      destroyOnHidden={true}
    >
      <Form
        form={form}
        requiredMark={false}
        layout={'vertical'}
        name="create_server_form"
      >
        <Form.Item
          name="name"
          label={t('common.name')}
          rules={[{required: true, message: t('form.requiredName')}]}
        >
          <Input placeholder={t('common.name')} />
        </Form.Item>
        <Form.Item
          name="ipAddress"
          label={t('common.maxPlayers')}
          rules={[{required: true, message: t('form.requiredMaxPlayers')}]}
        >
          <Slider
            min={1}
            max={255}
            onChange={onChange}
            value={inputValue}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
