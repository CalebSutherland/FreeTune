import Graph from "./graph";
import Dial from "./dial";

interface VisualProps {
  visual: string;
  freqDifference: number | null;
  centsDifference: number | null;
}

export default function Visual({
  visual,
  freqDifference,
  centsDifference,
}: VisualProps) {
  if (visual === "graph")
    return (
      <Graph
        freqDifference={freqDifference}
        centsDifference={centsDifference}
      />
    );
  if (visual === "dial")
    return (
      <Dial freqDifference={freqDifference} centsDifference={centsDifference} />
    );
}
