import bcrypt from "bcrypt";
import { UnauthorizedError } from "../config/errors";
import { insertDefualtMetronome } from "../metronome/metronome-queries";
import { insertDefaultTunerSettings } from "../tuner-settings/tuner/tuner-queries";
import { insertDefaultClassicSettings } from "../tuner-settings/classic/classic-queries";
import { insertDefaultChordSettings } from "../chord-library/chord-queries";
import * as userRepository from "./user-queries";

export async function register(username: string, password: string) {
  const existingUser = await userRepository.getByUsername(username);
  if (existingUser) {
    throw new UnauthorizedError("User already exists");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await userRepository.insert(username, hashedPassword);
  await insertDefualtMetronome(user.id);
  await insertDefaultTunerSettings(user.id);
  await insertDefaultClassicSettings(user.id);
  await insertDefaultChordSettings(user.id);

  return user;
}

export async function login(username: string, password: string) {
  const user = await userRepository.getByUsername(username);
  if (!user) throw new UnauthorizedError("User not found");

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new UnauthorizedError("Invalid credentials");

  return user;
}
