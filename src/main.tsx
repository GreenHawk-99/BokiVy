import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/global.scss'
import './i18n';
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
