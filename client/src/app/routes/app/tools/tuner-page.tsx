import InstrumentTuner from "@/features/instrument-tuner/components/tuner/tuner";
import TunerInstructions from "@/components/instructions/tuner-instructions";
import ToolsRow from "@/components/ui/tools-row";
import "./tuner-page.css";
import "./tools.css";

export default function TunerPage() {
  return (
    <div className="tuner-page-wrapper">
      <title>Tuner | FreeTune</title>
      <div className="page-content">
        <InstrumentTuner />
      </div>
      <div className="page-instructions">
        <h2 style={{ padding: "2rem 0 1rem" }}>How to Use</h2>
        <TunerInstructions />
      </div>
      <div className="page-content">
        <ToolsRow />
      </div>
    </div>
  );
}
