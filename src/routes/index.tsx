import {createBrowserRouter} from 'react-router-dom';
import {OverviewVy} from '../pages/OverviewVy';
import {AppListVy} from '../components/AppListVy';
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
        element: <AppListVy/>,
      },
      {
        path: "overview",
        element: <OverviewVy/>,
      },
    ],
  },
]);