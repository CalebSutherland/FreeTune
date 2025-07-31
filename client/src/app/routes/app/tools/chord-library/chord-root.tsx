import { Outlet } from "react-router";

import { ChordLibraryLayout } from "@/components/layouts";

const ChordRoot = () => {
  return (
    <ChordLibraryLayout>
      <Outlet />
    </ChordLibraryLayout>
  );
};

export default ChordRoot;
