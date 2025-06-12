import { useState } from "react";

import type { InstrumentFamily, Tuning } from "../../types/types";
import { Button, Accordion, AccordionItem } from "@mantine/core";
import { MdChevronRight } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa6";
import "./tuning-menu.css";
import TuningCard from "../ui/tuning-card";

interface TuningMenuProps {
  instruments: InstrumentFamily[];
  currentTuning: Tuning;
  setInstrumentFamilyIndex: React.Dispatch<React.SetStateAction<number>>;
  setInstrumentIndex: React.Dispatch<React.SetStateAction<number>>;
  setTuning: React.Dispatch<React.SetStateAction<Tuning>>;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TuningMenu({
  instruments,
  currentTuning,
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
          <Button
            variant="transparent"
            leftSection={<FaChevronLeft />}
            classNames={{
              inner: "tunings-button",
            }}
            onClick={() => setShowSecondMenu(false)}
          >
            Back
          </Button>
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
