import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import userRoutes from "./user/user-routes";
import userSettingsRoutes from "./user/settings/settings-routes";
import "./user/auth";

const app = express();
const port = 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET || "some_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api/user_settings", userSettingsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "YO MFS" });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
