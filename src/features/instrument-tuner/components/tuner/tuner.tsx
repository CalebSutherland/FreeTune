import { useState, useEffect, useRef } from "react";

import data from "../../data/tuning-data.json";
import { useTuner } from "@/hooks/useTuner";
import type { InstrumentFamily } from "../../types/types";
import { getClosestNote } from "../../utils/noteUtils";
import TuningMenu from "./tuning-menu";
import NotesDisplay from "./notes-display";
import TunerStats from "./tuner-stats";
import { Button, Switch } from "@mantine/core";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./tuner.css";

const instruments = data as InstrumentFamily[];

export default function InstrumentTuner() {
  const [instrumentFamilyIndex, setInstrumentFamilyIndex] = useState(0);
  const [instrumentIndex, setInstrumentIndex] = useState(0);
  const current_instrument =
    instruments[instrumentFamilyIndex].instruments[instrumentIndex];

  const [tuning, setTuning] = useState(current_instrument.standard);
  const [targetNote, setTargetNote] = useState<string | null>(null);
  const [autoMode, setAutoMode] = useState(true);

  const [showMenu, setShowMenu] = useState(false);

  const [displayPitch, setDisplayPitch] = useState<number | null>(null);
  const disappearanceTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const { pitch, clarity, isListening, start, stop } = useTuner();

  useEffect(() => {
    if (pitch && clarity > 0.95) {
      if (disappearanceTimeout.current) {
        clearTimeout(disappearanceTimeout.current);
        disappearanceTimeout.current = null;
      }
      setDisplayPitch(pitch);
    } else {
      if (!disappearanceTimeout.current) {
        disappearanceTimeout.current = setTimeout(() => {
          setDisplayPitch(null);
          if (autoMode) {
            setTargetNote(null);
          }
          disappearanceTimeout.current = null;
        }, 500);
      }
    }
  }, [pitch, clarity]);

  useEffect(() => {
    if (autoMode && pitch && clarity > 0.95) {
      const closestNote = getClosestNote(pitch, tuning.notes);
      if (closestNote !== targetNote) {
        setTargetNote(closestNote);
      }
    }
  }, [pitch, clarity, autoMode, tuning.notes, targetNote]);

  return (
    <div className="tuner-app-wrapper">
      {/* Tuner View */}
      <div className="tuner-view">
        <div className="tuner-app-header">
          <Button
            variant="transparent"
            rightSection={<FaChevronRight />}
            classNames={{
              inner: "tunings-button",
              label: "tunings-button-label",
            }}
            onClick={() => setShowMenu(true)}
          >
            <p>{current_instrument.name}</p>
            <p className="tuning-name">{tuning.name}</p>
          </Button>
          <div className="auto-switch">
            <p>AUTO</p>
            <Switch
              checked={autoMode}
              onChange={(event) => {
                const isAuto = event.currentTarget.checked;
                setAutoMode(isAuto);
                if (!isAuto && tuning.notes.length > 0) {
                  setTargetNote(tuning.notes[0]);
                }
                if (isAuto) {
                  setTargetNote(null);
                }
              }}
              color="teal"
              withThumbIndicator={false}
              size="md"
            />
          </div>
        </div>

        <div className="tuner-app-content">
          <div className="visual-wrapper">
            <div>
              <button onClick={isListening ? stop : start}>
                {isListening ? "Stop Tuner" : "Start Tuner"}
              </button>
            </div>
          </div>

          <div className="notes-display-wrapper">
            <NotesDisplay
              instrument={current_instrument}
              tuning={tuning}
              target={targetNote}
              setTarget={setTargetNote}
              autoMode={autoMode}
              setAutoMode={setAutoMode}
            />
          </div>
          <div className="tuner-stats-wrapper">
            <TunerStats
              pitch={displayPitch}
              clarity={clarity}
              isListening={isListening}
              target={targetNote}
            />
          </div>
        </div>
      </div>

      {/* Menu View */}
      <div className={`tuning-menu-view ${showMenu ? "visible" : ""}`}>
        <div className="tuning-menu-header">
          <Button
            variant="transparent"
            leftSection={<FaChevronLeft />}
            classNames={{
              inner: "tunings-button",
            }}
            onClick={() => setShowMenu(false)}
          >
            Back
          </Button>
          <h3 className="tuning-menu-title">Select Tuning</h3>
        </div>
        <TuningMenu
          instruments={instruments}
          currentTuning={tuning}
          setInstrumentFamilyIndex={setInstrumentFamilyIndex}
          setInstrumentIndex={setInstrumentIndex}
          setTuning={setTuning}
          setShowMenu={setShowMenu}
          autoMode={autoMode}
          setTarget={setTargetNote}
        />
      </div>
    </div>
  );
}
