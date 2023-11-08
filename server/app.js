import 'dotenv/config';
import express from 'express';
import 'express-async-errors';

const app = express();

// import routers
import { authRouter } from './routes/authRoutes.js';
import { titlesRouter } from './routes/titleRoutes.js';
import { usersRouter } from './routes/userRoutes.js';
import { safRouter } from './routes/safRoutes.js';
import { announcementsRouter } from './routes/announcementRoutes.js';

// import custom middleware
import { errorHandlingMiddleware } from './middleware/errorHandling.js';
import { notFoundMiddleware } from './middleware/notFound.js';
import { authUser } from './middleware/auth.js';

// use middleware
app.use(express.json());

// landing endpoint
app.get('/', (req, res) => {
  res.status(200).json({ data: 'hi' });
});

// routes
app.use('/api/auth', authRouter);
app.use('/api/titles', authUser, titlesRouter);
app.use('/api/users', authUser, usersRouter);
app.use('/api/saf', authUser, safRouter);
app.use('/api/announcements', authUser, announcementsRouter);

// use custom middleware
app.use(notFoundMiddleware);
app.use(errorHandlingMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, console.log(`Server is listning on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
