import './App.css'
import { useState } from 'react';
import {
    AppstoreOutlined,
    DesktopOutlined, FileOutlined,
    MailOutlined,
    PieChartOutlined, RadarChartOutlined,
    SettingOutlined, TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Breadcrumb, Layout, MenuProps, theme, Typography} from 'antd';
import { Menu } from 'antd';
import {GameServerVy} from "./server/GameServerVy.tsx";

type MenuItem = Required<MenuProps>['items'][number];

export function App() {
    const [current, setCurrent] = useState('overview');
    const [collapsed, setCollapsed] = useState(false);
    const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();

    const { Content, Footer, Sider } = Layout;

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items: MenuItem[] = [
        {
            label: 'Overview',
            key: 'overview',
            icon: <RadarChartOutlined />,
        },
        {
            label: 'Applications',
            key: 'applications',
            icon: <AppstoreOutlined />,
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
        {
            label: "Work In Progress",
            key: 'alipay',
            // label: (
            //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            //         Navigation Four - Link
            //     </a>
            // ),
            disabled: true
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

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/*<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>*/}
            <Layout>
                <Menu selectedKeys={[current]} mode="horizontal" items={items} onClick={onClick} />
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
                        <GameServerVy />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}
