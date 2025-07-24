import { Loader } from "@mantine/core";

export default function PageLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loader color="var(--accent-color)" size="xl" />
    </div>
  );
}
