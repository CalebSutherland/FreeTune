import { ActionIcon } from "@mantine/core";
import { FaGear } from "react-icons/fa6";
import { MdOutlineShowChart } from "react-icons/md";
import { PiGauge } from "react-icons/pi";

interface visualSelectorProps {
  visual: string;
  setVisual: React.Dispatch<React.SetStateAction<string>>;
}

export default function visualSelector({
  visual,
  setVisual,
}: visualSelectorProps) {
  const visuals = [
    { name: "graph", icon: <MdOutlineShowChart size={20} /> },
    { name: "dial", icon: <PiGauge size={20} /> },
    { name: "3", icon: <FaGear size={20} /> },
  ];
  return (
    <ActionIcon.Group>
      {visuals.map((vis) => (
        <ActionIcon
          key={vis.name}
          className={`visual-icon ${visual === vis.name ? "active" : ""}`}
          variant="outline"
          size="md"
          onClick={() => setVisual(vis.name)}
        >
          {vis.icon}
        </ActionIcon>
      ))}
    </ActionIcon.Group>
  );
}
