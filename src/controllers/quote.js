import Quoteschema from "../models/quotes.js";
import createError from 'http-errors';
import { getRandomQuotes } from "./getRandomQuotes.js";

export const getQuoteById = async (req, res, next) => {
  try{
    const id = req.params.id;
    const getQuote = await Quoteschema.findById(id);

    if (!getQuote) {
      return next(createError(404, 'The requested resource could not be found'));
    }
    res.status(201).send(getQuote);
  }catch(e){
    res.status(400).send(e);
  }
}

export const singleRandomQuote = async (req, res, next) => {
  try {
    const requestedLimit = req.query.limit || 1; // Use the provided limit, default to 1 if not provided
    req.query.limit = requestedLimit; // Update the query limit

    const randomQuotes = await getRandomQuotes(req);

    if(!randomQuotes){
      return next(createError(404, 'The requested resource could not be found'));
    }

    if (randomQuotes.length > 0) {
      res.status(200).json(randomQuotes); // Send the array of random quotes
    } else {
      res.status(404).json({ message: 'No quotes found' });
    }
  } catch (e) {
    res.status(400).send(e);
  }
};





