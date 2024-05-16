import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {App} from "./App.tsx";
import {ConfigProvider, theme} from "antd";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ConfigProvider
          theme={{
              token: {
                  colorPrimary: "#01e973",
                  colorPrimaryBorder: "#8d42ff"
                  //colorPrimary:'linear-gradient(135deg, rgba(1,233,115,1) 20%, rgba(141,66,255,1) 80%)'
                  //colorPrimary:'linear-gradient(135deg, #01e973 ,#8d42ff )'
              },
              algorithm: [theme.darkAlgorithm, theme.defaultAlgorithm],
          }}>
          <App />
      </ConfigProvider>
  </React.StrictMode>,
)
