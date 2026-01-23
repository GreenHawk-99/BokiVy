import {Header} from "antd/es/layout/layout";
import {Avatar, Button, Menu, MenuProps, Modal, Space, Typography} from "antd";
import {
  AppstoreOutlined,
  ExperimentOutlined,
  FontSizeOutlined,
  LogoutOutlined,
  MoonOutlined,
  RadarChartOutlined,
  SunOutlined,
  UserOutlined
} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import sits_01 from "../assets/sits_01.png";
import {useThemeKrok, useUserKrok} from "../hooks/useContext.ts";

type MenuItem = Required<MenuProps>['items'][number];

export function Sidhuvud() {
  const {username, avatar, login, logout, isLoading} = useUserKrok();
  const {isDarkMode, toggleDarkMode} = useThemeKrok();
  const {t, i18n} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'sv' ? 'en' : 'sv';
    void i18n.changeLanguage(newLang);
  };

  // Determine the current key based on a path
  let current = 'applications';
  if (location.pathname === '/overview') {
    current = 'overview';
  } else if (location.pathname === '/benchmark') {
    current = 'benchmark';
  }

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'applications') {
      navigate('/');
    } else if (e.key === 'overview') {
      navigate('/overview');
    } else if (e.key === 'benchmark') {
      navigate('/benchmark');
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsModalOpen(false);
  };

  const items: MenuItem[] = [
    {
      label: t('menu.applications'),
      key: 'applications',
      icon: <AppstoreOutlined/>,
    },
    {
      label: t('menu.overview'),
      key: 'overview',
      icon: <RadarChartOutlined/>,
    },
    {
      label: t('menu.benchmark'),
      key: 'benchmark',
      icon: <ExperimentOutlined/>,
    },
  ];

  return (
    <Header style={{display: 'flex', alignItems: 'center', background: isDarkMode ? '#001529' : "#ffffff"}}>
      <div className={"logo logo-header"}>BOKIVY</div>
      <Menu
        style={{flex: 1, minWidth: 0}}
        mode="horizontal"
        selectedKeys={[current]}
        items={items}
        onClick={onClick}
      />
      <Space.Compact>
        <Button icon={<UserOutlined/>} onClick={showModal} loading={isLoading}>
          {username || t('common.login')}
        </Button>
        <Button icon={<FontSizeOutlined/>} onClick={toggleLanguage}>
          {i18n.language === 'sv' ? 'SV' : 'EN'}
        </Button>
        <Button onClick={toggleDarkMode}>{isDarkMode ? <SunOutlined/> : <MoonOutlined/>}</Button>
      </Space.Compact>

      <Modal
        title={username ? t('common.profile') : t('common.signIn')}
        open={isModalOpen}
        onCancel={handleCancel}
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
    </Header>
  )
}