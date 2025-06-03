import { Outlet } from "react-router";

import { ToolsLayout } from "@/components/layouts";

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

const ToolRoot = () => {
  return (
    <ToolsLayout>
      <Outlet />
    </ToolsLayout>
  );
};

export default ToolRoot;
