import {Avatar, Button, Modal, Typography} from "antd";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import sits_01 from "../assets/sits_01.png";
import {useUserSammanhang} from "../hooks/useContext.ts";

interface ProfileModalVyProps {
  open: boolean;
  onCancel: () => void;
}

export const ProfileModalVy = ({open, onCancel}: ProfileModalVyProps) => {
  const {username, avatar, login, logout} = useUserSammanhang();
  const {t} = useTranslation();

  const handleLogout = () => {
    logout();
    onCancel();
  };

  return (
    <Modal
      title={username ? t('common.profile') : t('common.signIn')}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      {username ? (
        <div style={{textAlign: 'center', padding: '20px 0'}}>
          <Avatar size={100} src={avatar} icon={<UserOutlined/>} style={{marginBottom: 16}}/>
          <Typography.Title level={3}>{username}</Typography.Title>
          <Typography.Text type="secondary" style={{marginBottom: 24}}>
            {t('common.loggedInSteam')}
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
        <div style={{textAlign: 'center', padding: '20px 0'}}>
          <div
            style={{cursor: 'pointer', transition: 'opacity 0.2s'}}
            onClick={login}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <img
              src={sits_01}
              alt="Sign in through Steam"
              style={{maxWidth: '100%', height: 'auto'}}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};
