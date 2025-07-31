import { getFrequencyFromNote, getNoteName } from "@/utils/tuner-utils";
import "./tuner-stats.css";

interface TunerStatsProps {
  pitch: number | null;
  clarity: number;
  isListening: boolean;
  target: string | null;
  freqDifference: number | null;
  centsDifference: number | null;
}

export default function TunerStats({
  pitch,
  clarity,
  isListening,
  target,
  freqDifference,
  centsDifference,
}: TunerStatsProps) {
  return (
    <div className="stats-content">
      <p>
        <span>Frequency:</span> {pitch ? pitch.toFixed(2) + " Hz" : "N/A"}
      </p>
      <p>
        <span>Target Frequency:</span>{" "}
        {getFrequencyFromNote(target)?.toFixed(2) ?? "None"}
      </p>
      <p>
        <span>Note:</span> {getNoteName(pitch)}
      </p>
      <p>
        <span>Target Note:</span> {target ?? "None"}
      </p>
      <p>
        <span>Difference:</span>{" "}
        {freqDifference ? freqDifference.toFixed(2) : "N/A"}
      </p>
      <p>
        <span>Difference (cents):</span> {centsDifference?.toFixed(0) ?? "N/A"}
      </p>
      <p>
        <span>Clarity:</span> {clarity.toFixed(2)}
      </p>
      <p>
        <span>Status:</span> {isListening ? "Listening" : "Not Listening"}
      </p>
    </div>
  );
}
