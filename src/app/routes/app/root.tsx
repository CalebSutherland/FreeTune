import { Outlet } from "react-router";

import { HeaderLayout } from "@/components/layouts";

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

const AppRoot = () => {
  return (
    <HeaderLayout>
      <Outlet />
    </HeaderLayout>
  );
};

export default AppRoot;
