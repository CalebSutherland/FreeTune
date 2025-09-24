import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { paths } from "@/config/paths";
import { useNotePlayer } from "@/hooks/use-note-player";
import db from "@tombatossals/chords-db/lib/guitar.json";
import DiagramCard from "@/features/chord-library/components/diagram/diagram-card";
import "./essential-chords.css";

interface EssentialChordsProps {
  homePage?: boolean;
}

export default function EssentialChords({ homePage }: EssentialChordsProps) {
  const MAJOR = 0;
  const MINOR = 1;
  let chords = [
    { name: "D", suffix: "major", chord: db.chords.D[MAJOR].positions[0] },
    { name: "A", suffix: "major", chord: db.chords.A[MAJOR].positions[0] },
    { name: "E", suffix: "major", chord: db.chords.E[MAJOR].positions[0] },
    { name: "A", suffix: "minor", chord: db.chords.A[MINOR].positions[0] },
    { name: "E", suffix: "minor", chord: db.chords.E[MINOR].positions[0] },
    { name: "D", suffix: "minor", chord: db.chords.D[MINOR].positions[0] },
    { name: "G", suffix: "major", chord: db.chords.G[MAJOR].positions[0] },
    { name: "C", suffix: "major", chord: db.chords.C[MAJOR].positions[0] },
  ];

  const { playNote, loadInstrument } = useNotePlayer();
  const isSmallScreen = useMediaQuery("(max-width: 525px)");

  if (homePage) {
    chords = chords.slice(0, 5);
  }

  return (
    <div className="essential-chords">
      {homePage && <h2>Chords</h2>}
      <div className={`chords-wrapper ${homePage ? "home" : ""}`}>
        {chords.map((chord, i) => (
          <div key={i}>
            <DiagramCard
              keyName={chord.name}
              suffix={chord.suffix}
              chord={chord.chord}
              link={true}
              diagramSize={homePage ? (isSmallScreen ? "sm" : "md") : "sm"}
              diagramSpeed="fast"
              playNote={playNote}
              loadInstrument={loadInstrument}
            />
          </div>
        ))}
      </div>
      {homePage && (
        <p style={{ paddingTop: "0.5rem" }}>
          More chords can be found on the{" "}
          <Link
            to={paths.app.tools.chord_library.chord_library_key.getHref("C")}
          >
            Chord Library
          </Link>{" "}
          page.
        </p>
      )}
    </div>
  );
}
