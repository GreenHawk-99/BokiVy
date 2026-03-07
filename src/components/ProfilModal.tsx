import {Avatar, Button, Flex, Modal, Typography} from "antd";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {useUserSammanhang} from "../hooks/useContext.ts";

interface ProfilModalProps {
  open: boolean;
  onCancel: () => void;
}

export const ProfilModal = ({open, onCancel}: ProfilModalProps) => {
  const {username, avatar, steamId, login, logout} = useUserSammanhang();
  const {t} = useTranslation();

  const handleLogout = () => {
    logout();
    onCancel();
  };

  const isAuthenticated = !!steamId;
  const steamProfileUrl = `https://steamcommunity.com/profiles/${steamId}`;

  return (
    <Modal
      title={isAuthenticated ? t('common.profile') : t('common.signIn')}
      open={open}
      onCancel={onCancel}
      centered
      footer={null}
      maskClosable={false}
    >
      {isAuthenticated ? (
        <div style={{textAlign: 'center', padding: '20px 0'}}>
          <a href={steamProfileUrl} target="_blank" rel="noopener noreferrer">
            <Avatar size={100} src={avatar} icon={<UserOutlined/>} style={{marginBottom: 16, cursor: 'pointer'}}/>
          </a>
          <Typography.Title level={3}>
            <a href={steamProfileUrl} target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>
              {username}
            </a>
          </Typography.Title>
          <Typography.Text type="secondary" style={{display: 'block', marginBottom: 24}}>
            {t('common.loggedInWithSteam')}
          </Typography.Text>
          <Button
            danger
            type="primary"
            icon={<LogoutOutlined/>}
            onClick={handleLogout}
            block
          >
            {t('common.logout')}
          </Button>
        </div>
      ) : (
        <Flex justify={'center'} align={'center'}>
          <Button
            type={'primary'}
            onClick={login}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-steam"
                 viewBox="0 0 16 16">
              <path
                d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006 4.304 1.769A2.2 2.2 0 0 1 5.62 8.88l1.96-2.844-.001-.04a3.046 3.046 0 0 1 3.042-3.043 3.046 3.046 0 0 1 3.042 3.043 3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11 2.22 2.22 0 0 1-1.312-1.568L.33 10.333Z"/>
              <path
                d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.7 1.7 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029 2.03 2.03 0 0 0 2.027-2.029 2.03 2.03 0 0 0-2.027-2.027 2.03 2.03 0 0 0-2.027 2.027m2.03-1.527a1.524 1.524 0 1 1-.002 3.048 1.524 1.524 0 0 1 .002-3.048"/>
            </svg>
            {t('common.signInWithSteam')}
          </Button>
        </Flex>
      )}
    </Modal>
  );
};
