import {Layout, theme} from 'antd';
import {Content} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import {Sidhuvud} from "./layouts/Sidhuvud.tsx";
import {useThemeSammanhang} from "./hooks/useContext.ts";


/**
 * Main application component.
 * Acts as the entry point for global providers and the RouterProvider.
 */
export const App = () => {
  const {colors} = useThemeSammanhang();
  const {token} = theme.useToken();


  return (
    <Layout style={{minHeight: '100vh', background: `linear-gradient(135deg, ${colors.join(', ')})`}}>
      <Sidhuvud/>
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
          <Outlet/>
        </div>
      </Content>
    </Layout>
  );
}

