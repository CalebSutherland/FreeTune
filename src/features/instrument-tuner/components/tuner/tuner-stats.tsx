import { getNoteName, getFrequencyFromNote } from "../../utils/noteUtils";
import { Accordion } from "@mantine/core";
import "./tuner-stats.css";

interface TunerStatsProps {
  pitch: number | null;
  clarity: number;
  isListening: boolean;
  target: string | null;
}

export default function TunerStats({
  pitch,
  clarity,
  isListening,
  target,
}: TunerStatsProps) {
  let freqDifference: string | null = null;
  let centsDifference: string | null = null;

  if (pitch && target) {
    const targetFreq = getFrequencyFromNote(target);
    if (targetFreq !== null && targetFreq !== undefined) {
      freqDifference =
        (pitch - targetFreq > 0 ? "+" : " ") + (pitch - targetFreq).toFixed(2);

      const centsDiff = 1200 * Math.log2(pitch / targetFreq);
      centsDifference = (centsDiff > 0 ? "+" : "") + centsDiff.toFixed(0);
    }
  }

  return (
    <Accordion
      classNames={{
        control: "stats-accordion-control",
        item: "stats-accordion-item",
        label: "stats-accordion-label",
      }}
    >
      <Accordion.Item value="tuner-stats">
        <Accordion.Control>Tuner Stats</Accordion.Control>
        <Accordion.Panel>
          <p>Target Note: {target ?? "None"}</p>
          <p>
            Target Frequency:{" "}
            {getFrequencyFromNote(target)?.toFixed(2) ?? "None"}
          </p>
          <p>Note: {getNoteName(pitch)}</p>
          <p>Frequency: {pitch ? pitch.toFixed(2) + " Hz" : "N/A"}</p>
          <p>
            Frequency Difference:{" "}
            {freqDifference ? freqDifference + " Hz" : "N/A"}
          </p>
          <p>Cents Difference: {centsDifference ?? "N/A"}</p>
          <p>Clarity: {clarity.toFixed(2)}</p>
          <p>Listening: {isListening ? "Listening" : "Not Listening"}</p>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
