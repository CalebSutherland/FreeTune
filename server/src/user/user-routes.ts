import express from "express";
import passport from "passport";
import { registerHandler, loginHandler, logoutHandler } from "./user-handlers";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/logout", logoutHandler);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/http://localhost:5173",
    successRedirect: "http://localhost:5173",
  })
);

export default router;
