import { useState } from "react";

import type { InstrumentFamily, Tuning } from "../../types/types";
import TuningCard from "../ui/tuning-card";
import BackButton from "../../../../components/ui/back-button";
import { Accordion, AccordionItem, LoadingOverlay } from "@mantine/core";
import { MdChevronRight } from "react-icons/md";
import "./tuning-menu.css";

interface TuningMenuProps {
  instruments: InstrumentFamily[];
  currentTuning: Tuning;
  autoMode: boolean;
  setTarget: React.Dispatch<React.SetStateAction<string | null>>;
  setInstrumentFamilyIndex: React.Dispatch<React.SetStateAction<number>>;
  setInstrumentIndex: React.Dispatch<React.SetStateAction<number>>;
  setTuning: React.Dispatch<React.SetStateAction<Tuning>>;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  loadInstrument: (instrumentName: string) => Promise<void>;
  soundfontName: string;
}

export default function TuningMenu({
  instruments,
  currentTuning,
  autoMode,
  setTarget,
  setInstrumentFamilyIndex,
  setInstrumentIndex,
  setTuning,
  setShowMenu,
  loadInstrument,
}: TuningMenuProps) {
  const [showSecondMenu, setShowSecondMenu] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  async function changeInstrument(
    display: number,
    instrument: number,
    tuning: Tuning,
    newSoundFontName: string
  ) {
    if (!autoMode) {
      setTarget(tuning.notes[0]); // Set target to the first note of the tuning
    }
    setInstrumentFamilyIndex(display);
    setInstrumentIndex(instrument);
    setTuning(tuning);

    try {
      setLoading(true);
      await loadInstrument(newSoundFontName);
    } catch (e) {
      console.error("Error loading instrument soundfont:", e);
    } finally {
      setLoading(false);
      setShowSecondMenu(false);
      setShowMenu(false);
    }
  }

  return (
    <div className="tuning-menu-wrapper">
      <LoadingOverlay
        visible={loading}
        zIndex={50}
        overlayProps={{
          radius: "lg",
          blur: 3,
          color: "#000",
          backgroundOpacity: 0,
        }}
        loaderProps={{ color: "var(--accent-color)", size: "lg" }}
      />
      {/* First Menu*/}
      <div className="all-instruments-menu">
        <h3>All Instruments</h3>
        {instruments.map((instrument, i) => (
          <div key={instrument.name}>
            <div className="instrument-button-wrapper">
              <button
                className="instrument-button"
                onClick={() => {
                  setDisplayIndex(i);
                  setShowSecondMenu(true);
                }}
              >
                <span className="instrument-button-icon">
                  <MdChevronRight />
                </span>
                <span className="instrument-button-label">
                  {instrument.name}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Second Menu */}
      <div className={`instrument-list ${showSecondMenu ? "visible" : ""}`}>
        <div className="instrument-list-header">
          <BackButton setShowMenu={setShowSecondMenu} />
          <h3 className="instrument-list-title">
            {`${instruments[displayIndex].name} Tuning`}
          </h3>
        </div>

        {/* selected instrument family */}
        <div className="instrument-list-content">
          {instruments[displayIndex].instruments.map((instrument, i) => (
            <div key={instrument.name}>
              <h3>{instrument.name}</h3>
              {/* standard tuning */}
              <div
                className={`tuning-card-wrapper ${
                  currentTuning === instrument.standard ? "active" : ""
                }`}
              >
                <TuningCard
                  instrumentName={instrument.name}
                  tuning={instrument.standard}
                  soundfontName={instrument.soundfontName}
                  currentTuning={currentTuning}
                  displayIndex={displayIndex}
                  instrumentIndex={i}
                  changeInstrument={changeInstrument}
                />
              </div>

              {/* instrument categories */}
              {instrument.categories.map((category) => (
                <div key={category.name}>
                  <Accordion
                    classNames={{
                      control: "accordion",
                      content: "accordion-content",
                      item: "accordion-item",
                    }}
                  >
                    <AccordionItem key={category.name} value={category.name}>
                      <Accordion.Control>{category.name}</Accordion.Control>
                      <Accordion.Panel>
                        {/* category tunings */}
                        {category.tunings.map((tuning) => (
                          <div key={tuning.name}>
                            <div
                              className={`tuning-card-wrapper ${
                                currentTuning === tuning ? "active" : ""
                              }`}
                            >
                              <TuningCard
                                instrumentName={instrument.name}
                                tuning={tuning}
                                soundfontName={instrument.soundfontName}
                                currentTuning={currentTuning}
                                displayIndex={displayIndex}
                                instrumentIndex={i}
                                changeInstrument={changeInstrument}
                              />
                            </div>
                          </div>
                        ))}
                      </Accordion.Panel>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
