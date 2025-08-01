import express from "express";
import userRoutes from "./users";

const app = express();
app.use(express.json());
const port = 3000;

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("YO MFS");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
