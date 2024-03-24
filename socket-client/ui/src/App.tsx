import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";

import { DemoPage, ErrorPage, MetricsPage, SigninPage } from "./pages";
import { AuthContextProvider } from "./store";

const routes: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <SigninPage /> },
      { path: "/demo", element: <DemoPage /> },
      { path: "/metrics", element: <MetricsPage /> },
    ],
  },
];

function App() {
  const router = createBrowserRouter(routes);
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
