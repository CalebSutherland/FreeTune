import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import passport from "passport";
import cors from "cors";
import userRoutes from "./user/user-routes";
import userSettingsRoutes from "./user/settings/settings-routes";
import "./user/auth";

const app = express();
const port = process.env.PORT || 10000;

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(
  session({
    store: new (pgSession(session))({
      conObject: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      },
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "some_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api/user_settings", userSettingsRoutes);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
