import { Outlet } from "react-router";

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

const ToolRoot = () => {
  return <Outlet />;
};

export default ToolRoot;
