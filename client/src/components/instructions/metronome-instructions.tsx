import { useState } from "react";

import { TableOfContents, Button, ActionIcon, Slider } from "@mantine/core";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { TbHandClick } from "react-icons/tb";

export default function MetronomeInstructions() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
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
            selector: "#metronome :is(h1, h2, h3)",
          }}
          getControlProps={({ data }) => ({
            onClick: () => data.getNode().scrollIntoView(),
            children: data.value,
          })}
        />
      </div>
      <div className="htu-content" id="metronome">
        <div className="htu-main">
          <h2>Metronome Instructions</h2>
          <div className="htu-minor">
            <h3>Start/Stop</h3>
            <div className="htu-card">
              <Button
                color="var(--accent-color)"
                onClick={() => setIsPlaying((prev) => !prev)}
              >
                {isPlaying ? "Stop" : "Start"}
              </Button>
            </div>
            <p>
              Click the Start button on the bottom to start and stop the
              metronome.
            </p>
          </div>
          <div className="htu-minor">
            <h3>Time Signature</h3>
            <div className="htu-card">
              <div className="ts-menu-button-wrapper" style={{ margin: 0 }}>
                <p>TIME SIGNATURE</p>
                <Button
                  color="var(--text-color)"
                  variant="transparent"
                  classNames={{ root: "ts-menu-button" }}
                >
                  4/4
                </Button>
              </div>
            </div>
            <p>
              The time signature controls how many beats are in each measure and
              what type of note gets the beat. The top number is the number of
              beats per measure, and the bottom number is the type of note (e.g.
              4 = quarter note, 8 = eighth note). You can change the time
              signature by clicking the Time Signature button.
            </p>
          </div>
          <div className="htu-minor">
            <h3>Tap Tempo</h3>
            <div className="htu-card">
              <Button
                variant="transparent"
                color="var(--text-color)"
                classNames={{ root: "tap-button" }}
                style={{ margin: 0 }}
              >
                <TbHandClick size={24} />
              </Button>
            </div>
            <p>
              Click the Tap Tempo button to set the BPM by tapping the button at
              the desired tempo. The metronome will adjust to the average tempo
              of your taps.
            </p>
          </div>
          <div className="htu-minor">
            <h3>Beats Per Minute</h3>
            <div
              className="htu-card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "15rem",
              }}
            >
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
                <p>BPM</p>
              </div>
              <Slider
                classNames={{ root: "bpm-slider", track: "bpm-slider-track" }}
                style={{ width: "100%", margin: 0 }}
                color="var(--accent-color)"
                min={30}
                max={240}
                value={bpm}
                onChange={setBpm}
              />
            </div>
            <p>
              Use the Beats Per Minute (BPM) controls to change the tempo of the
              metronome. You can use the slider for quick adjustments and the
              plus and minus buttons for fine-tuning.
            </p>
          </div>
          <div className="htu-minor">
            <h3>Sounds</h3>
            <div
              className="htu-card"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActionIcon variant="transparent" color="var(--text-color)">
                <FaGear size={24} />
              </ActionIcon>
            </div>
            <p>
              Click the settings button on the bottom-left to open up the sounds
              menu. All metronome sounds have an accent on the first beat of the
              measure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
