import express from "express";
import router from "./routes/botApi.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use("/botApi", router);

app.get("/health", (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT);

export default app;
