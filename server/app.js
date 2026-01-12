import express from "express";
import dotenv from "dotenv";
import botRouter from "./botApi/routes/botRouter.js";
import sequelize from "./db/db.js";
import { User, Card } from "./db/models/models.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import dbRouter from "./db/routes/app.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";
// import { staticPath } from "./conf.js";
// import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
// app.use("/static", express.static(staticPath));
app.use("/api/bot", botRouter);
app.use("/api/db", dbRouter);

// Errors middleware
app.use(errorHandler);

app.get("/health", (req, res) => {
  res.sendStatus(200);
});

async function startDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("SUCCESS DB");

    app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startDB();

export default app;
