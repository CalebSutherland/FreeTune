import express from "express";
import {
  instrumentHandler,
  tunerHandler,
  metronomeHandler,
  chordHandler,
} from "./settings-handlers";

const router = express.Router();

router.patch("/instrument", instrumentHandler);
router.patch("/tuner", tunerHandler);
router.patch("/metronome", metronomeHandler);
router.patch("/chord", chordHandler);

export default router;
