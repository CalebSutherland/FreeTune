import InstrumentTuner from "@/features/instrument-tuner/components/tuner/tuner";
import TunerInstructions from "@/components/instructions/tuner-instructions";
import ToolsRow from "@/components/ui/tools-row";
import "./tuner-page.css";

export default function TunerPage() {
  return (
    <div className="tuner-page-wrapper">
      <title>Tuner | FreeTune</title>
      <InstrumentTuner />
      <h2>How to Use</h2>
      <TunerInstructions />
      <ToolsRow />
    </div>
  );
}
