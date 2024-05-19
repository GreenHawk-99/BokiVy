import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AppListVy} from "./bokaegis/AppListVy.tsx";
import ErrorVy from "./utils/ErrorVy.tsx";
import {AppVy} from "./application/AppVy.tsx";
import {OverviewVy} from "./overview/OverviewVy.tsx";

export function Router() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <AppListVy />,
            errorElement: <ErrorVy />,
            children: [
                {
                    path: "/applications",
                    element: <AppListVy />,
                },
                {
                    path: "/applications/:applicationId",
                    element: <AppVy />,
                },
                {
                    path: "/overview",
                    element: <OverviewVy />,
                },
            ],
        },
    ]);

    return (
        <RouterProvider router={router} />
    )
}
