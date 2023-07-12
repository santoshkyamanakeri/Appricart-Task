const dbClient = require("../config/database");

// (async () => {
//     client = await dbClient.getClient();
//     console.log("Connected to database");
// })();

const articlesController = async (request, response) => {
  try {
    let client = await dbClient.getClient();
    const perPage = 1;
    const pageRequested = parseInt(request.query.page) || 0;

    const countsReponse = await client.query(
      "SELECT COUNT(*) FROM public.newslist"
    );

    const totalPages = parseInt(countsReponse.rows[0].count) / perPage;

    const articlesResponse = await client.query(
      `SELECT * FROM public.newslist OFFSET ${
        pageRequested * perPage
      } LIMIT ${perPage}`
    );

    return response.status(200).json({
      currentPage: pageRequested,
      nextPage: pageRequested + 1,
      articles: articlesResponse.rows,
      totalPages: totalPages,
    });
  } catch (error) {
    return response.status(500).json({
      error: error.message,
    });
  }
};

module.exports = articlesController;
