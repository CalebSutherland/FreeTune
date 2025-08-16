import { paths } from "@/config/paths";
import { useMediaQuery } from "@mantine/hooks";
import { FaBook, FaGuitar } from "react-icons/fa6";
import { MdTune } from "react-icons/md";
import { PiMetronome } from "react-icons/pi";
import ToolCard from "./tool-card";
import "./tools-row.css";

export default function ToolsRow() {
  const isMdScreen = useMediaQuery("(max-width: 525px)");
  const isSmScreen = useMediaQuery("(max-width: 425px)");

  const tools = [
    {
      name: "Instrument Tuner",
      to: paths.app.tools.tuner.getHref(),
      icon: FaGuitar,
      color: "var(--accent-color)",
    },
    {
      name: "Chord Library",
      to: paths.app.tools.chord_library.root.getHref(),
      icon: FaBook,
      color: "orange",
    },
    {
      name: "Metronome",
      to: paths.app.tools.metronome.getHref(),
      icon: PiMetronome,
      color: "purple",
    },
    {
      name: "Classic Tuner",
      to: paths.app.tools.classic_tuner.getHref(),
      icon: MdTune,
      color: "green",
    },
  ];
  return (
    <div className="tools-wrapper">
      <h2 style={{ paddingBottom: "1rem" }}>Tools</h2>
      <div className="card-row">
        {tools.map((tool) => (
          <ToolCard
            key={tool.name}
            bgColor={tool.color}
            to={tool.to}
            name={tool.name}
            icon={tool.icon}
            size={isSmScreen ? 145 : isMdScreen ? 150 : 200}
          />
        ))}
      </div>
    </div>
  );
}
