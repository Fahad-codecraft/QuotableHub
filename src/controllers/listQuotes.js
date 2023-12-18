import Quoteschema from "../models/quotes.js";

export const listQuotes = async (req, res) => {
  try {
    let { page = 1, limit = 20, tags, minLength, maxLength, author } = req.query;

    // Enforcing a maximum limit of 150
    limit = parseInt(limit) > 150 ? 150 : parseInt(limit);

    const skip = (page - 1) * parseInt(limit);

    let query = {};

    if (tags) {
      const tagsArray = tags.split(',');
      query.Tags = { $all: tagsArray.map(tag => new RegExp(tag, 'i')) };
    }
    if (minLength || maxLength) {
      query.length = {};
      if (minLength) {
        query.length.$gte = parseInt(minLength);
      }
      if (maxLength) {
        query.length.$lte = parseInt(maxLength);
      }
    }
    if (author) {
      const authorRegex = new RegExp(`^${author}`, 'i'); // Start of string case-insensitive regex match
      query.Author = authorRegex;
    }

    const totalQuotes = await Quoteschema.countDocuments(query);

    const aggregationPipeline = [
      { $match: query },
      { $skip: skip },
      { $limit: limit }
    ];

    const quotes = await Quoteschema.aggregate(aggregationPipeline);

    const totalPages = Math.ceil(totalQuotes / limit);

    res.status(200).json({
      page: parseInt(page),
      limit: limit,
      totalQuotes: totalQuotes,
      totalPages: totalPages,
      quotes: quotes
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
