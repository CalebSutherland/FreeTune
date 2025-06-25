import InstrumentTuner from "@/features/instrument-tuner/components/tuner/tuner";
import "./tuner-page.css";

export default function TunerPage() {
  return (
    <div className="tuner-page-wrapper">
      <title>Tuner | FreeTune</title>
      <InstrumentTuner />
    </div>
  );
}
