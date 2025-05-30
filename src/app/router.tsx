import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { paths } from "@/config/paths";

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from "./routes/app/root";

const router = createBrowserRouter([
  {
    path: paths.auth.register.path,
    lazy: () =>
      import("./routes/auth/register").then((module) => ({
        Component: module.default,
      })),
  },
  {
    path: paths.auth.login.path,
    lazy: () =>
      import("./routes/auth/login").then((module) => ({
        Component: module.default,
      })),
  },
  {
    path: paths.app.root.path,
    element: <AppRoot />,
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        index: true,
        lazy: () =>
          import("./routes/app/home").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: paths.app.tools.path,
        lazy: () =>
          import("./routes/app/tools").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: paths.app.resources.path,
        lazy: () =>
          import("./routes/app/resources").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: paths.app.about.path,
        lazy: () =>
          import("./routes/app/about").then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
  {
    path: "*",
    lazy: () =>
      import("./routes/not-found").then((module) => ({
        Component: module.default,
      })),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
