import express from 'express';
import cors from 'cors';
import quoteRoutes from "./routers/quotes.js";
import limiter from './rateLimiter.js';

const app = express();
app.use(cors());
app.use(limiter);
app.get("/", async (req, res) => {
  res.send("Hello World");
})
app.use(quoteRoutes)

export default app;