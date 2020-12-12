const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const { data } = require("./data");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
// your code goes here

app.get("/topRankings", (req, res) => {
  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);

  const startIndex = offset;
  const endIndex = limit;

  const result = data.slice(startIndex, endIndex);
  res.json(result);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
