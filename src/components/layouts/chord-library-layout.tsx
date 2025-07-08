import { useLayoutEffect, useState } from "react";

import {
  useLocation,
  useNavigationType,
  useParams,
  NavLink,
} from "react-router-dom";
import { paths } from "@/config/paths";
import { useNotePlayer } from "@/hooks/use-note-player";
import { ChordLibraryContext } from "@/contexts/chord-library-context";
import db from "@tombatossals/chords-db/lib/guitar.json";
import type { Key } from "@/types/chord-types";
import { formatKeyName } from "@/utils/chord-utils";
import ToolsRow from "../ui/tools-row";
import { SegmentedControl, TableOfContents } from "@mantine/core";
import { LuRabbit, LuTurtle } from "react-icons/lu";
import "./chord-library-layout.css";
import DiagramCard from "@/features/chord-library/components/diagram/diagram-card";

export function ChordLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [size, setSize] = useState<"xs" | "sm" | "md">("xs");
  const [exampleSize, setExampleSize] = useState<"xs" | "sm" | "md">("sm");
  const [speed, setSpeed] = useState<"slow" | "fast">("fast");
  const [exampleSpeed, setExampleSpeed] = useState<"slow" | "fast">("fast");
  const [exampleKey, setExampleKey] = useState("C");
  const [exampleSuffix, setExampleSuffix] = useState("major");
  const exSuffixes = ["major", "minor", "dim", "dim7"];

  const keys = Object.keys(db.chords) as Key[];
  const params = useParams();
  const routeKey = params.key as Key | undefined;
  const chordList = routeKey ? db.chords[routeKey] : undefined;
  const suffixes = chordList
    ? Array.from(new Set(chordList.map((chord) => chord.suffix)))
    : [];

  const { playNote, loadInstrument } = useNotePlayer();

  const location = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "PUSH") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <ChordLibraryContext.Provider
      value={{
        size,
        setSize,
        speed,
        setSpeed,
        playNote,
        loadInstrument,
      }}
    >
      <div className="chord-lib-wrapper">
        <title>Chord Library | FreeTune</title>
        <div className="chord-lib-header">
          <NavLink
            key="allKeys"
            className="key-button"
            to={paths.app.tools.chord_library.root.getHref()}
            end
          >
            All
          </NavLink>
          {keys.map((k) => (
            <NavLink
              key={k}
              className="key-button"
              to={paths.app.tools.chord_library.chord_library_key.getHref(k)}
            >
              {formatKeyName(k)}
            </NavLink>
          ))}
        </div>
        <div className="chord-lib-main">
          {routeKey && (
            <div className="chord-lib-nav">
              <NavLink
                key={`All${routeKey}suffix`}
                className={`suffix-button `}
                to={paths.app.tools.chord_library.chord_library_key.getHref(
                  routeKey
                )}
                end
              >
                All
              </NavLink>
              {suffixes.map((s) => (
                <NavLink
                  key={`${routeKey}${s}`}
                  className={`suffix-button`}
                  to={paths.app.tools.chord_library.chord_library_key_suffix.getHref(
                    routeKey,
                    encodeURIComponent(s)
                  )}
                >
                  {s}
                </NavLink>
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
            <div className="diagrams-wrapper">{children}</div>
          </div>
        </div>

        <div className="chord-lib-lower">
          <h2>How to Use</h2>
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
                  <h3>All Chords Page</h3>
                  <div className="htu-card">
                    <button className="key-button">All</button>
                  </div>
                  <p>
                    When you first open the Chord Library, you'll land on the
                    All Chords page. This shows one chord diagram for each key
                    (C, C♯, D, etc.) and suffix (major, minor, etc.). Click on
                    the title of any card to go to a specific suffix page with
                    more chord variations.
                  </p>
                </div>
                <div className="htu-minor">
                  <h3>Note Pages</h3>
                  <div className="htu-card">
                    <div className="example-keys">
                      {keys.slice(0, 4).map((k) => (
                        <button
                          className={`key-button ${
                            exampleKey === k ? "active" : ""
                          }`}
                          onClick={() => setExampleKey(k)}
                        >
                          {formatKeyName(k)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p>
                    Click on any note (like C or F♯) at the top to go to its
                    Note Page. You'll see one diagram for each suffix of that
                    note (e.g. C major, C minor, etc.). Note pages also have a
                    list of suffixes on the left that link to Suffix Pages
                  </p>
                </div>
                <div className="htu-minor">
                  <h3>Suffix Pages</h3>
                  <div className="htu-card">
                    <div className="example-suffix">
                      {exSuffixes.map((suf) => (
                        <button
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
                    Suffix pages (e.g. C Major) show all chord variations for
                    that note and suffix. Use the sidebar on the left to
                    navigate to other suffixes of the current note.
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
                      version={1}
                      diagramSize={exampleSize}
                      diagramSpeed={exampleSpeed}
                      example={true}
                    />
                  </div>
                  <p>
                    Every chord diagram has a play button to hear the chord. You
                    can also click any finger dot or "O" for open strings to
                    hear individual notes. Use the speed control (top-right) to
                    slow down or speed up chord playback.
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
                        onChange={(val) =>
                          setExampleSpeed(val as "slow" | "fast")
                        }
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
                        onChange={(val) =>
                          setExampleSize(val as "xs" | "sm" | "md")
                        }
                        data={[
                          { label: "sm", value: "xs" },
                          { label: "md", value: "sm" },
                          { label: "lg", value: "md" },
                        ]}
                      />
                    </div>
                  </div>
                  <p>
                    Use the size toggle (top-left) to switch between small and
                    large chord diagrams based on your preference.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ToolsRow />
        </div>
      </div>
    </ChordLibraryContext.Provider>
  );
}
