import Metronome from "@/features/metronome/components/metronome";
import "./metronome-page.css";
import ToolsRow from "@/components/ui/tools-row";

export default function MetronomePage() {
  return (
    <div className="mp-wrapper">
      <Metronome />
      <ToolsRow />
    </div>
  );
}
