import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ConfigProvider} from "antd";
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ConfigProvider
          theme={{
              token: {
                  colorPrimary: "#01e973",
                  colorPrimaryBorder: "#8d42ff"
                  //colorPrimary:'linear-gradient(135deg, rgba(1,233,115,1) 20%, rgba(141,66,255,1) 80%)'
                  //colorPrimary:'linear-gradient(135deg, #01e973 ,#8d42ff )'

                  /*
                  {
  "token": {
    "colorPrimary": "#01e973",
    "colorInfo": "#01e973",
    "colorBgBase": "#202020"
  },
  "algorithm": "dark"
}
                   */
              },
              // algorithm: [theme.darkAlgorithm, theme.defaultAlgorithm]
          }}>
          <RouterProvider router={router} />
      </ConfigProvider>
  </React.StrictMode>,
)
