import express from "express";
import cors from "cors";
import userRoutes from "./user/user-routes";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "YO MFS" });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
