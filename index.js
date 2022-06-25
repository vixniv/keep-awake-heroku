const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const keepAwakeHeroku = require("./keepawakeheroku");
require("dotenv").config();

// list of urls to ping
let urls = [{ app: "react-yoram", start: 00, end: 00 }];

app.get("/", (req, res) => {
  res.send(
    "Thank you for using this app, docs: https://github.com/vixniv/keep-awake-heroku"
  );
});

let ID;
app.get("/run", (req, res) => {
  const { stop, password } = req.query;
  if (stop !== "true" || password !== process.env.PASSWORD) {
    if (!ID) {
      ID = keepAwakeHeroku(urls);
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

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
