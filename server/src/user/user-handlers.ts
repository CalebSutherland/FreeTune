import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { loginSchema } from "../types/auth-schemas";
import { ClientError } from "../config/errors";
import { ZodError } from "zod";
import * as userService from "./user-service";

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await userService.register(email, password);

    req.login(user, (err) => {
      if (err) return next(err);
      res
        .status(httpStatus.CREATED)
        .json({ message: "Registration successful", user });
    });
  } catch (err) {
    if (err instanceof ZodError) {
      console.error("Zod issues:", err.issues);
      return res.status(httpStatus.BAD_REQUEST).json({
        error: "Validation failed",
        issues: err.issues,
      });
    }

    if (err instanceof ClientError) {
      console.error("User registration failed (client):", err);
      return res.status(err.status).json({ error: err.message });
    }

    console.error("User registration failed:", err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await userService.login(email, password);

    req.login(user, (err) => {
      if (err) return next(err);
      res.json({ message: "Login successfuel", user });
    });
  } catch (err) {
    if (err instanceof ZodError) {
      console.error("Zod issues:", err.issues);
      return res.status(httpStatus.BAD_REQUEST).json({
        error: "Validation failed",
        issues: err.issues,
      });
    }

    if (err instanceof ClientError) {
      return res.status(err.status).json({ error: err.message });
    }

    console.error("Login failed:", err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Logout failed" });
    }
    req.session?.destroy(() => {
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};

export const getUser = async (req: Request, res: Response) => {
  if (req.isAuthenticated() && req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
};
