const express = require("express");
const mongoose = require("mongoose");
const questionRoutes = require("./route");
const cors = require("cors");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = String(process.env.LIVE_DB_URL) || String(process.env.LOCAL_DB_URL);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use(express.json());
app.use("/api/questions", questionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
