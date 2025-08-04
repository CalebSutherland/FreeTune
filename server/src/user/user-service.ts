import bcrypt from "bcrypt";
import { ClientError } from "./errors";
import { insertDefualtMetronome } from "../metronome/metronome-queries";
import { insertDefaultTunerSettings } from "../tuner-settings/tuner/tuner-queries";
import { insertDefaultClassicSettings } from "../tuner-settings/classic/classic-queries";
import { insertDefaultChordSettings } from "../chord-library/chord-queries";
import * as userRepository from "./user-queries";

export async function register(email: string, password: string) {
  const existingUser = await userRepository.getByEmail(email);
  if (existingUser) {
    throw new ClientError("User already exists");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await userRepository.insert(email, hashedPassword);
  await insertDefualtMetronome(user.id);
  await insertDefaultTunerSettings(user.id);
  await insertDefaultClassicSettings(user.id);
  await insertDefaultChordSettings(user.id);

  return user;
}

export async function login(email: string, password: string) {
  const user = await userRepository.getByEmail(email);
  if (!user) throw new ClientError("User not found");

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new ClientError("Invalid credentials");

  return user;
}
