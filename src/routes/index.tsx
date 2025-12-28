import {createBrowserRouter} from 'react-router-dom';
import {OverviewVy} from '../pages/OverviewVy';
import {AppList} from '../components/AppList.tsx';
import ErrorVy from '../pages/ErrorVy.tsx';
import {App} from "../App.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorVy/>,
    children: [
      {
        index: true,
        element: <AppList/>,
      },
      {
        path: "overview",
        element: <OverviewVy/>,
      },
    ],
  },
]);