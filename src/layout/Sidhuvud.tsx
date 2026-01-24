import {Header} from "antd/es/layout/layout";
import {Button, Menu, MenuProps, Space, theme} from "antd";
import {
  AppstoreOutlined,
  ExperimentOutlined,
  FontSizeOutlined,
  MoonOutlined,
  RadarChartOutlined,
  SunOutlined,
  UserOutlined
} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useThemeSammanhang, useUserSammanhang} from "../hooks/useContext.ts";
import {ProfileModalVy} from "../components/ProfileModalVy.tsx";

type MenuItem = Required<MenuProps>['items'][number];

export function Sidhuvud() {
  const {username, isLoading} = useUserSammanhang();
  const {isDarkMode, toggleDarkMode} = useThemeSammanhang();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {token} = theme.useToken()
  const {t, i18n} = useTranslation();

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
    <Header style={{display: 'flex', alignItems: 'center', background: token.colorBgContainer}}>
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

      <ProfileModalVy open={isModalOpen} onCancel={handleCancel}/>
    </Header>
  )
}