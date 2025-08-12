import bcrypt from "bcrypt";
import { Profile as GoogleProfile } from "passport-google-oauth20";
import { User } from "../types/user-types";
import { ClientError } from "../config/errors";
import * as userRepository from "./user-queries";

export async function register(email: string, password: string) {
  const existingUser = await userRepository.getByEmail(email);
  if (existingUser) {
    throw new ClientError("User already exists");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await userRepository.insert(email, hashedPassword);

  return user;
}

export async function login(email: string, password: string) {
  const user = await userRepository.getByEmail(email);
  if (!user) throw new ClientError("User not found");

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new ClientError("Invalid credentials");

  const userInfo: User = { id: user.id };
  return userInfo;
}

export async function findOrCreateOAuthUser(profile: GoogleProfile) {
  const email = profile.emails?.[0]?.value;
  const provider = profile.provider;
  const providerId = profile.id;
  if (!email || !providerId) throw new Error("No email found in profile");

  let user = await userRepository.getByOAuth(provider, providerId);
  if (!user) {
    user = await userRepository.insertOAuthUser(email, provider, providerId);
  }

  return user;
}

export async function findById(id: string) {
  const userId = parseInt(id, 10);
  return await userRepository.getById(userId);
}
