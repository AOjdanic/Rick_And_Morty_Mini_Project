import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home, { loader as mainLoader } from "./pages/Home";
import Details from "./pages/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home />, loader: mainLoader },
      { path: "/:id", element: <Details /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
