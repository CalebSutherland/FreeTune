import { useState, useEffect, useRef } from "react";

import { useUserSettings } from "@/contexts/user-settings-context";
import { useTuner } from "@/hooks/use-tuner";
import { useNotePlayer } from "@/hooks/use-note-player";
import data from "../../data/tuning-data.json";
import type { InstrumentFamily } from "../../types/types";
import {
  calculateCentsDifference,
  calculateFrequencyDifference,
  getClosestNote,
  getFrequencyFromNote,
} from "@/utils/tuner-utils";
import { useMediaQuery } from "@mantine/hooks";
import TuningMenu from "./tuning-menu";
import NotesDisplay from "./notes-display";
import TunerStats from "@/components/tuner/tuner-stats";
import Visual from "@/components/tuner/visuals/visual";
import SettingsMenu from "@/components/tuner/settings-menu";
import BackButton from "@/components/ui/back-button";
import VisualSelector from "@/components/tuner/visual-selector";
import { Button, Switch, ActionIcon, Overlay, Loader } from "@mantine/core";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import "./tuner.css";

const instruments = data as InstrumentFamily[];

export default function InstrumentTuner() {
  const { instrumentSettings } = useUserSettings();

  const [showMenu, setShowMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [loadingTuner, setLoadingTuner] = useState(false);

  const current_instrument =
    instruments[instrumentSettings.instrumentFamilyIndex].instruments[
      instrumentSettings.instrumentIndex
    ];
  const soundfontName = current_instrument.soundfontName;
  const [targetNote, setTargetNote] = useState<string | null>(null);
  const [displayPitch, setDisplayPitch] = useState<number | null>(null);
  const disappearanceTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const { pitch, clarity, isListening, start } = useTuner();
  const { playNote, loadInstrument } = useNotePlayer();

  const targetFreq = getFrequencyFromNote(targetNote);
  const freqDifference = targetFreq
    ? calculateFrequencyDifference(displayPitch, targetFreq)
    : null;
  const centsDifference = targetFreq
    ? calculateCentsDifference(displayPitch, targetFreq)
    : null;

  const isSmallScreen = useMediaQuery("(max-width: 450px)");

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
      const closestNote = getClosestNote(pitch, instrumentSettings.tuningNotes);
      if (closestNote !== targetNote) {
        setTargetNote(closestNote);
      }
    }
  }, [pitch, clarity, autoMode, instrumentSettings.tuningNotes, targetNote]);

  return (
    <div className="tuner-app-wrapper">
      {showOverlay && (
        <Overlay
          blur={1}
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
            <p className="tuning-name">{instrumentSettings.tuningName}</p>
          </Button>

          {!isSmallScreen && (
            <div className="visual-buttons">
              <VisualSelector />
            </div>
          )}

          <div className="auto-switch">
            <p>AUTO</p>
            <Switch
              checked={autoMode}
              onChange={(event) => {
                const isAuto = event.currentTarget.checked;
                setAutoMode(isAuto);
                if (!isAuto && instrumentSettings.tuningNotes.length > 0) {
                  setTargetNote(instrumentSettings.tuningNotes[0]);
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
              freqDifference={freqDifference}
              centsDifference={centsDifference}
            />
          </div>

          <div className="notes-display-wrapper">
            <NotesDisplay
              instrument={current_instrument}
              imgUrl={current_instrument.img}
              tuning={{
                name: instrumentSettings.tuningName,
                notes: instrumentSettings.tuningNotes,
              }}
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
          <div className="footer-controls">
            <Button
              variant="transparent"
              color="var(--text-color)"
              rightSection={
                <FaChevronDown
                  size={11}
                  className={showStats ? "chevron rotated" : "chevron"}
                />
              }
              onClick={() => setShowStats(!showStats)}
            >
              Stats
            </Button>

            {isSmallScreen && (
              <div className="visual-buttons">
                <VisualSelector />
              </div>
            )}

            <ActionIcon
              variant="transparent"
              color="var(--text-color)"
              mr={16}
              onClick={() => setShowSettingsMenu(true)}
            >
              <FaGear size={20} />
            </ActionIcon>
          </div>

          <div className={`stats-dropdown ${showStats ? "visible" : ""}`}>
            <TunerStats
              pitch={displayPitch}
              clarity={clarity}
              isListening={isListening}
              target={targetNote}
              freqDifference={freqDifference}
              centsDifference={centsDifference}
            />
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
          currentTuning={{
            name: instrumentSettings.tuningName,
            notes: instrumentSettings.tuningNotes,
          }}
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
        {showSettingsMenu && (
          <SettingsMenu setShowSettingsMenu={setShowSettingsMenu} />
        )}
      </div>
    </div>
  );
}
