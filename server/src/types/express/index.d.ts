import type { User as AppUser } from "../user-types";
import "express-session";

declare global {
  namespace Express {
    interface User extends AppUser {}
    interface Request {
      user?: AppUser;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    userId?: number;
    codeVerifier?: string;
  }
}
