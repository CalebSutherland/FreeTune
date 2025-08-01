import { Request, Response } from "express";
import httpStatus from "http-status";
import { CustomError } from "../config/errors";
import { isValidPassword, isValidUsername } from "./user-validation";
import * as userService from "./user-service";

const registerHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!isValidUsername(username)) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Invalid username" });
  }

  if (!isValidPassword(password)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      error: "Invalid password",
    });
  }

  try {
    const user = await userService.register(username, password);
    return res.status(httpStatus.CREATED).send(user);
  } catch (err) {
    console.error("User registration failed:", err);

    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ error: err.message });
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
};

const loginHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!isValidUsername(username)) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Invalid credentials" });
  }

  try {
    const user = await userService.login(username, password);
    return res.status(httpStatus.OK).send(user);
  } catch (err) {
    console.error("Login failed:", err);

    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ error: err.message });
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
};

export { registerHandler, loginHandler };
