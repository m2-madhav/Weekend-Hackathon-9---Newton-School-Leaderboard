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

  let startIndex, endIndex;

  if (isNaN(offset) && isNaN(limit)) {
    startIndex = 0;
    endIndex = 20;
    const result = data.slice(startIndex, endIndex);
    res.send(result);
    console.log(startIndex);
    return;
  } else if (isNaN(offset)) {
    startIndex = 0;
    endIndex = limit;
    const result = data.slice(startIndex, endIndex);
    res.send(result);
    console.log(endIndex);
    return;
  } else if (isNaN(limit)) {
    startIndex = offset;
    endIndex = 20;
    const result = data.slice(startIndex, offset + endIndex);
    res.send(result);
    console.log(startIndex);
    return;
  } else {
    startIndex = offset;
    endIndex = limit;
    if (startIndex === 0) {
      res.send(data.slice(startIndex, endIndex));
      return;
    }

    const result = data.slice(startIndex, startIndex + endIndex);
    res.send(result);
    console.log(startIndex);
    return;
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
