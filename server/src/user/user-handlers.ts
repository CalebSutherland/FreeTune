import { Request, Response } from "express";
import httpStatus from "http-status";
import { loginSchema } from "../types/auth-schemas";
import { ClientError } from "../config/errors";
import { ZodError } from "zod";
import * as userService from "./user-service";

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await userService.register(email, password);
    return res.status(httpStatus.CREATED).send(user);
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

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await userService.login(email, password);
    return res.status(httpStatus.OK).send(user);
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
      res.redirect("http://localhost:5173");
    });
  });
};
