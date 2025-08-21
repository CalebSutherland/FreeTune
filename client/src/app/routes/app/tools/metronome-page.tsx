import Metronome from "@/features/metronome/components/metronome";
import ToolsRow from "@/components/ui/tools-row";
import MetronomeInstructions from "@/components/instructions/metronome-instructions";
import "./metronome-page.css";
import "./tools.css";

export default function MetronomePage() {
  return (
    <div className="mp-wrapper">
      <title>Metronome | FreeTune</title>
      <div className="page-content">
        <Metronome />
      </div>
      <div className="page-instructions">
        <h2 style={{ padding: "2rem 0 1rem" }}>How to Use</h2>
        <MetronomeInstructions />
      </div>
      <div className="page-content">
        <ToolsRow />
      </div>
    </div>
  );
}
