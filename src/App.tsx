import {
  AppstoreOutlined,
  FontSizeOutlined,
  GithubOutlined,
  MoonOutlined,
  RadarChartOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, Divider, Flex, Layout, Menu, MenuProps, Space, theme } from 'antd';
import { Content, Footer, Header } from "antd/es/layout/layout";
import { TinyColor } from "@ctrl/tinycolor";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {useUserVy} from "./hooks/useUserVy";
import {useThemeVy} from "./hooks/useThemeVy";

type MenuItem = Required<MenuProps>['items'][number];

/**
 * Main application component.
 * Acts as the entry point for global providers and the RouterProvider.
 */
export function App() {
  const { username, login, logout, isLoading } = useUserVy();
  const { isDarkMode, toggleDarkMode, colors } = useThemeVy();
  const { token } = theme.useToken();
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
      icon: <AppstoreOutlined />,
    },
    {
      label: 'Overview',
      key: 'overview',
      icon: <RadarChartOutlined />,
    },
    {
      label: 'Navigation Three - Submenu',
      key: 'submenu',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Servers',
          children: [
            { label: 'Option 1', key: 'setting:1' },
            { label: 'Option 2', key: 'setting:2' },
          ],
        },
      ],
    },
  ];

  const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());

  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  const openLink = () => {
    window.open("https://github.com/GreenHawk-99")
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout style={{ background: `linear-gradient(135deg, ${colors.join(', ')})` }}>
        <Header style={{ display: 'flex', alignItems: 'center', background: isDarkMode ? '#001529' : "#ffffff" }}>
          <div className={"logo logo-header"}>BOKIVY</div>
          <Menu
            style={{ flex: 1, minWidth: 0 }}
            mode="horizontal"
            selectedKeys={[current]}
            items={items}
            onClick={onClick}
          />
          <Space.Compact>
            {username ? (
              <Button icon={<UserOutlined />} onClick={logout}>{username}</Button>
            ) : (
              <Button icon={<UserOutlined />} onClick={login} loading={isLoading}>Login with Steam</Button>
            )}
            <Button icon={<FontSizeOutlined />} />
            <Button onClick={toggleDarkMode}>{isDarkMode ? <SunOutlined /> : <MoonOutlined />}</Button>
          </Space.Compact>
        </Header>
        <Content style={{
          margin: '24px 16px',
          minHeight: 280,
          background: token.colorBgContainer,
          borderRadius: token.borderRadiusLG,
        }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: token.colorBgContainer,
              borderRadius: token.borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Flex justify={"center"} align={"center"}>
            <Space split={<Divider type="vertical" />}>
              <div className={"logo"}>BOKIVY</div>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `linear-gradient(135deg, ${colors.join(', ')})`,
                      colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors).join(', ')})`,
                      colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors).join(', ')})`,
                      lineWidth: 0,
                    },
                  },
                }}
              > Created by <Button type={"primary"} icon={<GithubOutlined />}
                                   onClick={openLink}>GreenHawk</Button>
              </ConfigProvider>
            </Space>
          </Flex>
        </Footer>
      </Layout>
    </Layout>
  );
}

