import './App.scss'
import { useState } from 'react';
import {
    AppstoreOutlined, MoonOutlined,
    RadarChartOutlined,
    SettingOutlined, SunOutlined, UserOutlined,
} from '@ant-design/icons';
import {Breadcrumb, Button, Flex, Layout, MenuProps, Space, theme} from 'antd';
import { Menu } from 'antd';
import {Router} from "./router.tsx";
import {Header} from "antd/es/layout/layout";

type MenuItem = Required<MenuProps>['items'][number];

export function App() {
    const [current, setCurrent] = useState('applications');
    const [collapsed, setCollapsed] = useState(false);
    const [isDarkModeOn, setIsDarkModeOn] = useState<boolean>(false);
    const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();

    const { Content, Footer, Sider } = Layout;

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
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

    /*function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem('Option 1', '1', <PieChartOutlined />),
        getItem('Option 2', '2', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
            getItem('Tom', '3'),
            getItem('Bill', '4'),
            getItem('Alex', '5'),
        ]),
        getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined />),
    ];*/

    const toggleDarkMode = () => {
        setIsDarkModeOn((prevMode) => !prevMode);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/*<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>*/}
            <Layout>
                <Header style={{ display: 'flex', alignItems: 'center' }}  >
                    <Flex className="logo" justify={"center"} align={"center"}>BOKIVY</Flex>
                    <Menu style={{ flex: 1, minWidth: 0 }} mode="horizontal" selectedKeys={[current]} items={items} onClick={onClick} />
                    <Space.Compact>
                        <Button><UserOutlined /></Button>
                        <Button onClick={toggleDarkMode}>{isDarkModeOn ? <SunOutlined /> : <MoonOutlined />}</Button>
                    </Space.Compact>
                </Header>
                {/*<Header style={{ padding: 0, background: colorBgContainer }} />*/}
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {/*Bill is a cat.*/}
                        {/*<AppVy />*/}
                        <Router />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}
