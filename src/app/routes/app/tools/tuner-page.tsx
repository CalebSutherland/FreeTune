import InstrumentTuner from "@/features/instrument-tuner/components/tuner/tuner";
import ToolsRow from "@/components/ui/tools-row";
import { ActionIcon, Button, Switch, TableOfContents } from "@mantine/core";
import "./tuner-page.css";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";
import { useState } from "react";
import VisualSelector from "@/components/tuner/visual-selector";
import TuningCard from "@/features/instrument-tuner/components/ui/tuning-card";
import { FaGear } from "react-icons/fa6";

export default function TunerPage() {
  const [vis, setVis] = useState("graph");
  const [auto, setAuto] = useState(true);
  const [active, setActive] = useState("E2");
  const [stats, setStats] = useState(false);

  const exampleButtons = ["E2", "A2", "D3"];
  return (
    <div className="tuner-page-wrapper">
      <title>Tuner | FreeTune</title>
      <InstrumentTuner />
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
              selector: "#tuner :is(h1, h2, h3)",
            }}
            getControlProps={({ data }) => ({
              onClick: () => data.getNode().scrollIntoView(),
              children: data.value,
            })}
          />
        </div>
        <div className="htu-content" id="tuner">
          <div className="htu-main">
            <h2>Tuner Instructions</h2>
            <div className="htu-minor">
              <h3>Start Tuner</h3>
              <div className="htu-card">
                <Button variant="filled" size="md" color="var(--accent-color)">
                  Start Tuning
                </Button>
              </div>
              <p>
                When you first open the tuner, you'll see a{" "}
                <strong>Start Tuning</strong> button. Click it to allow
                microphone access and load instrument sounds for note playback.
              </p>
            </div>
            <div className="htu-minor">
              <h3>Select Tuning</h3>
              <div className="htu-card">
                <Button
                  variant="transparent"
                  rightSection={<FaChevronRight />}
                  classNames={{
                    inner: "tunings-button",
                    label: "tunings-button-label",
                  }}
                >
                  <p>Guitar 6-string</p>
                  <p className="tuning-name">Standard</p>
                </Button>
              </div>
              <p>
                Click the instrument button at the top-left to open the{" "}
                <strong>Tuning Menu</strong>. Choose an instrument family (like
                Guitar or Bass), then select an instrument and tuning (e.g.,
                Standard or Drop D).
              </p>
              <div
                className="htu-card"
                style={{ width: "100%", maxWidth: "30rem" }}
              >
                <div className="instrument-button-wrapper">
                  <button className="instrument-button">
                    <span className="instrument-button-icon">
                      <MdChevronRight />
                    </span>
                    <span className="instrument-button-label">Guitar</span>
                  </button>
                </div>
              </div>
              <p>
                The tuner uses this selection to decide which notes to detect
                and display.
              </p>
              <div
                className="htu-card"
                style={{ width: "100%", maxWidth: "30rem" }}
              >
                <TuningCard
                  instrumentName="Guitar"
                  tuning={{
                    name: "Standard",
                    notes: ["E2", "A2", "D3", "G3", "B3", "E4"],
                  }}
                  soundfontName=""
                  currentTuning={{ name: "", notes: [] }}
                  displayIndex={0}
                  instrumentIndex={0}
                  changeInstrument={() => {}}
                />
              </div>
            </div>
            <div className="htu-minor">
              <h3>Choose Display</h3>
              <div className="htu-card">
                <VisualSelector visual={vis} setVisual={setVis} />
              </div>
              <p>
                Use the display selector to switch between visualizations. This
                changes how tuning accuracy is represented on screen. All
                visuals show how far away the detected frequency is from the
                target frequency.
              </p>
            </div>
            <div className="htu-minor">
              <h3>Auto Mode</h3>
              <div className="htu-card">
                <div className="auto-switch">
                  <p>AUTO</p>
                  <Switch
                    checked={auto}
                    onChange={(event) => {
                      const isAuto = event.currentTarget.checked;
                      setAuto(isAuto);
                    }}
                    color="teal"
                    withThumbIndicator={false}
                    size="md"
                  />
                </div>
              </div>
              <p>
                Use the <strong>Auto</strong> switch to toggle auto mode. When
                auto mode is on the tuner automatically detects the closest note
                in the current tuning. When auto mode is off you manually select
                a target note using the <strong>Note Buttons.</strong>
              </p>
            </div>
            <div className="htu-minor">
              <h3>Note Buttons</h3>
              <div className="htu-card">
                <div className="example-buttons">
                  {exampleButtons.map((note) => (
                    <button
                      key={note}
                      className={`note-button ${
                        active === note ? "active" : ""
                      }`}
                      onClick={() => setActive(note)}
                    >
                      {note[0]}
                    </button>
                  ))}
                </div>
              </div>
              <p>
                Click a note button to switch off Auto Mode and manually set the
                target note. When you click a note, the tuner will also play a
                reference sound using the currently selected instrument, helping
                you match the pitch by ear.
              </p>
            </div>
            <div className="htu-minor">
              <h3>Tuner Stats</h3>
              <div className="htu-card">
                <Button
                  variant="transparent"
                  color="var(--text-color)"
                  rightSection={
                    <FaChevronDown
                      size={11}
                      className={stats ? "chevron rotated" : "chevron"}
                    />
                  }
                  onClick={() => setStats(!stats)}
                >
                  Stats
                </Button>
              </div>
              <p>
                Click the <strong>Stats</strong> button in the bottom-left
                corner to view detailed info about the current pitch:
              </p>
              <h4>
                <p>Frequency:</p>
              </h4>
              <p>
                The detected frequency of the input sound, shown in hertz (Hz).
                This updates in real time as you play a note.
              </p>
              <h4>
                <p>Target Frequency:</p>
              </h4>
              <p>The frequency for the current target note.</p>
              <h4>
                <p>Note:</p>
              </h4>
              <p>
                The musical note closest to the detected pitch (e.g., A4, G#3).
              </p>
              <h4>
                <p>Target Note:</p>
              </h4>
              <p>
                The note the tuner is currently aiming for. In Auto Mode, it's
                detected automatically, otherwise you can set it manually using
                the <strong>Note Buttons.</strong>
              </p>
              <h4>
                <p>Difference (freq):</p>
              </h4>
              <p>
                How far your detected pitch is from the target note, measured in
                Hz. A smaller difference means you're closer to being in tune.
              </p>
              <h4>
                <p>Difference (cents):</p>
              </h4>
              <p>
                The pitch difference expressed in cents, where 100 cents = 1
                semitone. This is useful for precise tuning.
              </p>
              <h4>
                <p>Clarity:</p>
              </h4>
              <p>
                A confidence score from 0 to 1 indicating how clearly the tuner
                hears a pitch. Values near 1 mean the pitch is stable and easy
                to detect.
              </p>
              <h4>
                <p>Status:</p>
              </h4>
              <p>
                Whether the tuner is actively listening for sound. If it says
                "Not Listening", check your microphone or try refreshing the
                page.
              </p>
            </div>
            <div className="htu-minor">
              <h3>Settings</h3>
              <div className="htu-card">
                <ActionIcon variant="transparent" color="var(--text-color)">
                  <FaGear size={20} />
                </ActionIcon>
              </div>
              <p>
                You can customize how the tuner behaves by clicking the gear
                icon at the bottom right of the tuner. This opens the Settings
                Menu, where you can fine-tune sensitivity and pitch detection
                behavior.
              </p>
              <h4>WARNING</h4>
              <p>
                These options are intended for advanced users who need more
                control over tuning sensitivity and pitch detection. If anything
                breaks or behaves unexpectedly, you can click “Reset to Default”
                to restore all settings.
              </p>
              <h4>Min Volume (dB):</h4>
              <p>
                The minimum input volume the tuner must hear before it attempts
                to detect a pitch. Lower (more negative) values make the tuner
                more sensitive to quiet sounds.
              </p>
              <h4>Clarity Threshold (%):</h4>
              <p>
                The confidence level required to accept a pitch as valid. A
                higher value means the tuner will ignore noisy or unstable
                input. Range: 1-100%
              </p>
              <h4>Min Pitch (Hz):</h4>
              <p>
                The lowest frequency the tuner will attempt to detect. Useful
                for ignoring unwanted low-end noise or restricting detection to
                a specific range.
              </p>
              <h4>Max Pitch (Hz):</h4>
              <p>
                The highest frequency the tuner will attempt to detect. Helps
                narrow detection to realistic instrument ranges.
              </p>
              <h4>Buffer Size:</h4>
              <p>
                The size of the audio buffer used when analyzing input. Must be
                a power of 2 between 32 and 32768. Smaller buffers = faster
                response, but possibly less accurate. Larger buffers = smoother
                readings, but slower response.
              </p>
            </div>
          </div>

          <div className="htu-main">
            <h2>How to Tune a Guitar</h2>
            <div className="htu-minor">
              <h3>Setup</h3>
              <p>
                Start the tuner and choose your preferred tuning preset. With
                Auto Mode enabled, the tuner will automatically detect and track
                the closest note you're playing. If you prefer manual control,
                simply click a note button to select a specific target note
                yourself.
              </p>
            </div>
            <div className="htu-minor">
              <h3>Tuning</h3>
              <p style={{ marginBottom: "0.5rem" }}>
                To begin tuning, play any open string on your guitar (it's
                usually best to start with the lowest string). The tuner will
                detect the pitch and show how close you are to the target note.
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                If the visual is to the left of center the note is flat. Turn
                the tuning peg of the corresponding string clockwise until the
                string is in tune. Likewise, if the visual is to the right, the
                note is sharp and the tuning peg needs to be turned
                counter-clockwise.
              </p>
              <p>
                Once a string is in tune, the corresponding note button will
                have a green outline around it. Repeat with each string until
                all strings are in tune.
              </p>
            </div>
            <div className="htu-minor">
              <h3>Tips</h3>
              <ul>
                <li>
                  For best results, tune in a quiet enviroment with minimal
                  background noise.
                </li>
                <li>
                  Instead of letting the string ring out, pluck it gently and
                  consistently while tuning.
                </li>
                <li>
                  Turn the tuning pegs slowly and make small adjustments to
                  avoid overshooting the pitch.
                </li>
                <li>
                  If your guitar was significantly out of tune, you may need to
                  recheck the lower strings after tuning the others, as string
                  tension can shift.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ToolsRow />
    </div>
  );
}
