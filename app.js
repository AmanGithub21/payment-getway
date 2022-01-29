require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/payment");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/paymentGetwayDB";
mongoose
  .connect(dbUrl)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log("DB NOT CONNECTED", e));

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/payment-getway/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/payment-getway/build", "index.html"));
});

app.use("/", authRoutes);
app.use("/", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT || 8080, (req, res) => {
  console.log("Server running on PORT 8080");
});
