import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AppVy} from "./server/AppVy.tsx";

export function Router() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <AppVy />,

            children: [
                {
                    path: "/applications",
                    element: <AppVy />,
                },
            ],
        },
    ]);

    return (
        <RouterProvider router={router} />
    )
}
