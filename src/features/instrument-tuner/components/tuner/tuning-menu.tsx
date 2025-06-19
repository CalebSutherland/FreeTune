import { useState } from "react";

import type { InstrumentFamily, Tuning } from "../../types/types";
import TuningCard from "../ui/tuning-card";
import BackButton from "../ui/back-button";
import { Accordion, AccordionItem } from "@mantine/core";
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
}: TuningMenuProps) {
  const [showSecondMenu, setShowSecondMenu] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);

  function changeInstrument(
    display: number,
    instrument: number,
    tuning: Tuning
  ) {
    if (!autoMode) {
      setTarget(tuning.notes[0]); // Set target to the first note of the tuning
    }
    setInstrumentFamilyIndex(display);
    setInstrumentIndex(instrument);
    setTuning(tuning);
    setShowSecondMenu(false);
    setShowMenu(false);
  }

  return (
    <div className="tuning-menu-wrapper">
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
