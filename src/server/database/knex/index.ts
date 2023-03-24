import 'dotenv/config';

import { development, production, test } from './environment';

import { knex } from 'knex';
import pg from 'pg';

if (process.env.NODE_ENV === 'production') {
  pg.types.setTypeParser(21, 'text', parseInt);
  pg.types.setTypeParser(23, 'text', parseInt);
  pg.types.setTypeParser(20, 'text', parseInt);
}

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return test;
    case 'production':
      return production;
    case 'development':
    default:
      return development;
  }
};

export const Knex = knex(getEnvironment());
