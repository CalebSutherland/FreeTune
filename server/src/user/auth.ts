import "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy, type Profile } from "passport-github2";
import type { User } from "../types/user-types";
import * as userService from "./user-service";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await userService.findOrCreateOAuthUser(profile);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/api/auth/github/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: Function
    ) => {
      try {
        const user = await userService.findOrCreateOAuthUser(profile);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userService.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
