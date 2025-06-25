import { useState } from "react";

import ChordDiagram from "./chord-diagram";
import db from "@tombatossals/chords-db/lib/guitar.json";
import { useNotePlayer } from "@/hooks/useNotePlayer";
import "./chord-library.css";

type Key = keyof typeof db.chords;

export default function ChordLibrary() {
  console.log(db);

  const keys = Object.keys(db.chords) as Key[];
  const [key, setKey] = useState<Key>("C");
  const chordList = db.chords[key];

  const suffixes = Array.from(new Set(chordList.map((chord) => chord.suffix)));
  const [suffix, setSuffix] = useState(suffixes[0]);

  const selectedChord = chordList.find((chord) => chord.suffix === suffix);

  const [showAllKeys, setShowAllKeys] = useState(true);
  const [showAllSuffixes, setShowAllSuffixes] = useState(true);

  const { playNote, loadInstrument } = useNotePlayer();

  const handleKeyChange = (newKey: Key) => {
    setKey(newKey);
    const newSuffixes = Array.from(
      new Set(db.chords[newKey].map((chord) => chord.suffix))
    );
    setSuffix(newSuffixes[0]);
    setShowAllSuffixes(true);
    setShowAllKeys(false);
  };

  if (!selectedChord)
    return (
      <p>
        No chord found for {key} {suffix}
      </p>
    );

  return (
    <div className="chord-lib-wrapper">
      <div className="chord-lib-header">
        <button
          className={`key-button ${showAllKeys ? "active" : ""}`}
          onClick={() => {
            setShowAllKeys(true);
            setShowAllSuffixes(true);
          }}
        >
          All
        </button>
        {keys.map((k) => (
          <button
            className={`key-button ${
              !showAllKeys && key === k ? "active" : ""
            }`}
            key={k}
            onClick={() => handleKeyChange(k)}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="chord-lib-main">
        {!showAllKeys && (
          <div className="chord-lib-nav">
            <button
              className={`suffix-button ${showAllSuffixes ? "active" : ""}`}
              onClick={() => setShowAllSuffixes(true)}
            >
              All
            </button>
            {suffixes.map((s) => (
              <button
                key={s}
                className={`suffix-button ${
                  !showAllSuffixes && suffix === s ? "active" : ""
                }`}
                onClick={() => {
                  setSuffix(s);
                  setShowAllSuffixes(false);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="chord-lib-content">
          <h2>
            {showAllKeys
              ? "All Keys"
              : key +
                (showAllSuffixes ? " All Chords" : ` ${selectedChord.suffix}`)}
          </h2>
          <div className="diagrams-wrapper">
            {showAllKeys
              ? keys.flatMap((k) => {
                  const chordListForKey = db.chords[k];
                  const suffixesForKey = Array.from(
                    new Set(chordListForKey.map((chord) => chord.suffix))
                  );

                  return suffixesForKey.map((suf) => {
                    const chord = chordListForKey.find((c) => c.suffix === suf);
                    return (
                      chord && (
                        <div key={`${k}-${suf}`}>
                          <h3>
                            {k} {suf}
                          </h3>
                          <ChordDiagram
                            chord={chord.positions[0]}
                            playNote={playNote}
                            loadInstrument={loadInstrument}
                          />
                        </div>
                      )
                    );
                  });
                })
              : showAllSuffixes
              ? suffixes.map((suf) => {
                  const chord = chordList.find((c) => c.suffix === suf);
                  return (
                    chord && (
                      <div key={`${key}-${suf}`}>
                        <h3>
                          {key} {suf}
                        </h3>
                        <ChordDiagram
                          chord={chord.positions[0]}
                          playNote={playNote}
                          loadInstrument={loadInstrument}
                        />
                      </div>
                    )
                  );
                })
              : selectedChord.positions.map((pos, i) => (
                  <ChordDiagram
                    key={i}
                    chord={pos}
                    playNote={playNote}
                    loadInstrument={loadInstrument}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
