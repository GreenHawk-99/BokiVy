import './App.scss'
import {useState} from 'react';
import {
    AppstoreOutlined, FontSizeOutlined, GithubOutlined, MoonOutlined,
    RadarChartOutlined,
    SettingOutlined, SunOutlined, UserOutlined,
} from '@ant-design/icons';
import {Button, ConfigProvider, Divider, Flex, Layout, MenuProps, Space, theme} from 'antd';
import {Menu} from 'antd';
import {Content, Footer, Header} from "antd/es/layout/layout";
import {TinyColor} from "@ctrl/tinycolor";
import {HemmaVy} from "./misc/HemmaVy.tsx";

type MenuItem = Required<MenuProps>['items'][number];

export function App() {
    const [current, setCurrent] = useState('applications');
    const [isDarkModeOn, setIsDarkModeOn] = useState<boolean>(false);
    const {token} = theme.useToken();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
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
            <Layout style={{background:`linear-gradient(135deg, ${colors.join(', ')})`}}>
                <Header style={{display: 'flex', alignItems: 'center', background: "#ffffff"}}>
                    <div className={"logo"}>BOKIVY</div>
                    <Menu style={{flex: 1, minWidth: 0}} mode="horizontal" selectedKeys={[current]} items={items}
                          onClick={onClick}/>
                    <Space.Compact>
                        <Button><UserOutlined/></Button>
                        <Button><FontSizeOutlined/></Button>
                        <Button onClick={toggleDarkMode}>{isDarkModeOn ? <SunOutlined/> : <MoonOutlined/>}</Button>
                    </Space.Compact>
                </Header>
                <Content style={{
                    //  margin: '0 16px'
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
                            <HemmaVy/>
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
