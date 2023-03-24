import 'dotenv/config';
import './shared/services/yup.translations';

import cors from 'cors';
import express from 'express';
import { router } from './routes';
import { morganMiddleware } from './shared/middleware';

const server = express();

server.use(cors({ origin: '*' }));

server.use(morganMiddleware);

server.use(express.json());

server.use(router);

export { server };
