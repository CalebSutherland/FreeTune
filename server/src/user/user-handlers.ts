import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export const logoutHandler = async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Logout failed" });
    }
    req.session?.destroy(() => {
      res.clearCookie("connect.sid");
      res.status(httpStatus.OK).json({ message: "Logged out successfully" });
    });
  });
};

export const getUser = async (req: Request, res: Response) => {
  if (req.isAuthenticated() && req.user) {
    res.json(req.user);
  } else {
    res.status(httpStatus.UNAUTHORIZED).json({ message: "Not logged in" });
  }
};
