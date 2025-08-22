import express from "express";
import passport from "passport";
import crypto from "crypto";
import { logoutHandler, getUser } from "./user-handlers";

import * as userService from "./user-service";
import { TwitterProfile } from "./user-types";

const CLIENT_URL = process.env.CLIENT_URL;

const router = express.Router();

router.post("/logout", logoutHandler);
router.get("/me", getUser);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "https://www.googleapis.com/auth/userinfo.profile"],
    // prompt: "consent",
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: CLIENT_URL,
    successRedirect: CLIENT_URL,
  })
);

router.get("/auth/github", passport.authenticate("github"));
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: CLIENT_URL,
    successRedirect: CLIENT_URL,
  })
);

router.get("/auth/twitter", (req, res) => {
  // generate code verifier & challenge for PKCE
  const codeVerifier = crypto.randomBytes(32).toString("hex");
  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

  // store codeVerifier in session for callback
  req.session.codeVerifier = codeVerifier;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.TWITTER_CLIENT_ID!,
    redirect_uri: `${CLIENT_URL}/api/auth/twitter/callback`,
    scope: "tweet.read users.read offline.access",
    state: crypto.randomBytes(16).toString("hex"),
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  res.redirect(`https://twitter.com/i/oauth2/authorize?${params.toString()}`);
});

router.get("/auth/twitter/callback", async (req, res) => {
  const { code, state } = req.query;
  const codeVerifier = req.session.codeVerifier;
  if (!codeVerifier) return res.status(400).send("Missing code verifier");

  try {
    const tokenResp = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code as string,
        redirect_uri: `${CLIENT_URL}/api/auth/twitter/callback`,
        code_verifier: codeVerifier,
        client_id: process.env.TWITTER_CLIENT_ID!,
      }),
    });

    const tokenData = await tokenResp.json();
    const accessToken = tokenData.access_token;

    const userResp = await fetch(
      "https://api.twitter.com/2/users/me?user.fields=profile_image_url",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const data = await userResp.json();

    const twitterProfile: TwitterProfile = {
      provider: "twitter",
      id: data.data.id,
      username: data.data.username,
      name: data.data.name,
      photos: data.data.profile_image_url
        ? [{ value: data.data.profile_image_url }]
        : [],
    };

    const user = await userService.findOrCreateOAuthUser(twitterProfile);
    req.session.userId = user.id;

    req.login(user, (err) => {
      if (err) {
        console.error(err);
        return res.redirect(`${CLIENT_URL}?error=true`);
      }
      res.redirect(CLIENT_URL!);
    });
  } catch (err) {
    console.error(err);
    res.redirect(`${CLIENT_URL}?error=true`);
  }
});

export default router;
