import {Header} from "antd/es/layout/layout";
import {Button, Menu, MenuProps, Space} from "antd";
import {
  AppstoreOutlined,
  FontSizeOutlined,
  MoonOutlined,
  RadarChartOutlined, SettingOutlined,
  SunOutlined,
  UserOutlined
} from "@ant-design/icons";
import {useUserVy} from "../hooks/useUserVy.ts";
import {useThemeVy} from "../hooks/useThemeVy.ts";
import {useLocation, useNavigate} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

export function Sidhuvud() {
  const {username, login, logout, isLoading} = useUserVy();
  const {isDarkMode, toggleDarkMode} = useThemeVy();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current key based on path
  const current = location.pathname === '/overview' ? 'overview' : 'applications';

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'applications') {
      navigate('/');
    } else if (e.key === 'overview') {
      navigate('/overview');
    }
  };

  const items: MenuItem[] = [
    {
      label: 'Applications',
      key: 'applications',
      icon: <AppstoreOutlined/>,
    },
    {
      label: 'Overview',
      key: 'overview',
      icon: <RadarChartOutlined/>,
    },
    {
      label: 'Navigation Three - Submenu',
      key: 'submenu',
      icon: <SettingOutlined/>,
      children: [
        {
          type: 'group',
          label: 'Servers',
          children: [
            {label: 'Option 1', key: 'setting:1'},
            {label: 'Option 2', key: 'setting:2'},
          ],
        },
      ],
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
        {username ? (
          <Button icon={<UserOutlined/>} onClick={logout}>{username}</Button>
        ) : (
          <Button icon={<UserOutlined/>} onClick={login} loading={isLoading}>Login with Steam</Button>
        )}
        <Button icon={<FontSizeOutlined/>}/>
        <Button onClick={toggleDarkMode}>{isDarkMode ? <SunOutlined/> : <MoonOutlined/>}</Button>
      </Space.Compact>
    </Header>
  )
}