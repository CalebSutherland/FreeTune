import { useState } from "react";

import data from "../data/tuning-data.json";
import type { Instrument } from "../types/types";
import { Button, Switch } from "@mantine/core";
import { FaChevronRight } from "react-icons/fa";
import "./tuner.css";

const instruments = data as Instrument[];

export default function InstrumentTuner() {
  const [instrumentIndex, setInstrumentIndex] = useState(0);
  const [tuning, setTuning] = useState(instruments[instrumentIndex].standard);
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
            <p>{instruments[instrumentIndex].name}</p>
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
        <button onClick={() => setShowMenu(false)}>Back</button>
        <h3>Select Tuning</h3>
        {/* You can list tunings here */}
      </div>
    </div>
  );
}
