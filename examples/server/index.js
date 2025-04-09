const express = require("express");
const cors = require("cors");
const app = express();

const port = 3000;
app.use(express.json(), express.text());
app.use(cors());
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
