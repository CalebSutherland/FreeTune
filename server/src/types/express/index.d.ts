import type { User as AppUser } from "../user-types";

declare global {
  namespace Express {
    interface User extends AppUser {}
    interface Request {
      user?: AppUser;
    }
  }
}
