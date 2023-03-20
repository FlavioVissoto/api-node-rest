import chalk from 'chalk';
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
      console.log(chalk.green(`### Create table ${TableName.userstatus}`));
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableName.userstatus).then(() => {
    console.log(chalk.yellow(`### Drop table ${TableName.userstatus}`));
  });
}
