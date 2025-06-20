import { useState, useEffect, useRef } from "react";

import { useTuner } from "@/hooks/use-tuner";
import { useNotePlayer } from "@/hooks/useNotePlayer";
import type { TunerSettings } from "@/types/tuner-types";
import { defaultSettings } from "@/utils/tuner-defaults";
import data from "../../data/tuning-data.json";
import type { InstrumentFamily } from "../../types/types";
import {
  getClosestNote,
  getFrequencyFromNote,
  calculateCentsDifference,
  calculateFrequencyDifference,
} from "../../utils/note-utils";

import TuningMenu from "./tuning-menu";
import NotesDisplay from "./notes-display";
import TunerStats from "./tuner-stats";
import Visual from "./visual";
import SettingsMenu from "./settings-menu";
import BackButton from "../ui/back-button";
import { Button, Switch, ActionIcon, Overlay, Loader } from "@mantine/core";
import { FaChevronRight } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdOutlineShowChart } from "react-icons/md";
import { PiGauge } from "react-icons/pi";
import "./tuner.css";

const instruments = data as InstrumentFamily[];
export default function InstrumentTuner() {
  const [showMenu, setShowMenu] = useState(false);
  const [settings, setSettings] = useState<TunerSettings>(defaultSettings);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [loadingTuner, setLoadingTuner] = useState(false);

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

  const { pitch, clarity, isListening, start } = useTuner(settings);
  const { playNote, loadInstrument } = useNotePlayer();

  const targetFreq = getFrequencyFromNote(targetNote);
  const freqDifference = targetFreq
    ? calculateFrequencyDifference(displayPitch, targetFreq)
    : null;
  const centsDifference = targetFreq
    ? calculateCentsDifference(displayPitch, targetFreq)
    : null;

  const [visual, setVisual] = useState("graph");
  const visuals = [
    { name: "graph", icon: <MdOutlineShowChart size={20} /> },
    { name: "dial", icon: <PiGauge size={20} /> },
    { name: "3", icon: <FaGear size={20} /> },
  ];

  async function startTuner() {
    try {
      setLoadingTuner(true);
      await loadInstrument(soundfontName);
      start();
      setShowOverlay(false);
    } catch (e) {
      console.error("Error starting tuner:", e);
    } finally {
      setLoadingTuner(false);
    }
  }

  const handleSettingsChange = (newSettings: TunerSettings) => {
    setSettings(newSettings);
    setShowSettingsMenu(false);
  };

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
      {showOverlay && (
        <Overlay
          blur={3}
          color="#000"
          backgroundOpacity={0}
          zIndex={50}
          center={true}
          children={
            !loadingTuner ? (
              <Button
                variant="filled"
                size="md"
                color="var(--accent-color)"
                onClick={startTuner}
              >
                Start Tuning
              </Button>
            ) : (
              <Loader color="var(--accent-color)" size="lg" />
            )
          }
        />
      )}
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
          <div className="settings-wrapper">
            <button
              className="settings-button"
              onClick={() => setShowSettingsMenu(true)}
            >
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
          loadInstrument={loadInstrument}
          soundfontName={soundfontName}
        />
      </div>

      {/* Settings Menu */}
      <div
        className={`settings-menu-view ${showSettingsMenu ? "visible" : ""}`}
      >
        <div className="tuning-menu-header">
          <BackButton setShowMenu={setShowSettingsMenu} />
          <h3 className="tuning-menu-title">Settings</h3>
        </div>
        <SettingsMenu settings={settings} onSave={handleSettingsChange} />
      </div>
    </div>
  );
}
