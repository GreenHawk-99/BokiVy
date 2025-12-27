import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RootProvider} from "./contexts/RootProvider.tsx";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootProvider>
      <RouterProvider router={router}/>
    </RootProvider>
  </React.StrictMode>,
)
