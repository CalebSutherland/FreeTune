import { useState, useEffect, useRef } from "react";

import data from "../../data/tuning-data.json";
import { useTuner } from "@/hooks/useTuner";
import { useNotePlayer } from "../../hooks/useNotePlayer";
import type { InstrumentFamily } from "../../types/types";
import {
  getClosestNote,
  getFrequencyFromNote,
  calculateCentsDifference,
  calculateFrequencyDifference,
} from "../../utils/noteUtils";
import TuningMenu from "./tuning-menu";
import NotesDisplay from "./notes-display";
import TunerStats from "./tuner-stats";
import Visual from "./visual";
import BackButton from "../ui/back-button";
import { Button, Switch, ActionIcon } from "@mantine/core";
import { FaChevronRight } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdOutlineShowChart } from "react-icons/md";
import { PiGauge } from "react-icons/pi";
import "./tuner.css";

const instruments = data as InstrumentFamily[];

export default function InstrumentTuner() {
  const [showMenu, setShowMenu] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [instrumentFamilyIndex, setInstrumentFamilyIndex] = useState(0);
  const [instrumentIndex, setInstrumentIndex] = useState(0);
  const current_instrument =
    instruments[instrumentFamilyIndex].instruments[instrumentIndex];
  const soundfontName = current_instrument.soundfontName;
  const [tuning, setTuning] = useState(current_instrument.standard);
  const [targetNote, setTargetNote] = useState<string | null>(null);
  const [displayPitch, setDisplayPitch] = useState<number | null>(null);
  const disappearanceTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const { pitch, clarity, isListening, start, stop } = useTuner();
  const { playNote } = useNotePlayer();

  const [visual, setVisual] = useState("graph");
  const visuals = [
    { name: "graph", icon: <MdOutlineShowChart size={20} /> },
    { name: "dial", icon: <PiGauge size={20} /> },
    { name: "3", icon: <FaGear size={20} /> },
  ];

  const targetFreq = getFrequencyFromNote(targetNote);
  const freqDifference = targetFreq
    ? calculateFrequencyDifference(displayPitch, targetFreq)
    : null;
  const centsDifference = targetFreq
    ? calculateCentsDifference(displayPitch, targetFreq)
    : null;

  useEffect(() => {
    if (disappearanceTimeout.current) {
      clearTimeout(disappearanceTimeout.current);
      disappearanceTimeout.current = null;
    }
  }, [autoMode]);

  // Delay showing that there is no sound detected to avoid flickering
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
  }, [pitch, clarity, autoMode]);

  // Update target note based on pitch and tuning if auto mode is on
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

          <div className="visual-buttons">
            <ActionIcon.Group>
              {visuals.map((vis) => (
                <ActionIcon
                  key={vis.name}
                  className={`visual-icon ${
                    visual === vis.name ? "active" : ""
                  }`}
                  variant="outline"
                  size="md"
                  onClick={() => setVisual(vis.name)}
                >
                  {vis.icon}
                </ActionIcon>
              ))}
            </ActionIcon.Group>
          </div>

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
            <Visual
              visual={visual}
              freqDifference={freqDifference}
              centsDifference={centsDifference}
            />
          </div>

          <div className="notes-display-wrapper">
            <NotesDisplay
              instrument={current_instrument}
              tuning={tuning}
              target={targetNote}
              setTarget={setTargetNote}
              autoMode={autoMode}
              setAutoMode={setAutoMode}
              freqDifference={freqDifference}
              playNote={playNote}
              soundfontName={soundfontName}
            />
          </div>
        </div>

        <div className="tuner-app-footer">
          <div className="tuner-stats-wrapper">
            <TunerStats
              pitch={displayPitch}
              clarity={clarity}
              isListening={isListening}
              target={targetNote}
              freqDifference={freqDifference}
              centsDifference={centsDifference}
            />
          </div>

          <div className="start-tuner-wrapper">
            <Button
              variant="filled"
              size="sm"
              color={isListening ? "red" : "teal"}
              onClick={isListening ? stop : start}
            >
              {isListening ? "Stop Tuner" : "Start Tuner"}
            </Button>
          </div>

          <div className="settings-wrapper">
            <button className="settings-button">
              <FaGear size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu View */}
      <div className={`tuning-menu-view ${showMenu ? "visible" : ""}`}>
        <div className="tuning-menu-header">
          <BackButton setShowMenu={setShowMenu} />
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
