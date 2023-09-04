const express = require("express");
const path = require("path");
const CsvUtilities = require("csv-import-validation").CsvUtilities;

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/upload", function (req, res) {
  console.log(req.boy);
  res.send(req.files);
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
