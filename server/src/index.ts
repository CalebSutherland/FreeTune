import express from "express";
import userRoutes from "./user/user-routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("YO MFS");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
