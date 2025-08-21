import ClassicTuner from "@/features/classic-tuner/components/classic-tuner";
import ToolsRow from "@/components/ui/tools-row";
import ClassicTunerInstructions from "@/components/instructions/classic-instructions";
import "./tuner-page.css";
import "./tools.css";

export default function ClassicTunerPage() {
  return (
    <div className="tuner-page-wrapper">
      <title>Classic Tuner | FreeTune</title>
      <div className="page-content">
        <ClassicTuner />
      </div>
      <div className="page-instructions">
        <h2 style={{ padding: "2rem 0 1rem" }}>How to Use</h2>
        <ClassicTunerInstructions />
      </div>
      <div className="page-content">
        <ToolsRow />
      </div>
    </div>
  );
}
