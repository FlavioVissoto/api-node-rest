import { Knex } from 'knex';
import { LogService } from '../../shared/services';
import { TableName } from '../tablename';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TableName.user, (table: Knex.CreateTableBuilder) => {
      table.bigIncrements('id').primary().index();
      table.integer('cd_status').index().notNullable();
      table.string('nm_user').notNullable().checkLength('>', 3);
      table.string('nm_email').index().unique().notNullable().checkLength('>', 5);
      table.string('nm_pass').notNullable().checkLength('>=', 6);
    })
    .then(() => {
      LogService.logger.info(`### Create table ${TableName.user}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableName.user).then(() => {
    LogService.logger.info(`### Drop table ${TableName.user}`);
  });
}
