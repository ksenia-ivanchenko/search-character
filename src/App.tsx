import { ROUTES } from "@constants";
import { SearchPage } from "@pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: ROUTES.SEARCH,
        element: <SearchPage />,
    },
]);

export const App = () => {
    return <RouterProvider router={router} />;
};
