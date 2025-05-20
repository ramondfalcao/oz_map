import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import regionRoutes from './routes/region.routes';
import { connectDB } from './config/database';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

connectDB();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/regions', regionRoutes);

app.use(errorHandler);

export default app;
