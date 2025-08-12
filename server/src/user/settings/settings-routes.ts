import express from "express";
import {
  instrumentHandler,
  tunerHandler,
  metronomeHandler,
  chordHandler,
  getInstrumentHandler,
  getTunerHandler,
  getMetronomeHandler,
  getChordHandler,
} from "./settings-handlers";

const router = express.Router();

router.get("/instrument", getInstrumentHandler);
router.patch("/instrument", instrumentHandler);

router.get("/tuner", getTunerHandler);
router.patch("/tuner", tunerHandler);

router.get("/metronome", getMetronomeHandler);
router.patch("/metronome", metronomeHandler);

router.get("/chord", getChordHandler);
router.patch("/chord", chordHandler);

export default router;
