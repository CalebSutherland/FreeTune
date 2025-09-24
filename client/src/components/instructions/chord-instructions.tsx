import { useState } from "react";

import DiagramCard from "@/features/chord-library/components/diagram/diagram-card";
import { useNotePlayer } from "@/hooks/use-note-player";
import db from "@tombatossals/chords-db/lib/guitar.json";
import { SegmentedControl, TableOfContents } from "@mantine/core";
import type { Key } from "@/types/chord-types";
import { formatKeyName } from "@/utils/chord-utils";
import { LuRabbit, LuTurtle } from "react-icons/lu";
import "./instructions.css";

export default function ChordInstructions() {
  const keys = Object.keys(db.chords) as Key[];

  const [exampleSpeed, setExampleSpeed] = useState<"slow" | "fast">("fast");
  const [exampleKey, setExampleKey] = useState("C");
  const [exampleSuffix, setExampleSuffix] = useState("major");
  const exSuffixes = ["major", "minor", "dim", "dim7"];
  const [exampleSize, setExampleSize] = useState<"xs" | "sm" | "md">("sm");

  const { playNote, loadInstrument } = useNotePlayer();

  return (
    <div className="htu-wrapper">
      <div className="htu-nav">
        <p>Table of Contents</p>
        <TableOfContents
          variant="filled"
          color="var(--accent-color)"
          size="sm"
          radius="sm"
          scrollSpyOptions={{
            selector: "#chords :is(h1, h2, h3)",
          }}
          getControlProps={({ data }) => ({
            onClick: () => data.getNode().scrollIntoView(),
            children: data.value,
          })}
        />
      </div>
      <div className="htu-content" id="chords">
        <div className="htu-main">
          <h2>Library Instructions</h2>
          <div className="htu-minor">
            <h3>Note Pages</h3>
            <div className="htu-card">
              <div className="example-keys">
                {keys.slice(0, 4).map((k) => (
                  <button
                    key={k}
                    className={`key-button ${exampleKey === k ? "active" : ""}`}
                    onClick={() => setExampleKey(k)}
                  >
                    {formatKeyName(k)}
                  </button>
                ))}
              </div>
            </div>
            <p>
              Click on any note (like C or F♯) at the top to go to its Note
              Page. You'll see one diagram for each suffix of that note (e.g. C
              major, C minor, etc.). Note pages also have a list of suffixes on
              the left that link to Suffix Pages
            </p>
          </div>
          <div className="htu-minor">
            <h3>Suffix Pages</h3>
            <div className="htu-card">
              <div className="example-suffix">
                {exSuffixes.map((suf) => (
                  <button
                    key={suf}
                    className={`suffix-button ${
                      exampleSuffix === suf ? "active" : ""
                    }`}
                    style={{
                      width: "100%",
                      paddingRight: "0.5rem",
                      textAlign: "left",
                    }}
                    onClick={() => setExampleSuffix(suf)}
                  >
                    {suf}
                  </button>
                ))}
              </div>
            </div>
            <p>
              Suffix pages (e.g. C Major) show all chord variations for that
              note and suffix. Use the sidebar on the left to navigate to other
              suffixes of the current note.
            </p>
          </div>
          <div className="htu-minor">
            <h3>Playback Features</h3>
            <div className="htu-card">
              <DiagramCard
                keyName="C"
                suffix="major"
                chord={db.chords.C[0].positions[0]}
                link={false}
                playNote={playNote}
                loadInstrument={loadInstrument}
                version={1}
                diagramSize={exampleSize}
                diagramSpeed={exampleSpeed}
                example={true}
              />
            </div>
            <p>
              Every chord diagram has a play button to hear the chord. You can
              also click any finger dot or "O" for open strings to hear
              individual notes. Use the speed control (top-right) to slow down
              or speed up chord playback.
            </p>
            <div className="htu-card">
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
                  value={exampleSpeed}
                  onChange={(val) => setExampleSpeed(val as "slow" | "fast")}
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
          </div>
          <div className="htu-minor">
            <h3>Diagram Settings</h3>
            <div className="htu-card">
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
                  value={exampleSize}
                  onChange={(val) => setExampleSize(val as "xs" | "sm" | "md")}
                  data={[
                    { label: "sm", value: "xs" },
                    { label: "md", value: "sm" },
                    { label: "lg", value: "md" },
                  ]}
                />
              </div>
            </div>
            <p>
              Use the size toggle (top-left) to switch between small and large
              chord diagrams based on your preference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
