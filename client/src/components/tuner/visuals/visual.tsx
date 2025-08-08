import Graph from "./graph";
import Dial from "./dial";
import { useUserSettings } from "@/contexts/user-settings-context";

interface VisualProps {
  freqDifference: number | null;
  centsDifference: number | null;
}

export default function Visual({
  freqDifference,
  centsDifference,
}: VisualProps) {
  const { instrumentSettings } = useUserSettings();
  if (instrumentSettings.visualName === "graph")
    return (
      <Graph
        freqDifference={freqDifference}
        centsDifference={centsDifference}
      />
    );
  if (instrumentSettings.visualName === "dial")
    return (
      <Dial freqDifference={freqDifference} centsDifference={centsDifference} />
    );
}
