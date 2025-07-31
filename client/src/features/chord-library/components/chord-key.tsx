import { useParams } from "react-router-dom";
import { useNotePlayer } from "@/hooks/use-note-player";
import { useChordLibrary } from "@/contexts/chord-library-context";
import db from "@tombatossals/chords-db/lib/guitar.json";
import DiagramCard from "./diagram/diagram-card";
import type { Key } from "@/types/chord-types";
import { useWindowScroll } from "@mantine/hooks";
import { Affix, Button, Transition } from "@mantine/core";
import { FaArrowUp } from "react-icons/fa";

export default function ChordKey() {
  const { key: routeKey } = useParams<{ key: string }>();

  if (!routeKey || !(routeKey in db.chords)) {
    return <p>Invalid key</p>;
  }

  const chordList = db.chords[routeKey as Key];
  const suffixes = Array.from(new Set(chordList.map((chord) => chord.suffix)));

  const [scroll, scrollTo] = useWindowScroll();
  const { playNote, loadInstrument } = useNotePlayer();
  const { size, speed } = useChordLibrary();

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition={"slide-up"} mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              color="var(--accent-color)"
              leftSection={<FaArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
      {suffixes.map((suf) => {
        const chord = chordList.find((c) => c.suffix === suf);
        return (
          chord && (
            <div key={`${routeKey}-${suf}`}>
              <DiagramCard
                keyName={routeKey}
                suffix={suf}
                chord={chord.positions[0]}
                link={true}
                diagramSize={size}
                diagramSpeed={speed}
                playNote={playNote}
                loadInstrument={loadInstrument}
              />
            </div>
          )
        );
      })}
    </>
  );
}
