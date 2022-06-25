const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const keepAwakeHeroku = require("./keepawakeheroku");

// list of urls to ping
let urls = [{ app: "react-yoram", start: 00, end: 23 }];

app.get("/", (req, res) => {
  res.send(
    "Thank you for using this app, docs: https://github.com/vixniv/keep-awake-heroku"
  );
});

app.get("/run", (req, res) => {
  keepAwakeHeroku(urls);
  res.send("Running...");
});

app.all("*", (req, res) => {
  res.send("404 not found");
});

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
