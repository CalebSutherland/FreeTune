import { useState } from "react";

import type { InstrumentFamily, Tuning } from "../types/types";
import { Button, Accordion, AccordionItem } from "@mantine/core";
import { MdChevronRight } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa6";
import "./tuning-menu.css";

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
                <button
                  onClick={() => {
                    setInstrumentFamilyIndex(displayIndex);
                    setInstrumentIndex(i);
                    setTuning(instrument.standard);
                    setShowSecondMenu(false);
                    setShowMenu(false);
                  }}
                  className="tuning-card"
                >
                  <span className="tuning-card-notes-wrapper">
                    {instrument.standard.notes.map((note, note_i) => {
                      const base = note.charAt(0);
                      const sub = note.slice(1);
                      return (
                        <span key={note_i} className="tuning-note-wrapper">
                          <p className="tuning-note">
                            {base}
                            <sub
                              className={`note-sub ${
                                note.length > 2 ? "small" : ""
                              }`}
                            >
                              {sub}
                            </sub>
                          </p>
                        </span>
                      );
                    })}
                  </span>
                  <span className="tuning-card-label">
                    {`${instrument.name}: ${instrument.standard.name}`}
                  </span>
                </button>
              </div>

              {/* instrument categories */}
              {instrument.categories.map((category) => (
                <div key={category.name}>
                  <Accordion
                    classNames={{
                      control: "accordion",
                      content: "accordion-content",
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
                              <button
                                className="tuning-card"
                                onClick={() => {
                                  setInstrumentFamilyIndex(displayIndex);
                                  setInstrumentIndex(i);
                                  setTuning(tuning);
                                  setShowSecondMenu(false);
                                  setShowMenu(false);
                                }}
                              >
                                <span className="tuning-card-notes-wrapper">
                                  {tuning.notes.map((note, note_i) => {
                                    const base = note.charAt(0);
                                    const sub = note.slice(1);
                                    return (
                                      <span
                                        key={note_i}
                                        className="tuning-note-wrapper"
                                      >
                                        <p className="tuning-note">
                                          {base}
                                          <sub
                                            className={`note-sub ${
                                              note.length > 2 ? "small" : ""
                                            }`}
                                          >
                                            {sub}
                                          </sub>
                                        </p>
                                      </span>
                                    );
                                  })}
                                </span>
                                <span className="tuning-card-label">
                                  {`${instrument.name}: ${tuning.name}`}
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
