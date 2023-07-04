const express = require("express");
const dbClient = require("./config/database");
const config = require("./config/app");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let client;

app.get("/news", (request, response) => {
  console.log("connecting to news");

  client.query("SELECT * FROM public.newslist", (error, results) => {
    if (error) {
      console.log("errro ocured");
      throw error;
    }
    return response.status(200).json(results.rows);
    // return response.send("News");
  });
});

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
