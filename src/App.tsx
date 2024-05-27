import './App.scss'
import {useState} from 'react';
import {
    AppstoreOutlined, CopyOutlined, FontSizeOutlined, GithubOutlined, MinusCircleOutlined, MoonOutlined,
    RadarChartOutlined,
    SettingOutlined, SunOutlined, SyncOutlined, UserOutlined,
} from '@ant-design/icons';
import {Button, Card, ConfigProvider, Divider, Flex, Layout, MenuProps, Space, Tag, theme, Typography} from 'antd';
import {Menu} from 'antd';
import {Content, Footer, Header} from "antd/es/layout/layout";
import {TinyColor} from "@ctrl/tinycolor";
import {imageRender} from "./utils/Checker.tsx";
import {gameServers} from "./data/data.ts";
import {AppVy} from "./bokaegis/AppVy.tsx";

type MenuItem = Required<MenuProps>['items'][number];

export function App() {
    const [current, setCurrent] = useState('applications');
    const [isDarkModeOn, setIsDarkModeOn] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
                    <div className={"logo logo-header"}>BOKIVY</div>
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
                        <Card className={"server-card"}
                              style={{width:"20vw"}}
                              bordered={true}
                              cover={<div onClick={() => setIsModalOpen(true)}>
                                  {imageRender(gameServers[2].name)}
                              </div>}>
                            <div>
                                <Typography.Title level={3} style={{marginTop: "0"}}>{gameServers[2].name}</Typography.Title>
                                <Flex vertical={true} gap={"1vh"}>
                                    <Flex justify={"space-between"}>
                                        <Space>
                                            <Typography.Text strong={true}>
                                                Status:
                                            </Typography.Text>
                                            <Tag icon={gameServers[2].status ? <SyncOutlined spin /> : <MinusCircleOutlined />}
                                                 color={gameServers[2].status ? "green" : "red"}>{gameServers[2].status ? "Running" : "Closed"}</Tag>
                                        </Space>
                                        <Space>
                                            <Typography.Text strong={true}>Player Count:</Typography.Text>
                                            <Tag
                                                className={"player-count-tag"}>{gameServers[2].currentPlayer + "/" + gameServers[2].maxPlayer}</Tag>
                                        </Space>
                                    </Flex>
                                    <Space>
                                        <Typography.Text strong={true}>
                                            Ip Address:
                                        </Typography.Text>
                                        <Typography.Text italic={true}>
                                            {gameServers[2].ipAddress+gameServers[2].port}
                                        </Typography.Text>
                                        <CopyOutlined className={"copy-icon"}/>
                                    </Space>
                                </Flex>
                            </div>
                        </Card>
                        <AppVy application={gameServers[2]} open={isModalOpen} setOpen={setIsModalOpen}/>
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
