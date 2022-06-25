const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const keepAwakeHeroku = require("./keepawakeheroku");

// list of urls to ping
let urls = [
  { app: "react-yoram", start: 12, end: 00 },
  { app: "latihan-deploy-sequelize", start: 12, end: 00 },
];

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
  keepAwakeHeroku(urls);
});
