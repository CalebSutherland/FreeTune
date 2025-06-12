import { useState } from "react";

import data from "../../data/tuning-data.json";
import { useTuner } from "@/hooks/useTuner";
import type { InstrumentFamily } from "../../types/types";
import TuningMenu from "./tuning-menu";
import NotesDisplay from "./notes-display";
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
  const [showMenu, setShowMenu] = useState(false);

  const { pitch, clarity, isListening, start, stop } = useTuner();

  const getNoteName = (frequency: number | null) => {
    if (!frequency) return "No note detected";

    const noteStrings = [
      "C",
      "C♯",
      "D",
      "D♯",
      "E",
      "F",
      "F♯",
      "G",
      "G♯",
      "A",
      "A♯",
      "B",
    ];
    const noteNumber = 12 * (Math.log(frequency / 440) / Math.log(2));
    const roundedNote = Math.round(noteNumber) + 69;
    const noteIndex = roundedNote % 12;
    const octave = Math.floor(roundedNote / 12) - 1;

    return `${noteStrings[noteIndex]}${octave}`;
  };

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
              defaultChecked
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
              <div>
                <h2>Note: {getNoteName(pitch)}</h2>
                <h3>Frequency: {pitch ? pitch.toFixed(2) + " Hz" : "N/A"}</h3>
                <h3>Clarity: {clarity.toFixed(2)}</h3>
              </div>
            </div>
          </div>
          <div className="notes-display-wrapper">
            <NotesDisplay instrument={current_instrument} tuning={tuning} />
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
        />
      </div>
    </div>
  );
}
