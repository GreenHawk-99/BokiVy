import {isRouteErrorResponse, useNavigate, useRouteError} from "react-router-dom";
import {Button, Collapse, Layout, Result, Space, theme, Typography} from 'antd';
import {ThemeProvider} from "../contexts/ThemeProvider.tsx";
import {useThemeKrok} from "../hooks/useContext.ts";
import {FontSizeOutlined, HomeOutlined, ReloadOutlined} from '@ant-design/icons';
import {ReactNode} from "react";
import {useTranslation} from "react-i18next";

const {Text, Paragraph} = Typography;
const {Panel} = Collapse;
const {Content} = Layout;

/**
 * ErrorContent component displays the actual error information.
 * It uses Ant Design components to provide a clean and informative error page.
 */
function ErrorContent() {
  // useRouteError is a React Router hook that provides the error that was thrown during navigation.
  const error = useRouteError();
  const navigate = useNavigate();
  const {colors} = useThemeKrok();
  const {token} = theme.useToken();
  const {t, i18n} = useTranslation();

  console.error('ErrorVy caught an error:', error);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'sv' ? 'en' : 'sv';
    void i18n.changeLanguage(newLang);
  };

  let status: number | string = "Error";
  let title: string = t('errorPage.unexpectedError');
  let subTitle: string = t('errorPage.sorry');
  let extraInfo: ReactNode = null;

  // isRouteErrorResponse checks if the error is a Response object thrown by React Router (e.g., 404).
  if (isRouteErrorResponse(error)) {
    status = error.status;
    title = `${error.status} ${error.statusText}`;
    subTitle = error.data?.message || t('errorPage.notFound');

    // Detailed info for 404 or other router responses
    extraInfo = (
      <div style={{textAlign: 'left', marginTop: 16}}>
        <Text strong>{t('errorPage.details')}:</Text>
        <Paragraph>
          <Text type="secondary">{t('errorPage.status')}: {error.status}</Text><br/>
          <Text type="secondary">{t('errorPage.statusText')}: {error.statusText}</Text><br/>
          {error.data && (
            <Collapse ghost size="small">
              <Panel header={t('errorPage.responseData')} key="data">
                <pre style={{fontSize: '12px'}}>{JSON.stringify(error.data, null, 2)}</pre>
              </Panel>
            </Collapse>
          )}
        </Paragraph>
      </div>
    );
  } else if (error instanceof Error) {
    subTitle = error.message;
    extraInfo = (
      <Collapse ghost style={{marginTop: 24}}>
        <Panel header={t('errorPage.technicalDetails')} key="1">
          <Paragraph>
            <Text type="secondary" style={{whiteSpace: 'pre-wrap', fontFamily: 'monospace'}}>
              {error.stack}
            </Text>
          </Paragraph>
        </Panel>
      </Collapse>
    );
  } else if (error && typeof error === 'object') {
    // Handle generic object errors (like failed fetch or axios errors)
    subTitle = (error as any).message || t('errorPage.unknownObjectError');
    extraInfo = (
      <div style={{textAlign: 'left', marginTop: 16}}>
        <Text strong>{t('errorPage.objectDetails')}:</Text>
        <pre style={{
          padding: 16,
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusSM,
          overflow: 'auto',
          fontSize: '12px'
        }}>
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  } else if (typeof error === 'string') {
    subTitle = error;
  }

  return (
    <Layout style={{minHeight: '100vh', background: `linear-gradient(135deg, ${colors.join(', ')})`}}>
      <Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
        <div style={{
          maxWidth: 800,
          width: '100%',
          background: token.colorBgContainer,
          padding: 48,
          borderRadius: token.borderRadiusLG,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          position: 'relative'
        }}>
          <div style={{position: 'absolute', top: 24, right: 24}}>
            <Button icon={<FontSizeOutlined/>} onClick={toggleLanguage} size="small">
              {i18n.language === 'sv' ? 'SV' : 'EN'}
            </Button>
          </div>

          <Result
            status={typeof status === 'number' ? (status === 404 ? '404' : status === 403 ? '403' : '500') : 'error'}
            title={title}
            subTitle={subTitle}
            extra={[
              <Space key="actions">
                <Button type="primary" icon={<HomeOutlined/>} onClick={() => navigate('/')}>
                  {t('errorPage.goHome')}
                </Button>
                <Button icon={<ReloadOutlined/>} onClick={() => window.location.reload()}>
                  {t('errorPage.reload')}
                </Button>
              </Space>
            ]}
          >
            {extraInfo}
            {!isRouteErrorResponse(error) && !(error instanceof Error) && typeof error !== 'object' && (
              <div style={{marginTop: 24}}>
                <Text type="secondary">{t('errorPage.info')}:</Text>
                <pre style={{
                  padding: 16,
                  background: token.colorFillAlter,
                  borderRadius: token.borderRadiusSM,
                  overflow: 'auto'
                }}>
                  {JSON.stringify(error, null, 2)}
                </pre>
              </div>
            )}
          </Result>
        </div>
      </Content>
    </Layout>
  );
}

/**
 * ErrorVy is the main error boundary component for the router.
 * It wraps ErrorContent with ThemeProvider to ensure consistent styling even when the main app fails to load.
 */
export default function ErrorVy() {
  return (
    <ThemeProvider>
      <ErrorContent/>
    </ThemeProvider>
  );
}