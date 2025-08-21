import { useLayoutEffect } from "react";

import {
  useLocation,
  useNavigationType,
  useParams,
  NavLink,
} from "react-router-dom";
import { paths } from "@/config/paths";
import db from "@tombatossals/chords-db/lib/guitar.json";
import type { Key } from "@/types/chord-types";
import { formatKeyName } from "@/utils/chord-utils";
import ToolsRow from "../ui/tools-row";
import ChordInstructions from "../instructions/chord-instructions";
import { useUserSettings } from "@/contexts/user-settings-context";
import { SegmentedControl } from "@mantine/core";
import { LuRabbit, LuTurtle } from "react-icons/lu";
import "./chord-library-layout.css";

export function ChordLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chordSettings, updateChordSettings } = useUserSettings();

  const keys = Object.keys(db.chords) as Key[];
  const params = useParams();
  const routeKey = params.key as Key | undefined;
  const chordList = routeKey ? db.chords[routeKey] : undefined;
  const suffixes = chordList
    ? Array.from(new Set(chordList.map((chord) => chord.suffix)))
    : [];

  const location = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "PUSH") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
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
                value={chordSettings.size}
                onChange={(val) =>
                  updateChordSettings({ size: val as "xs" | "sm" | "md" })
                }
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
                value={chordSettings.speed}
                onChange={(val) =>
                  updateChordSettings({ speed: val as "slow" | "fast" })
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
          <div className="diagrams-wrapper">{children}</div>
        </div>
      </div>

      <div className="chord-lib-lower">
        <div className="chord-lib-instructions">
          <h2>How to Use</h2>
          <ChordInstructions />
        </div>

        <div className="chord-lib-lower-content">
          <ToolsRow />
        </div>
      </div>
    </div>
  );
}
