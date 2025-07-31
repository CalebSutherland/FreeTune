import Graph from "./graph";
import Dial from "./dial";

interface VisualProps {
  visual: string;
  freqDifference: number | null;
  centsDifference: number | null;
  displayCents: boolean;
}

export default function Visual({
  visual,
  freqDifference,
  centsDifference,
  displayCents,
}: VisualProps) {
  if (visual === "graph")
    return (
      <Graph
        freqDifference={freqDifference}
        centsDifference={centsDifference}
        displayCents={displayCents}
      />
    );
  if (visual === "dial")
    return (
      <Dial
        freqDifference={freqDifference}
        centsDifference={centsDifference}
        displayCents={displayCents}
      />
    );
}
