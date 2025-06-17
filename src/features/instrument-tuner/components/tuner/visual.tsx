import Graph from "../tuner-visuals/graph";

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
  // if (visual === "bar")
  //   return (
  //     <Dial freqDifference={freqDifference} centsDifference={centsDifference} />
  //   );
}
