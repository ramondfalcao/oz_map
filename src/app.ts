import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import routes from './routes';

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
