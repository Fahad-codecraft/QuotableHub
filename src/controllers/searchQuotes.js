import Quoteschema from "../models/quotes.js";

export const searchQuotes = async (req, res) => {
  try {
    let { query: searchQuery, fields, page = 1, limit = 20 } = req.query;

    // Cap the limit at 150
    limit = Math.min(parseInt(limit), 150);

    let query = {};

    if (searchQuery) {
      const regexQuery = new RegExp(searchQuery, 'i');
      if (fields === 'author') {
        query.Author = regexQuery;
      } else {
        query.Quote = regexQuery;
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const searchResults = await Quoteschema.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    const totalResults = await Quoteschema.countDocuments(query);
    const totalPages = Math.ceil(totalResults / parseInt(limit));

    res.status(200).json({
      pageInfo: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalResults,
        totalPages
      },
      results: searchResults
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
