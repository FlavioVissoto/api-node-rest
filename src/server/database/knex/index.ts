import 'dotenv/config';

import { development, production, test } from './environment';

import { knex } from 'knex';
import pg from 'pg';

if (process.env.NODE_ENV === 'production') {
  pg.types.setTypeParser(pg.types.TypeId.INT2, 'text', parseInt);
  pg.types.setTypeParser(pg.types.TypeId.INT4, 'text', parseInt);
  pg.types.setTypeParser(pg.types.TypeId.INT8, 'text', parseInt);
}

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return test;
    case 'prod':
      return production;
    case 'dev':
    default:
      return development;
  }
};

export const Knex = knex(getEnvironment());
