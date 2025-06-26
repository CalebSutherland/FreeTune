import { useState } from "react";

import db from "@tombatossals/chords-db/lib/guitar.json";
import { useNotePlayer } from "@/hooks/useNotePlayer";
import DiagramCard from "./diagram-card";
import { SegmentedControl } from "@mantine/core";
import { LuRabbit, LuTurtle } from "react-icons/lu";
import "./chord-library.css";
import { formatKeyName } from "../utils/chord-utils";

type Key = keyof typeof db.chords;

export default function ChordLibrary() {
  const keys = Object.keys(db.chords) as Key[];
  const [key, setKey] = useState<Key>("C");
  const chordList = db.chords[key];
  const suffixes = Array.from(new Set(chordList.map((chord) => chord.suffix)));
  const [suffix, setSuffix] = useState(suffixes[0]);
  const selectedChord = chordList.find((chord) => chord.suffix === suffix);

  const [showAllKeys, setShowAllKeys] = useState(true);
  const [showAllSuffixes, setShowAllSuffixes] = useState(true);

  const [size, setSize] = useState<"xs" | "sm" | "md">("xs");
  const [speed, setSpeed] = useState<"slow" | "fast">("fast");

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
            {formatKeyName(k)}
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
          <div className="chord-content-header">
            <div className="segmented-control">
              <p>Size:</p>
              <SegmentedControl
                withItemsBorders={false}
                classNames={{
                  root: "segmented-control-root",
                  indicator: "segmented-control-indicator",
                  label: "segmented-control-label",
                  control: "segmented-control-control",
                }}
                value={size}
                onChange={(val) => setSize(val as "xs" | "sm" | "md")}
                data={[
                  { label: "sm", value: "xs" },
                  { label: "md", value: "sm" },
                  { label: "lg", value: "md" },
                ]}
              />
            </div>

            <div className="segmented-control">
              <p>Speed:</p>
              <SegmentedControl
                withItemsBorders={false}
                classNames={{
                  root: "segmented-control-root",
                  indicator: "segmented-control-indicator",
                  label: "segmented-control-label",
                  control: "segmented-control-control",
                }}
                value={speed}
                onChange={(val) => setSpeed(val as "slow" | "fast")}
                data={[
                  {
                    label: (
                      <span className="segmented-icon">
                        <LuRabbit size={20} />
                      </span>
                    ),
                    value: "fast",
                  },
                  {
                    label: (
                      <span className="segmented-icon">
                        <LuTurtle size={20} />
                      </span>
                    ),
                    value: "slow",
                  },
                ]}
              />
            </div>
          </div>
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
                          <DiagramCard
                            keyName={k}
                            suffix={suf}
                            chord={chord.positions[0]}
                            midi={chord.positions[0].midi}
                            playNote={playNote}
                            loadInstrument={loadInstrument}
                            size={size}
                            speed={speed}
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
                        <DiagramCard
                          keyName={key}
                          suffix={suf}
                          chord={chord.positions[0]}
                          midi={chord.positions[0].midi}
                          playNote={playNote}
                          loadInstrument={loadInstrument}
                          size={size}
                          speed={speed}
                        />
                      </div>
                    )
                  );
                })
              : selectedChord.positions.map((pos, i) => (
                  <DiagramCard
                    key={i}
                    keyName={key}
                    suffix={suffix}
                    chord={pos}
                    midi={pos.midi}
                    playNote={playNote}
                    loadInstrument={loadInstrument}
                    size={size}
                    speed={speed}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
