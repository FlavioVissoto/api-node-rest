import { Knex } from 'knex';
import { LogService } from '../../shared/services';
import { UserStatus } from '../models';
import { TableName } from '../tablename';

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(TableName.userstatus).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) {
    LogService.logger.info(`Existe(m) ${count} registro(s) na tabela ${TableName.userstatus}. Seed não executado!`);
    return;
  }

  const itensToInsert: Omit<UserStatus, 'id'>[] = [
    {
      ds_status: 'Ativo',
      fl_enable: true,
    },
    {
      ds_status: 'Inativo',
      fl_enable: true,
    },
  ];

  await knex(TableName.userstatus).insert(itensToInsert);
};
