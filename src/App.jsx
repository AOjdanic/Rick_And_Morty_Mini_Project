import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Root from "./pages/Root";
import Home, { loader as mainLoader } from "./pages/Home";
import Details, { loader as detailsLoader } from "./pages/Details";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to="/pages/1" replace /> },
      {
        id: "pages",
        path: "/pages/:page",
        element: <Home />,
        loader: mainLoader,
      },
      {
        path: "/character/:id",
        element: <Details />,
        loader: detailsLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
