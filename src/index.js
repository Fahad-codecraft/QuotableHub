import 'dotenv/config';
import connectDB from './db/conn.js';
import app from './app.js';




const run = async () => {
  try {
    const port = process.env.PORT;
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    })
  } catch (error) {
    console.error(error)
  }
}
run();