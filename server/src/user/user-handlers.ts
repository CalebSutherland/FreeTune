import { Request, Response } from "express";
import httpStatus from "http-status";
import { loginSchema } from "./auth-schemas";
import { ClientError } from "./errors";
import { ZodError } from "zod";
import * as userService from "./user-service";

const registerHandler = async (req: Request, res: Response) => {
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

const loginHandler = async (req: Request, res: Response) => {
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

export { registerHandler, loginHandler };
