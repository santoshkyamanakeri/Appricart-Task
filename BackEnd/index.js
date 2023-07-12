const express = require("express");
const dbClient = require("./config/database");
const config = require("./config/app");
const cors = require("cors");
const articlesController = require("./controllers/queryControl");
const app = express();

app.use(express.json());
app.use(cors());

let client;
// let clientData;

app.get("/news", articlesController);

const port = config.appPort;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

(async () => {
  client = await dbClient.getClient();
  console.log("Connected to database");
  /* client.query('SELECT * FROM pg_catalog.pg_tables', function(err, result) {
    console.log(result);
  }); */
})();

// (async () => {
//   clientData = await dbClient.getClient();
//   console.log("Connected")
// })();
