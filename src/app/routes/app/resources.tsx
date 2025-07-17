import db from "@tombatossals/chords-db/lib/guitar.json";
import YoutubeEmbed from "@/components/ui/youtube-embed";
import { TableOfContents } from "@mantine/core";
import "./resources.css";
import DiagramCard from "@/features/chord-library/components/diagram/diagram-card";

export default function Resources() {
  const MAJOR = 0;
  const MINOR = 1;
  const chords = [
    { name: "D", suffix: "major", chord: db.chords.D[MAJOR].positions[0] },
    { name: "A", suffix: "major", chord: db.chords.A[MAJOR].positions[0] },
    { name: "E", suffix: "major", chord: db.chords.E[MAJOR].positions[0] },
    { name: "A", suffix: "minor", chord: db.chords.C[MINOR].positions[0] },
    { name: "E", suffix: "major", chord: db.chords.E[MINOR].positions[0] },
    { name: "D", suffix: "major", chord: db.chords.D[MINOR].positions[0] },
    { name: "G", suffix: "major", chord: db.chords.G[MAJOR].positions[0] },
    { name: "C", suffix: "major", chord: db.chords.C[MAJOR].positions[0] },
  ];

  return (
    <div className="resources-page-wrapper">
      <title>Resources | FreeTune</title>
      <div className="resources-page-nav">
        <TableOfContents
          variant="filled"
          color="var(--accent-color)"
          size="sm"
          radius="sm"
          scrollSpyOptions={{
            selector: "#resources :is(h1, h2, h3)",
          }}
          getControlProps={({ data }) => ({
            onClick: () => data.getNode().scrollIntoView(),
            children: data.value,
          })}
        />
      </div>
      <div className="resources-page-content" id="resources">
        <div className="resource">
          <h2>Tuning Guitar</h2>
          <div className="videos-wrapper">
            <YoutubeEmbed videoId="5jTsSvkBv60" />
            <YoutubeEmbed videoId="CbvtsJlIcz0" />
          </div>
        </div>
        <div className="resource">
          <h2>First Lesson</h2>
          <div className="videos-wrapper">
            <YoutubeEmbed videoId="HNSaXAe8tyg" />
            <YoutubeEmbed videoId="w4a2ge9N31E" />
          </div>
        </div>
        <div className="resource">
          <h2>Essential Chords</h2>
          <div className="chords-wrapper">
            {chords.map((chord, i) => (
              <DiagramCard
                key={i}
                keyName={chord.name}
                suffix={chord.suffix}
                chord={chord.chord}
                link={false}
                version={1}
                diagramSize="md"
                diagramSpeed="fast"
              />
            ))}
          </div>
        </div>
        <h2>First Songs</h2>
        <h2>Popular Creators</h2>
        <h2>Other Resources</h2>
      </div>
    </div>
  );
}
