import { Button } from "@mantine/core";
import type React from "react";
import { FaChevronLeft } from "react-icons/fa";

interface BackButtonProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BackButton({ setShowMenu }: BackButtonProps) {
  return (
    <Button
      variant="transparent"
      leftSection={<FaChevronLeft />}
      color="var(--text-color)"
      onClick={() => setShowMenu(false)}
    >
      Back
    </Button>
  );
}
