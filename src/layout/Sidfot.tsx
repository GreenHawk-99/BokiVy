import {GithubOutlined} from "@ant-design/icons";
import {Footer} from "antd/es/layout/layout";
import {Button, ConfigProvider, Divider, Flex, Space} from "antd";
import {TinyColor} from "@ctrl/tinycolor";
import {useThemeVy} from "../hooks/useThemeVy.ts";

export function Sidfot() {
  const {colors} = useThemeVy();


  const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());

  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  const openLink = () => {
    window.open("https://github.com/GreenHawk-99")
  }

  return (<Footer style={{textAlign: 'center'}}>
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
  </Footer>)
}