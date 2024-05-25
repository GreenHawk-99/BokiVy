import {useState} from 'react';
import {Col, Form, Input, InputNumber, InputNumberProps, Modal, Row, Select, Slider} from 'antd';
import {useTranslation} from 'react-i18next';
import {CreateGameServer} from '../models/gameServer.ts';
import {useDataSammanhang, useMessageSammanhang} from '../hooks/useContext.ts';
import {supportedGames} from '../data/data.ts';

interface SkapaServerModalProps {
  open: boolean;
  onCancel: () => void;
}

/**
 * Modal component for creating a new game server.
 */
export const SkapaServerModal = ({open, onCancel}: SkapaServerModalProps) => {
  const {createServer} = useDataSammanhang();
  const [form] = Form.useForm<CreateGameServer>();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(1);
  const messageApi = useMessageSammanhang();
  const {t} = useTranslation();

  const minPlayers = 1;
  const maxPlayers = 255;

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setInputValue(newValue as number);
    form.setFieldsValue({maxPlayers: newValue as number});
  };

  const handleOk = async () => {
    try {
      const values: CreateGameServer = await form.validateFields();
      console.log('Adding new server:', values);
      setLoading(true);
      await createServer(values);
      messageApi.success(t('feedback.onSuccessCreate'));
      form.resetFields();
      setInputValue(1);
      onCancel();
    } catch (error) {
      console.error('Failed to create server:', error);
      messageApi.error(t('feedback.onErrorCreate'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setInputValue(1);
    onCancel();
  };

  return (
    <Modal
      title={t('multifalt.createServer')}
      mask={{blur: false}}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={t('common.create')}
      cancelText={t('common.cancel')}
      closable={false}
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
          name="game"
          label={t('common.game')}
          rules={[{required: true, message: t('form.requiredGame')}]}
        >
          <Select
            placeholder={t('form.placeholderGame')}
            options={supportedGames.map(game => ({
              value: game.name,
              label: game.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label={t('common.name')}
          rules={[{required: true, message: t('form.requiredName')}]}
        >
          <Input placeholder={t('form.placeholderName')}/>
        </Form.Item>
        <Form.Item
          name="maxPlayers"
          label={t('common.maxPlayers')}
          rules={[{required: true, message: t('form.requiredMaxPlayers')}]}
        >
          <Row align="middle" justify="start">
            <Col span={18}>
              <Slider
                min={minPlayers}
                max={maxPlayers}
                onChange={onChange}
                value={inputValue}
              />
            </Col>
            <Col span={6}>
              <InputNumber
                min={minPlayers}
                max={maxPlayers}
                style={{margin: '0 16px'}}
                value={inputValue}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};
