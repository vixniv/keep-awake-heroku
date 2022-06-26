const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const keepAwakeHeroku = require("./keepawakeheroku");
require("dotenv").config();

const connectDB = require("./config/db");
const routes = require("./routes");
const App = require("./models/appModel");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// list of urls to ping
// let urls = [
//   { app: "keepawakeheroku", start: 00, end: 00 },
//   { app: "react-yoram", start: 00, end: 00 },
// ];
let urls = [];

app.get("/", (req, res) => {
  res.send(
    "Thank you for using this app, docs: https://github.com/vixniv/keep-awake-heroku"
  );
});

app.use(routes);

let ID;
app.get("/run", (req, res) => {
  const { stop, password } = req.query;
  if (stop !== "true" || password !== process.env.PASSWORD) {
    if (!ID) {
      // ID = keepAwakeHeroku(urls);
      App.find().then(
        (res) => {
          urls = res;
          ID = keepAwakeHeroku(urls);
        },
        (err) => console.log(err)
      );
      console.log(ID);
      res.send("Running...");
    } else {
      console.log(ID);
      res.send("Already running...");
    }
  } else {
    clearInterval(ID);
    console.log(ID);
    ID = null;
    res.send("Stopped...");
  }
});

app.all("*", (req, res) => {
  res.send("404 not found");
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "500",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
  // ID = keepAwakeHeroku(urls);
  App.find().then(
    (res) => {
      urls = res;
      ID = keepAwakeHeroku(urls);
    },
    (err) => console.log(err)
  );
});
