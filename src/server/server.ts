import 'dotenv/config';
import './shared/services/yup.translations';

import express from 'express';
import { router } from './routes';
import { morganMiddleware } from './shared/middleware';

const server = express();

server.use(morganMiddleware);

server.use(express.json());

server.use(router);

export { server };
