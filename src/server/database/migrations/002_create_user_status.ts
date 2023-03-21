import { Knex } from 'knex';
import { TableName } from '../tablename';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TableName.userstatus, (table: Knex.CreateTableBuilder) => {
      table.bigIncrements('id').primary().index();
      table.string('ds_status').unique().notNullable();
      table.boolean('fl_enable').defaultTo(true).notNullable();
    })
    .then(() => {
      LogService.logger.info(`### Create table ${TableName.userstatus}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableName.userstatus).then(() => {
    LogService.logger.info(`### Drop table ${TableName.userstatus}`);
  });
}
