import ChordDiagram from "./chord-diagram";
import db from "@tombatossals/chords-db/lib/guitar.json";
import { useNotePlayer } from "@/hooks/useNotePlayer";

export default function ChordLibrary() {
  const { playNote, loadInstrument } = useNotePlayer();

  console.log(db);
  return (
    // <div>
    //   <h1>All Guitar Chords</h1>
    //   {Object.entries(db.chords).map(([key, chordList]) => (
    //     <div key={key}>
    //       <h2>{key}</h2>
    //       {chordList.map((chord) => (
    //         <div key={chord.suffix}>
    //           <h3>{chord.suffix}</h3>
    //           {chord.positions.map((position) => (
    //             <ChordDiagram chord={position} />
    //           ))}
    //         </div>
    //       ))}
    //     </div>
    //   ))}
    // </div>
    <div>
      {db.chords.C.map((chord, i) => (
        <div key={i}>
          <h2>{chord.suffix}</h2>
          {chord.positions.map((pos, id) => (
            <ChordDiagram
              key={id}
              chord={pos}
              playNote={playNote}
              loadInstrument={loadInstrument}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
