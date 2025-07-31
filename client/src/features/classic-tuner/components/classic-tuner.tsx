import { useEffect, useRef, useState } from "react";

import { defaultSettings } from "@/utils/tuner-defaults";
import type { TunerSettings } from "@/types/tuner-types";
import { useTuner } from "@/hooks/use-tuner";
import { ActionIcon, Button, Loader, Overlay } from "@mantine/core";
import "./classic-tuner.css";
import VisualSelector from "@/components/tuner/visual-selector";
import Visual from "@/components/tuner/visuals/visual";
import {
  calculateCentsDifference,
  calculateFrequencyDifference,
  generateAllNoteNames,
  getClosestNote,
  getFrequencyFromNote,
} from "@/utils/tuner-utils";
import { FaChevronDown } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import TunerStats from "@/components/tuner/tuner-stats";
import BackButton from "@/components/ui/back-button";
import SettingsMenu from "@/components/tuner/settings-menu";
import Note from "./note";

export default function ClassicTuner() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [loadingTuner, setLoadingTuner] = useState(false);
  const [settings, setSettings] = useState<TunerSettings>(defaultSettings);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [visual, setVisual] = useState("graph");
  const [displayCents, setDisplayCents] = useState(false);

  const [targetNote, setTargetNote] = useState<string | null>(null);
  const [displayPitch, setDisplayPitch] = useState<number | null>(null);
  const disappearanceTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [lastDetectedNote, setLastDetectedNote] = useState<string>("A4");

  const { pitch, clarity, isListening, start } = useTuner(settings);
  const targetFreq = getFrequencyFromNote(targetNote);

  const freqDifference = targetFreq
    ? calculateFrequencyDifference(displayPitch, targetFreq)
    : null;
  const centsDifference = targetFreq
    ? calculateCentsDifference(displayPitch, targetFreq)
    : null;

  const allNotes = generateAllNoteNames();
  const activeNote = targetNote ?? lastDetectedNote;
  const centerIndex = allNotes.indexOf(activeNote);
  const leftNote = centerIndex > 0 ? allNotes[centerIndex - 1] : null;
  const rightNote =
    centerIndex >= 0 && centerIndex < allNotes.length - 1
      ? allNotes[centerIndex + 1]
      : null;

  const handleSettingsChange = (newSettings: TunerSettings) => {
    setSettings(newSettings);
    setShowSettingsMenu(false);
  };

  function startTuner() {
    try {
      setLoadingTuner(true);
      start();
      setShowOverlay(false);
    } catch (e) {
      console.error("Error starting tuner:", e);
    } finally {
      setLoadingTuner(false);
    }
  }

  // Delay showing pitch to avoid flickering
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
          setTargetNote(null);
          disappearanceTimeout.current = null;
        }, 500);
      }
    }
  }, [pitch, clarity]);

  useEffect(() => {
    if (pitch && clarity > 0.95) {
      const closestNote = getClosestNote(pitch);
      if (closestNote !== targetNote) {
        setTargetNote(closestNote);
        setLastDetectedNote(closestNote);
      }
    }
  }, [pitch, clarity, targetNote]);

  return (
    <div className="classic-wrapper">
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
      <div className="classic-tuner">
        <div className="classic-tuner-header">
          <div className="visual-buttons">
            <VisualSelector visual={visual} setVisual={setVisual} />
          </div>
        </div>
        <div className="classic-tuner-content">
          <div className="visual-wrapper">
            <Visual
              visual={visual}
              freqDifference={freqDifference}
              centsDifference={centsDifference}
              displayCents={displayCents}
            />
          </div>
          <div className="note-display">
            <span style={{ opacity: targetNote ? 1 : 0.3 }}>
              <Note note={leftNote} />
            </span>
            <span
              className="center-note"
              style={{ opacity: targetNote ? 1 : 0.3 }}
            >
              <Note note={activeNote} />
            </span>
            <span style={{ opacity: targetNote ? 1 : 0.3 }}>
              <Note note={rightNote} />
            </span>
          </div>
        </div>
        <div className="classic-footer">
          <div className="classic-controls">
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
          <div
            className={`settings-menu-view ${
              showSettingsMenu ? "visible" : ""
            }`}
          >
            <div className="tuning-menu-header">
              <BackButton setShowMenu={setShowSettingsMenu} />
              <h3 className="tuning-menu-title">Settings</h3>
            </div>
            <SettingsMenu
              settings={settings}
              displayCents={displayCents}
              setDisplayCents={setDisplayCents}
              onSave={handleSettingsChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
