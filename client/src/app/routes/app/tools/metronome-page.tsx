import Metronome from "@/features/metronome/components/metronome";
import ToolsRow from "@/components/ui/tools-row";
import MetronomeInstructions from "@/components/instructions/metronome-instructions";
import "./metronome-page.css";

export default function MetronomePage() {
  return (
    <div className="mp-wrapper">
      <title>Metronome | FreeTune</title>
      <Metronome />
      <h2>How to Use</h2>
      <MetronomeInstructions />
      <ToolsRow />
    </div>
  );
}
