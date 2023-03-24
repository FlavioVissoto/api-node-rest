import { LogService, PasswordCryto } from '../../shared/services';
import { User } from '../models';

import { Knex } from 'knex';
import { TableName } from '../tablename';

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(TableName.user).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) {
    LogService.logger.info(`Existe(m) ${count} registro(s) na tabela ${TableName.user}. Seed não executado!`);
    return;
  }

  const itensToInsert: Omit<User, 'id'>[] = [
    {
      cd_status: 1,
      nm_email: 'vissoto_flavio@hotmail.com',
      nm_pass: await PasswordCryto.hashPassword('miguel010203*'),
      nm_user: 'Flavio Vissoto',
    },
  ];

  await knex(TableName.user).insert(itensToInsert);
};
