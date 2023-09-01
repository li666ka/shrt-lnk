import express, { Express } from 'express';
import logger from 'morgan';

import UrlsController from './controllers/urls.controller';

const app: Express = express();

app.use(logger('dev'));

app.get('/short-url', UrlsController.createOrGetShortenedUrl);
app.get('/full-url', UrlsController.getFullUrl);

export default app;
