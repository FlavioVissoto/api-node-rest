import chalk from 'chalk';
import { Knex } from 'knex';
import { TableName } from '../tablename';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TableName.platforma, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('nm_platform', 150).checkLength('<=', 150).notNullable();
    })
    .then(() => {
      console.log(chalk.green(`### Create table ${TableName.platforma}`));
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableName.platforma).then(() => {
    console.log(chalk.yellow(`### Drop table ${TableName.platforma}`));
  });
}
