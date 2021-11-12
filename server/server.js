const express = require("express");
const cors = require("cors");

const db = require("./db/mongo");
const Router = require("./routes/router");

const app = express();

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("we are connected!"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", Router);

const Port = process.env.NODE_ENV === "production" ? (process.env.PORT || 80) : 3000;
const server = app.listen(Port, () => console.log(`Server running on port ${Port}`));
server.setTimeout(0);