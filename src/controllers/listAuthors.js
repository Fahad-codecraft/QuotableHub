import Quoteschema from "../models/quotes.js";

export const listAuthors = async (req, res) => {
  try {
    let { sortBy = 'name', order = 'asc', name, page = 1, limit = 20, slug } = req.query;

    // Ensure limit does not exceed 150
    limit = Math.min(parseInt(limit), 150);

    let query = {};

    // Sorting
    let sortField = {};
    if (sortBy === 'name') {
      sortField = { Author: order === 'asc' ? 1 : -1 };
    } else {
      sortField[sortBy === 'quoteCount' ? 'QuoteCount' : sortBy] = order === 'asc' ? 1 : -1;
    }

    // Filtering by name
    if (name) {
      if (name.length === 1) {
        query.Author = { $regex: `^${name}`, $options: 'i' };
      } else {
        query.Author = { $regex: name, $options: 'i' };
      }
    }

    // Filtering by slug
    if (slug) {
      const slugsArray = slug.toLowerCase().split('|');
      query.slug = { $in: slugsArray.map(slug => new RegExp(slug, 'i')) };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    let authors;
    let totalAuthors;
    if (name || slug) {
      authors = await Quoteschema.find(query)
        .sort(sortField)
        .skip(skip)
        .limit(parseInt(limit));

      const uniqueAuthors = await Quoteschema.aggregate([
        { $match: query },
        { $group: { _id: '$Author' } },
        { $count: 'total' }
      ]);
      totalAuthors = uniqueAuthors.length > 0 ? uniqueAuthors[0].total : 0;
    } else {
      const aggregationPipeline = [
        { $group: { _id: '$Author', QuoteCount: { $sum: 1 } } },
        { $project: { QuoteCount: 1, Author: '$_id', _id: 0 } },
        { $sort: sortField },
        { $skip: skip },
        { $limit: parseInt(limit) },
      ];

      authors = await Quoteschema.aggregate(aggregationPipeline);
      totalAuthors = await Quoteschema.aggregate([
        { $group: { _id: '$Author' } },
        { $count: 'total' }
      ]);
      totalAuthors = totalAuthors.length > 0 ? totalAuthors[0].total : 0;
    }

    const totalPages = Math.ceil(totalAuthors / parseInt(limit));

    res.status(200).json({ page: parseInt(page), limit: parseInt(limit), totalAuthors, totalPages, authors });
  } catch (e) {
    res.status(400).send(e);
  }
};
