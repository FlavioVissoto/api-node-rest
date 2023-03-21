import { Knex } from 'knex';
import { Platform } from '../models/platform.model';
import { TableName } from '../tablename';

export const seed = async (knex: Knex) => {
  //await knex(TableName.platforma).insert({ nm_platform: '' });

  const [{ count }] = await knex(TableName.platforma).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) {
    console.log(`Existe(m) ${count} registro(s) na tabela ${TableName.platforma}. Seed não executado!`);
    return;
  }

  const platformsToInsert: Omit<Platform, 'id'>[] = [
    {
      nm_platform: 'android',
    },
    {
      nm_platform: 'ios',
    },
    {
      nm_platform: 'web',
    },
  ];

  await knex(TableName.platforma).insert(platformsToInsert);
};
