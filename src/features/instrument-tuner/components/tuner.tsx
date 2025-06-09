import { useState } from "react";

import data from "../data/tuning-data.json";
import type { InstrumentFamily } from "../types/types";
import TuningMenu from "./tuning-menu";
import { Button, Switch } from "@mantine/core";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./tuner.css";

const instruments = data as InstrumentFamily[];

export default function InstrumentTuner() {
  const [instrumentFamilyIndex, setInstrumentFamilyIndex] = useState(0);
  const [instrumentIndex, setInstrumentIndex] = useState(0);

  const current_instrument =
    instruments[instrumentFamilyIndex].instruments[instrumentIndex];

  const [tuning, setTuning] = useState(current_instrument.standard);
  const [showMenu, setShowMenu] = useState(false);

  console.log(instruments);

  return (
    <div className="tuner-app-wrapper">
      {/* Tuner View */}
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
            <p className="tuning-name">{tuning.name}</p>
          </Button>
          <div className="auto-switch">
            <p>AUTO</p>
            <Switch
              defaultChecked
              color="teal"
              withThumbIndicator={false}
              size="md"
            />
          </div>
        </div>
        <div className="tuner-app-content">
          <p>Tuner app</p>
          <p>{tuning.notes.join("-")}</p>
        </div>
      </div>

      {/* Menu View */}
      <div className={`tuning-menu-view ${showMenu ? "visible" : ""}`}>
        <div className="tuning-menu-header">
          <Button
            variant="transparent"
            leftSection={<FaChevronLeft />}
            classNames={{
              inner: "tunings-button",
            }}
            onClick={() => setShowMenu(false)}
          >
            Back
          </Button>
          <h3 className="tuning-menu-title">Select Tuning</h3>
        </div>
        <TuningMenu
          instruments={instruments}
          setInstrumentFamilyIndex={setInstrumentFamilyIndex}
          setInstrumentIndex={setInstrumentIndex}
          setTuning={setTuning}
          setShowMenu={setShowMenu}
        />
      </div>
    </div>
  );
}
