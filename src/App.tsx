import './App.scss'
import {useState} from 'react';
import {
    AppstoreOutlined, FontSizeOutlined, GithubOutlined, MoonOutlined,
    RadarChartOutlined,
    SettingOutlined, SunOutlined, UserOutlined,
} from '@ant-design/icons';
import {Button, ConfigProvider, Divider, Flex, Layout, MenuProps, Space, theme} from 'antd';
import {Menu} from 'antd';
import {Router} from "./router.tsx";
import {Header} from "antd/es/layout/layout";
import {TinyColor} from "@ctrl/tinycolor";
import {Link, NavLink, Outlet} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

export function App() {
    const [current, setCurrent] = useState('applications');
    const [collapsed, setCollapsed] = useState(false);
    const [isDarkModeOn, setIsDarkModeOn] = useState<boolean>(false);
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();

    const {Content, Footer, Sider} = Layout;

    const handleLink: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);

    };

    const items: MenuItem[] = [
        {
            label:<NavLink to={"/applications"}>Applications</NavLink>,
            key: 'applications',
            icon: <AppstoreOutlined/>,
        },
        {
            label: <NavLink to={"/applications"}>Overview</NavLink>,
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
                {
                    type: "group",
                    label: "Account"
                }
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

    const colors = ['#01e973', '#8d42ff'];

    const getHoverColors = (colors: string[]) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());

    const getActiveColors = (colors: string[]) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());

    const openLink = () => {
        window.open("https://github.com/GreenHawk-99")
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            {/*<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>*/}
            <Layout>
                <Header style={{display: 'flex', alignItems: 'center', background: "#ffffff"}}>
                    <div className={"logo logo-header"}>BOKIVY</div>
                    <Menu style={{flex: 1, minWidth: 0}} mode="horizontal" selectedKeys={[current]} items={items}
                          onClick={handleLink}/>
                    <Space.Compact>
                        <Button><UserOutlined/></Button>
                        <Button><FontSizeOutlined/></Button>
                        <Button onClick={toggleDarkMode}>{isDarkModeOn ? <SunOutlined/> : <MoonOutlined/>}</Button>
                    </Space.Compact>
                </Header>
                {/*<Header style={{ padding: 0, background: colorBgContainer }} />*/}
                <Content style={{
                    //  margin: '0 16px'
                    margin: '24px 16px',
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    <Flex justify={"center"} align={"center"}>
                        <Space split={<Divider type="vertical"/>}>
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
                            > Created by <Button type={"primary"} icon={<GithubOutlined/>}
                                                 onClick={openLink}>GreenHawk</Button>
                            </ConfigProvider>
                        </Space>
                    </Flex>
                </Footer>
            </Layout>
        </Layout>
    );
}
