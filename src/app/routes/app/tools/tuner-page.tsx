import InstrumentTuner from "@/features/instrument-tuner/components/tuner/tuner";
import "./tuner-page.css";
import ToolsRow from "@/components/ui/tools-row";

export default function TunerPage() {
  return (
    <div className="tuner-page-wrapper">
      <title>Tuner | FreeTune</title>
      <InstrumentTuner />
      <ToolsRow />
    </div>
  );
}
