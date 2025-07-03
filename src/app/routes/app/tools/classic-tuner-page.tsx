import ClassicTuner from "@/features/classic-tuner/components/classic-tuner";
import "./tuner-page.css";
import ToolsRow from "@/components/ui/tools-row";

export default function ClassicTunerPage() {
  return (
    <div className="tuner-page-wrapper">
      <title> Classic Tuner | Freetune</title>
      <ClassicTuner />
      <ToolsRow />
    </div>
  );
}
