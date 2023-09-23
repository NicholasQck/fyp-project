import 'dotenv/config';
import express from 'express';
import 'express-async-errors';

const app = express();

// routers
import { titlesRouter } from './routes/titleRoutes.js';
import { usersRouter } from './routes/userRoutes.js';

// middleware
app.use(express.json());

// routes
app.use('/api/titles', titlesRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.status(200).json({ data: 'hi' });
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, console.log(`Server is listning on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
