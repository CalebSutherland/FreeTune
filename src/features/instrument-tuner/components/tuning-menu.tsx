import { useState } from "react";

import type { InstrumentFamily, Tuning } from "../types/types";
import { Button, Accordion, AccordionItem } from "@mantine/core";
import { MdChevronRight } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa6";
import "./tuning-menu.css";

interface TuningMenuProps {
  instruments: InstrumentFamily[];
  setInstrumentFamilyIndex: React.Dispatch<React.SetStateAction<number>>;
  setInstrumentIndex: React.Dispatch<React.SetStateAction<number>>;
  setTuning: React.Dispatch<React.SetStateAction<Tuning>>;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TuningMenu({
  instruments,
  setInstrumentFamilyIndex,
  setInstrumentIndex,
  setTuning,
  setShowMenu,
}: TuningMenuProps) {
  const [showSecondMenu, setShowSecondMenu] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);

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
        <div className="instrument-list-content">
          {instruments[displayIndex].instruments.map((instrument, i) => (
            <div key={instrument.name}>
              <h3>{instrument.name}</h3>
              <div className="instrument-button-wrapper">
                <button
                  onClick={() => {
                    setInstrumentFamilyIndex(displayIndex);
                    setInstrumentIndex(i);
                    setTuning(instrument.standard);
                    setShowSecondMenu(false);
                    setShowMenu(false);
                  }}
                  className="instrument-button"
                >
                  <span className="instrument-button-icon"></span>
                  <span className="instrument-button-label">
                    {`${
                      instrument.standard.name
                    }: ${instrument.standard.notes.join("-")}`}
                  </span>
                </button>
              </div>

              {instrument.categories.map((category) => (
                <div key={category.name}>
                  <Accordion>
                    <AccordionItem key={category.name} value={category.name}>
                      <Accordion.Control>{category.name}</Accordion.Control>
                      <Accordion.Panel>
                        {category.tunings.map((tuning) => (
                          <div key={tuning.name}>
                            <div className="instrument-button-wrapper">
                              <button
                                className="instrument-button"
                                onClick={() => {
                                  setInstrumentFamilyIndex(displayIndex);
                                  setInstrumentIndex(i);
                                  setTuning(tuning);
                                  setShowSecondMenu(false);
                                  setShowMenu(false);
                                }}
                              >
                                <span className="instrument-button-icon"></span>
                                <span className="instrument-button-label">
                                  {`${tuning.name}: ${tuning.notes.join("-")}`}
                                </span>
                              </button>
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
