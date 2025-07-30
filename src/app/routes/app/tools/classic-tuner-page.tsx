import ClassicTuner from "@/features/classic-tuner/components/classic-tuner";
import ToolsRow from "@/components/ui/tools-row";
import "./tuner-page.css";
import ClassicTunerInstructions from "@/components/instructions/classic-instructions";

export default function ClassicTunerPage() {
  return (
    <div className="tuner-page-wrapper">
      <title>Classic Tuner | FreeTune</title>
      <ClassicTuner />
      <h2>How to Use</h2>
      <ClassicTunerInstructions />
      <ToolsRow />
    </div>
  );
}
