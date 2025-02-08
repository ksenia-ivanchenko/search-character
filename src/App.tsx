import { ROUTES } from "@constants";
import { SearchPage } from "@pages";
import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
    {
        path: ROUTES.SEARCH,
        element: <SearchPage />,
    },
]);

export const App = () => {
    return <RouterProvider router={router} />;
};
