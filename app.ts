import express, { Express } from 'express';
import logger from 'morgan';

import UrlsController from './controllers/urls.controller';
import { cache } from './middlewares/cache';

const app: Express = express();

app.use(logger('dev'));

app.get('/short-url', cache, UrlsController.createOrGetShortenedUrl);
app.get('/full-url', cache, UrlsController.getFullUrl);

export default app;
