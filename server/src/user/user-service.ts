import { Profile as GoogleProfile } from "passport-google-oauth20";
import { Profile as GitHubProfile } from "passport-github2";
import * as userRepository from "./user-queries";
import { TwitterProfile } from "./user-types";

type OAuthProfile = GoogleProfile | GitHubProfile | TwitterProfile;

export async function findOrCreateOAuthUser(profile: OAuthProfile) {
  const picture = profile.photos?.[0]?.value || null;
  const provider = profile.provider;
  const providerId = profile.id;
  if (!providerId) throw new Error("No email found in profile");

  let user = await userRepository.getByOAuth(provider, providerId);
  if (!user) {
    user = await userRepository.insertOAuthUser(picture, provider, providerId);
  } else {
    if (user.picture !== picture) {
      user = await userRepository.updatePicture(picture, user.id);
    }
  }

  return user;
}

export async function findById(id: string) {
  const userId = parseInt(id, 10);
  return await userRepository.getById(userId);
}
