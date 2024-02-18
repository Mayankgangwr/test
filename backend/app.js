const express = require("express");
const mongoose = require("mongoose");
const questionRoutes = require("./route");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = "mongodb+srv://iammayankgangwarbly:prince99@cluster0.rhnec5i.mongodb.net/Agropean?retryWrites=true&w=majority"; // Use 127.0.0.1 instead of localhost

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
