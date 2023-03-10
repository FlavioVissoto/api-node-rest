import { development, production, test } from './environment';

import { knex } from 'knex';

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
