import Quoteschema from "../models/quotes.js";

export const getRandomQuotes = async (req) => {
  try {
    const { tags, minLength, maxLength, author, limit, slug } = req.query;
    const size = parseInt(limit) || 1; // Use the provided limit, default to 1 if not provided

    let query = {};

    // Build the query based on the user's search parameters
    if (tags) {
      const tagsArray = tags.split(',');
      if (tagsArray.length === 1 && tags.includes('|')) {
        query.Tags = { $in: tagsArray[0].split('|') };
      } else {
        query.Tags = { $all: tagsArray.map(tag => new RegExp(tag, 'i')) };
      }
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
      const authorArray = author.split('|').map(a => ({ Author: new RegExp(`^${a}`, 'i') }));
      query.$or = authorArray;
    }
    if (slug) {
      const slugArray = slug.split('|').map(s => ({ slug: new RegExp(s, 'i') }));
      query.$or = slugArray;
    }

    const aggregationPipeline = [
      { $match: query },
      { $sample: { size } }
    ];

    const randomQuotes = await Quoteschema.aggregate(aggregationPipeline);

    return randomQuotes;
  } catch (e) {
    throw e;
  }
};
