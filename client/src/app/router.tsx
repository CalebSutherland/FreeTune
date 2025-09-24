import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { paths } from "@/config/paths";

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from "./routes/app/root";
import ToolRoot from "./routes/app/tools/tool-root";
import ChordRoot from "./routes/app/tools/chord-library/chord-root";
import PageLoader from "@/components/ui/page-loader";

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
        path: paths.app.tools.root.path,
        element: <ToolRoot />,
        ErrorBoundary: AppRootErrorBoundary,
        children: [
          {
            index: true,
            lazy: () =>
              import("./routes/app/tools/tuner-page").then((module) => ({
                Component: module.default,
              })),
          },
          {
            path: paths.app.tools.metronome.path,
            lazy: () =>
              import("./routes/app/tools/metronome-page").then((module) => ({
                Component: module.default,
              })),
          },
          {
            path: paths.app.tools.classic_tuner.path,
            lazy: () =>
              import("./routes/app/tools/classic-tuner-page").then(
                (module) => ({
                  Component: module.default,
                })
              ),
          },
          {
            path: paths.app.tools.chord_library.root.path,
            element: <ChordRoot />,
            ErrorBoundary: AppRootErrorBoundary,
            children: [
              {
                path: paths.app.tools.chord_library.chord_library_key.path,
                lazy: () =>
                  import(
                    "./routes/app/tools/chord-library/chord-key-page"
                  ).then((module) => ({
                    Component: module.default,
                  })),
              },
              {
                path: paths.app.tools.chord_library.chord_library_key_suffix
                  .path,
                lazy: () =>
                  import(
                    "./routes/app/tools/chord-library/chord-suffix-page"
                  ).then((module) => ({
                    Component: module.default,
                  })),
              },
            ],
          },
        ],
      },
      {
        path: paths.app.resources.path,
        lazy: () =>
          import("./routes/app/resources").then((module) => ({
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
  return <RouterProvider router={router} fallbackElement={<PageLoader />} />;
}
