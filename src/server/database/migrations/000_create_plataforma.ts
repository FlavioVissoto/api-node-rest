import { Knex } from 'knex';
import { LogService } from '../../shared/services';
import { TableName } from '../tablename';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TableName.platforma, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('nm_platform', 150).checkLength('<=', 150).notNullable();
    })
    .then(() => {
      LogService.logger.info(`### Create table ${TableName.platforma}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableName.platforma).then(() => {
    LogService.logger.info(`### Drop table ${TableName.platforma}`);
  });
}
