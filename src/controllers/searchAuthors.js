import Quoteschema from "../models/quotes.js";

export const searchAuthors = async (req, res) => {
  try {
    let { query: searchQuery, page = 1, limit = 20 } = req.query;

    // Cap the limit at 150
    limit = Math.min(parseInt(limit), 150);

    const skip = (parseInt(page) - 1) * parseInt(limit);

    let authors = [];

    if (searchQuery) {
      const regexQuery = { $regex: searchQuery, $options: 'i' };
      authors = await Quoteschema.find({
        $or: [
          { Author: regexQuery },
          // Add more fields to search here if necessary
        ]
      })
      .skip(skip)
      .limit(parseInt(limit));
    }

    const uniqueAuthors = await Quoteschema.aggregate([
      {
        $match: {
          $or: [
            { Author: { $regex: searchQuery, $options: 'i' } },
            // Add more fields to search here if necessary
          ]
        }
      },
      {
        $group: {
          _id: '$Author'
        }
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
        }
      }
    ]);

    const totalAuthors = uniqueAuthors.length > 0 ? uniqueAuthors[0].count : 0;
    
    const totalPages = Math.ceil(totalAuthors / parseInt(limit));

    res.status(200).json({
      page: parseInt(page),
      limit: parseInt(limit),
      totalAuthors,
      totalPages,
      authors
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
