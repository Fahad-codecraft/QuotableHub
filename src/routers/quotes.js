import express from 'express';
import { getQuoteById, singleRandomQuote } from '../controllers/quote.js';
import { listQuotes } from '../controllers/listQuotes.js';
import { listAuthors } from '../controllers/listAuthors.js';
import { searchQuotes } from '../controllers/searchQuotes.js';
import { searchAuthors } from '../controllers/searchAuthors.js';

const router = express.Router();

router.get('/quotes/random', singleRandomQuote)
router.get('/quotes', listQuotes)
router.get('/quotes/:id', getQuoteById)
router.get('/authors', listAuthors)
router.get('/search/quotes', searchQuotes)
router.get('/search/authors', searchAuthors)

export default router;