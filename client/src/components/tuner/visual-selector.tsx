import { useUserSettings } from "@/contexts/user-settings-context";

import { ActionIcon } from "@mantine/core";
import { FaGear } from "react-icons/fa6";
import { MdOutlineShowChart } from "react-icons/md";
import { PiGauge } from "react-icons/pi";
import "./visual-selector.css";

export default function visualSelector() {
  const { instrumentSettings, updateInstrumentSettings } = useUserSettings();

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
          className={`visual-icon ${
            instrumentSettings.visualName === vis.name ? "active" : ""
          }`}
          variant="outline"
          size="md"
          onClick={() => updateInstrumentSettings({ visualName: vis.name })}
        >
          {vis.icon}
        </ActionIcon>
      ))}
    </ActionIcon.Group>
  );
}
