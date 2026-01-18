import {createBrowserRouter} from 'react-router-dom';
import {OverviewVy} from '../pages/OverviewVy';
import {ServerDisplay} from '../pages/ServerDisplay.tsx';
import {BenchmarkVy} from '../pages/BenchmarkVy.tsx';
import ErrorVy from '../pages/ErrorVy.tsx';
import {RootProvider} from "../contexts/RootProvider.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootProvider/>,
    errorElement: <ErrorVy/>,
    children: [
      {
        index: true,
        element: <ServerDisplay/>,
      },
      {
        path: "overview",
        element: <OverviewVy/>,
      },
      {
        path: "benchmark",
        element: <BenchmarkVy/>,
      },
    ],
  },
]);