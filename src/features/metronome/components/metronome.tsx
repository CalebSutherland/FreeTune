import { useEffect, useRef, useState } from "react";

import { useMetronome } from "../hooks/useMetronome";
import { handleTap } from "../utils/metronome-utils";
import BackButton from "@/components/ui/back-button";
import { ActionIcon, Button, Slider } from "@mantine/core";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";
import "./metronome.css";

export default function Metronome() {
  const tapTimesRef = useRef<number[]>([]);

  const [showMenu, setShowMenu] = useState(false);
  const [settingsMenu, setSettingsMenu] = useState(false);
  const [flashBeat, setFlashBeat] = useState<number | null>(null);

  const [sound, setSound] = useState("click");
  const sounds = [
    { name: "Defualt", url: "click" },
    { name: "Drumstick", url: "drumstick" },
    { name: "Hi-Hat", url: "hi-hat" },
    { name: "Cowbell", url: "cowbell" },
  ];

  const {
    bpm,
    setBpm,
    isPlaying,
    start,
    stop,
    currentBeat,
    beatsPerMeasure,
    setBeatsPerMeasure,
    setCurrentBeat,
    noteValue,
    setNoteValue,
    beatCount,
  } = useMetronome(120, sound);

  useEffect(() => {
    if (!isPlaying) return;

    setFlashBeat(currentBeat);

    const timeout = setTimeout(() => {
      setFlashBeat(null);
    }, 150);

    return () => clearTimeout(timeout);
  }, [beatCount, isPlaying]);

  const timeSigs = [
    "1/4",
    "2/4",
    "3/4",
    "4/4",
    "5/4",
    "7/4",
    "5/8",
    "6/8",
    "7/8",
    "9/8",
    "12/8",
  ];

  return (
    <div className="metronome-wrapper">
      <div className="ts-menu-button-wrapper">
        <p>TIME SIGNATURE</p>
        <Button
          color="var(--text-color)"
          variant="transparent"
          classNames={{ root: "ts-menu-button" }}
          onClick={() => {
            stop();
            setShowMenu(true);
          }}
        >
          {`${beatsPerMeasure}/${noteValue}`}
        </Button>
      </div>
      <div className="beat-dots">
        {Array.from({ length: beatsPerMeasure }).map((_, i) => (
          <div
            key={i}
            className={`beat-dot ${
              isPlaying && flashBeat === i ? "active" : ""
            }`}
          />
        ))}
      </div>
      <Button
        variant="transparent"
        color="var(--text-color)"
        classNames={{ root: "tap-button" }}
        onClick={() => handleTap(tapTimesRef, setBpm)}
      >
        <TbHandClick size={24} />
      </Button>
      <div className="bpm-wrapper">
        <div className="bpm-buttons">
          <ActionIcon
            className="bpm-btn"
            color="var(--text-color)"
            variant="transparent"
            disabled={bpm <= 30}
            onClick={() => {
              setBpm((prev) => prev - 1);
            }}
          >
            <FaMinus size={16} />
          </ActionIcon>
          <p>{bpm}</p>
          <ActionIcon
            className="bpm-btn"
            color="var(--text-color)"
            variant="transparent"
            disabled={bpm >= 240}
            onClick={() => {
              setBpm((prev) => prev + 1);
            }}
          >
            <FaPlus size={16} />
          </ActionIcon>
        </div>
        <p>Beats per min</p>
      </div>
      <Slider
        classNames={{ root: "bpm-slider", track: "bpm-slider-track" }}
        color="var(--accent-color)"
        min={30}
        max={240}
        value={bpm}
        onChange={setBpm}
      />
      <Button
        color="var(--accent-color)"
        onClick={() => {
          isPlaying ? stop() : start();
        }}
      >
        {isPlaying ? "Stop" : "Start"}
      </Button>
      <div className="metronome-settings">
        <ActionIcon
          variant="transparent"
          color="var(--text-color)"
          onClick={() => {
            setSettingsMenu(true);
            stop();
          }}
        >
          <FaGear size={24} />
        </ActionIcon>
      </div>

      <div className={`metronome-menu ${showMenu ? "visible" : ""}`}>
        <div className="metronome-menu-header">
          <BackButton setShowMenu={setShowMenu} />
          <h3 className="metronome-menu-title">Select Time Signature</h3>
        </div>
        <div className="metronome-menu-wrapper">
          {timeSigs.map((sig) => {
            const time = sig.split("/");
            return (
              <div key={sig} className="menu-button-wrapper">
                <button
                  className="menu-button"
                  onClick={() => {
                    setBeatsPerMeasure(parseInt(time[0]));
                    setNoteValue(parseInt(time[1]));
                    setCurrentBeat(0);
                    setShowMenu(false);
                  }}
                >
                  <span className="menu-button-icon">
                    <MdChevronRight />
                  </span>
                  <span className="menu-button-label">{sig}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`metronome-settings-menu ${settingsMenu ? "visible" : ""}`}
      >
        <div className="metronome-menu-header">
          <BackButton setShowMenu={setSettingsMenu} />
          <h3 className="metronome-menu-title">Metronome Settings</h3>
        </div>
        <div className="metronome-menu-wrapper">
          <h3>Sounds</h3>
          {sounds.map((s) => (
            <div key={s.name} className="menu-button-wrapper">
              <button
                className="menu-button"
                onClick={() => {
                  setSound(s.url);
                  setSettingsMenu(false);
                }}
              >
                <span className="menu-button-icon">
                  <MdChevronRight />
                </span>
                <span className="menu-button-label">{s.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
