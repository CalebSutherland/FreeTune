import { Request, Response } from "express";
import type {
  ChordSettings,
  InstrumentSettings,
  MetronomeSettings,
  TunerSettings,
} from "../../types/user-types";
import httpStatus from "http-status";
import * as settingsService from "./settings-service";

export const instrumentHandler = async (
  req: Request<{}, {}, InstrumentSettings>,
  res: Response
) => {
  const userId = req.user?.id;
  if (!userId)
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized" });

  const settings = req.body;

  try {
    await settingsService.updateInstrument(userId, settings);
    res.json({ success: true, message: "Instrument settings updated" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error updating tuner settings" });
  }
};

export const tunerHandler = async (
  req: Request<{}, {}, TunerSettings>,
  res: Response
) => {
  const userId = req.user?.id;
  if (!userId)
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized" });

  const settings = req.body;

  try {
    await settingsService.updateTuner(userId, settings);
    res.json({ success: true, message: "Tuner settings updated" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error updating tuner settings" });
  }
};

export const metronomeHandler = async (
  req: Request<{}, {}, MetronomeSettings>,
  res: Response
) => {
  const userId = req.user?.id;
  if (!userId)
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized" });

  const settings = req.body;

  try {
    await settingsService.updateMetronome(userId, settings);
    res.json({ success: true, message: "Metronome settings updated" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error updating metronome settings" });
  }
};

export const chordHandler = async (
  req: Request<{}, {}, ChordSettings>,
  res: Response
) => {
  const userId = req.user?.id;
  if (!userId)
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized" });

  const settings = req.body;

  try {
    await settingsService.updateChord(userId, settings);
    res.json({ success: true, message: "Chord settings updated" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error updating chord settings" });
  }
};
