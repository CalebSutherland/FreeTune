import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { paths } from "@/config/paths";

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from "./routes/app/root";

const router = createBrowserRouter([
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
