import express from "express";
import passport from "passport";
import { logoutHandler, getUser } from "./user-handlers";

const router = express.Router();

router.post("/logout", logoutHandler);
router.get("/me", getUser);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "consent",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173",
    successRedirect: "http://localhost:5173",
  })
);

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:5173",
    successRedirect: "http://localhost:5173",
  })
);

export default router;
