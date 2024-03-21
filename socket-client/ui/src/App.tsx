import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";

import { DemoPage, ErrorPage, MetricsPage, SigninPage } from "./pages";

const routes: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { element: <SigninPage />, index: true },
      { path: "/demo", element: <DemoPage /> },
      { path: "/metrics", element: <MetricsPage /> },
    ],
  },
];

function App() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
